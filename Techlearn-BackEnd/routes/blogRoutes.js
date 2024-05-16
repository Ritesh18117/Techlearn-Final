const express = require("express");
const router = express.Router();
const Blog = require("../Models/Blogs");
const passport = require("passport"); // Use Passport with JWT
const ensureAuthor = require("../Middleware/ensureAuthor"); // Middleware to ensure the correct author
const { default: mongoose } = require("mongoose");

// Get all blogs
router.get("/getAll", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/getAllMyBlog", passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const userId = req.user._id; // Accessing the user ID from the JWT payload
    const blogs = await Blog.find({ author: new mongoose.Types.ObjectId(userId) }); // Correctly referencing the ObjectId
    res.json(blogs); // Sending the blogs as JSON
  } catch (err) {
    res.status(500).json({message: "Server Error", error: err.message}); // Error handling
  }
});

// Get a blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author');
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog); // Return the blog if found
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Create a new blog (JWT-based authentication required)
router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      author: req.user._id, // The logged-in user's ID
      tags: req.body.tags || [],
      createdAt: Date.now(),
      image: req.body.image,
    });

    const newBlog = await blog.save();
    res.status(201).json(newBlog); // Return the created blog
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update a blog by ID (JWT-based authentication and ensure the correct author)
router.put("/:id", [passport.authenticate("jwt", { session: false }), ensureAuthor(Blog)], async (req, res) => {
  const { title, content, tags, image } = req.body;

  req.item.title = title;
  req.item.content = content;
  req.item.tags = tags || [];
  req.item.image = image;
  req.item.updatedAt = Date.now();

  try {
    await req.item.save(); // Save the updated project
    res.json({ message: 'Project updated successfully', blog: req.item });
} catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
}
});

// Delete a blog by ID (JWT-based authentication and ensure the correct author)
router.delete('/:id',passport.authenticate('jwt', { session: false }), ensureAuthor(Blog), async (req, res) => {
  try {
      const blogId = req.params.id;

      // Delete the project
      await Blog.deleteOne({ _id: blogId });

      res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

module.exports = router;
