const mongoose = require('mongoose');

const ganttSchema = new mongoose.Schema(
    {
        id: { type: String },
        open: {
            type: Boolean,
            default: true,
        },
        start_date: { type: Date },
        end_date: { type: Date },
        type: { type: String },
        progress: { type: Number },
        parent: { type: String },
        text: { type: String, trim: true },
        is_type: {
            type: String,
            default: 'project',
        },
        username: {
            type: String,
            default: 'root',
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Gantt', ganttSchema);
