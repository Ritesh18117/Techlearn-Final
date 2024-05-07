const express = require("express");
const router = express.Router();
const Blog = require("../Models/Blogs");
const passport = require("passport"); // Use Passport with JWT
const ensureAuthor = require("../Middleware/ensureAuthor"); // Middleware to ensure the correct author

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get a blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
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
    await req.item.save(); // Save the updated blog
    res.json({ message: "Blog updated successfully", blog: req.item });
  } catch (err) {
    res.status(500).json({ message: "Error updating blog", error: err.message });
  }
});

// Delete a blog by ID (JWT-based authentication and ensure the correct author)
router.delete("/:id", [passport.authenticate("jwt", { session: false }), ensureAuthor(Blog)], async (req, res) => {
  try {
    await req.item.remove(); // Remove the blog
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog", error: err.message });
  }
});

module.exports = router;
