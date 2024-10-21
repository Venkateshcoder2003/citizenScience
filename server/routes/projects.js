const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


// router.post('/', auth, async (req, res) => {
//     try {
//         const { title, description, dataFields } = req.body;
//         const project = new Project({
//             title,
//             description,
//             creator: req.user.userId,
//             dataFields
//         });
//         await project.save();
//         res.status(201).json(project);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create project' });
//     }
// });


router.post('/submit', auth, upload.single('pdf'), async (req, res) => {
    try {
        const { projectId } = req.body;
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        project.submissions.push({
            user: req.user.userId,
            pdf: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });
        await project.save();
        res.status(201).json({ message: 'PDF submitted successfully' });
    } catch (error) {
        console.error('Failed to submit PDF:', error);
        res.status(500).json({ error: 'Failed to submit PDF' });
    }
});


router.get('/submissions/:submissionId', auth, async (req, res) => {
    try {
        const { submissionId } = req.params;
        const project = await Project.findOne({ 'submissions._id': submissionId }, { 'submissions.$': 1 });

        if (!project || !project.submissions.length) {
            return res.status(404).json({ error: 'Submission not found' });
        }

        const submission = project.submissions[0];
        res.setHeader('Content-Type', submission.pdf.contentType);
        res.send(submission.pdf.data);
    } catch (error) {
        console.error('Failed to fetch submission:', error);
        res.status(500).json({ error: 'Failed to fetch submission' });
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