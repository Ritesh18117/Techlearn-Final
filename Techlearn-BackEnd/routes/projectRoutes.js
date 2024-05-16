const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Project = require('../Models/Porjects');
const passport = require('passport'); // Ensure JWT-based authentication
const ensureAuthor = require("../Middleware/ensureAuthor");

// Get all projects
router.get('/getAll', async (req, res) => {
    try {
        const projects = await Project.find().populate('owner'); // Populate owner details
        res.json(projects); // Return all projects
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.get("/getAllMyProject", passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
      const userId = req.user._id; // Accessing the user ID from the JWT payload
      const projects = await Project.find({ owner: new mongoose.Types.ObjectId(userId) }); // Correctly referencing the ObjectId
      res.json(projects); // Sending the blogs as JSON
    } catch (err) {
      res.status(500).json({message: "Server Error", error: err.message}); // Error handling
    }
});

// Create a new project (JWT-based authentication required)
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const project = new Project({
            name: req.body.name,
            description: req.body.description,
            owner: req.user._id, // Set the owner to the logged-in user
            image: req.body.image,
            code:req.body.code,
            // status: req.body.status,
            // links: {
            //     url: req.body.linkUrl,
            //     description: req.body.linkDescription,
            // },
        });

        const newProject = await project.save(); // Save the new project
        res.status(201).json(newProject); // Return the created project
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Update a project by ID (JWT-based authentication and ensure it's the author's project)
router.put('/:id', [passport.authenticate('jwt', { session: false }), ensureAuthor(Project)], async (req, res) => {
    const { name, description, status, linkUrl, linkDescription, image } = req.body;

    // Assign updated values to the project
    req.item.name = name;
    req.item.description = description;
    req.item.status = status;
    req.item.links.url = linkUrl;
    req.item.links.description = linkDescription;
    req.item.image = image;

    try {
        await req.item.save(); // Save the updated project
        res.json({ message: 'Project updated successfully', project: req.item });
    } catch (error) {
        res.status(500).json({ message: 'Error updating project', error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
      const project = await Project.findById(req.params.id).populate('owner');
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project); // Return the Project if found
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });


// DELETE a project by ID
router.delete('/:id',passport.authenticate('jwt', { session: false }), ensureAuthor(Project), async (req, res) => {
    try {
        const projectId = req.params.id;

        // Delete the project
        await Project.deleteOne({ _id: projectId });

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: 'Error deleting project', error: error.message });
    }
});

module.exports = router;
