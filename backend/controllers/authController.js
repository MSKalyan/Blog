import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../models/db.js"; // database connection
import {sendEmail} from "../utils/sendEmail.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const userRes = await pool.query("SELECT id, email FROM users WHERE email=$1", [email]);
    if (userRes.rows.length === 0) {
      // IMPORTANT: don’t reveal if email exists or not (security)
      return res.status(200).json({ message: "If email exists, reset link will be sent." });
    }

    const user = userRes.rows[0];

    // ✅ Create reset token
    const resetToken = jwt.sign(
      { id: user.id },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: "15m" }
    );

    // ✅ expiry timestamp (15 mins from now)
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    await pool.query(
      "UPDATE users SET reset_password_token=$1, reset_password_expires=$2 WHERE id=$3",
      [resetToken, expires, user.id]
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Reset your password",
      html: `
        <h2>Password Reset Request</h2>
        <p>Click below link to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    res.status(200).json({ message: "If email exists, reset link will be sent." });
   } catch (err) {
  console.error("forgotPassword error message:", err.message);
  console.error("forgotPassword error full:", err);
  return res.status(500).json({
    message: "Server error",
    error: err.message,
  });
}
};


export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password required" });
    }

    // ✅ Verify token signature + expiry
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    } catch (err) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    const userRes = await pool.query(
      "SELECT id, reset_password_token, reset_password_expires FROM users WHERE id=$1",
      [decoded.id]
    );

    if (userRes.rows.length === 0) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const user = userRes.rows[0];

    // ✅ Must match DB token (prevents token reuse attacks)
    if (!user.reset_password_token || user.reset_password_token !== token) {
      return res.status(400).json({ message: "Invalid token" });
    }

    // ✅ Must not be expired in DB
    if (!user.reset_password_expires || new Date(user.reset_password_expires) < new Date()) {
      return res.status(400).json({ message: "Token expired" });
    }

    // ✅ Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `UPDATE users 
       SET password=$1, reset_password_token=NULL, reset_password_expires=NULL 
       WHERE id=$2`,
      [hashedPassword, decoded.id]
    );

    res.status(200).json({ message: "Password reset successful. Please login again." });
  } catch (err) {
    console.error("resetPassword error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getLogin = (req, res) => {
  res.json({ message: "Login endpoint" });
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    // If user not found
    if (userResult.rows.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    // If password does not match
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ✅ DO NOT set cookie now
    // res.cookie("token", token, {...})  <-- removed

    // ✅ Return token in JSON
    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};

export const getRegister = (req, res) => {
  res.json({ message: "Register endpoint" });
};

export const postRegister = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("Name, email, and password are required.");
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const result = await pool.query(
      "INSERT INTO users (name, email, password, created_at, role) VALUES ($1, $2, $3, NOW(), $4) RETURNING *",
      [name, email, hashedPassword, "user"]
    );

    const newUser = result.rows[0];

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).send("Error registering user.");
  }
};

// ✅ Logout is frontend-side now (remove token from localStorage)
export const logout = (req, res) => {
  return res.json({ success: true, message: "Logged out successfully" });
};

export const updateProfile = async (req, res) => {
  // ✅ still works, since requireAuth will set req.user from Authorization header
  const userId = req.user.id;

  const { name, password } = req.body;

  try {
    // If password is provided, hash it
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);

      await pool.query("UPDATE users SET name = $1, password = $2 WHERE id = $3", [
        name,
        hashedPassword,
        userId,
      ]);
    } else {
      // Update only name
      await pool.query("UPDATE users SET name = $1 WHERE id = $2", [name, userId]);
    }

    return res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (err) {
    console.error("Update profile error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};
