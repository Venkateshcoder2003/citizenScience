const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
    try {
        const { title, description, dataFields } = req.body;
        const project = new Project({
            title,
            description,
            creator: req.user.userId,
            dataFields
        });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create project' });
    }
});

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().populate('creator', 'username');
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

module.exports = router;