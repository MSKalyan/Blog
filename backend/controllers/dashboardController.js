import { getAllMyBlogs } from '../models/blogModel.js'; // Import the function to get blogs by user ID

// Controller for rendering the dashboard with user's blogs
export const getDashboard = async (req, res) => {
  const userId = req.user.id;  // Assuming user ID is in the token (JWT)

  try {
    // Fetch blogs associated with the logged-in user
    const blogs = await getAllMyBlogs(userId);

    // Render the dashboard page with the user's blogs
    res.render('dashboard', {
      user: req.user,  // Send the logged-in user's info to the view
      blogs: blogs     // Send the blogs to the view
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
