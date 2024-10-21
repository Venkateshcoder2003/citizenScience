const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dataFields: [{ name: String, type: String }],
    submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }]
});

module.exports = mongoose.model('Project', projectSchema);