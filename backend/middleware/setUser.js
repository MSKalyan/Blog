// middleware/setUser.js
import jwt from 'jsonwebtoken';

const setUser = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      req.user = null; // Invalid token
    }
  } else {
    req.user = null; // No token
  }

  next();
};

export default setUser;
