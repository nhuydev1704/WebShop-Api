const mongoose = require('mongoose');

const chatbotModel = new mongoose.Schema(
    {
        type: {
            type: String,
            trim: true,
        },
        data: {
            type: Object,
        },
        position: {
            type: Object,
        },
        id: {
            type: String,
            trim: true,
        },
        id_source: {
            type: String,
            trim: true,
        },
        id_target: {
            type: String,
            trim: true,
        },
        input_user: {
            type: Boolean,
        },
        options: {
            type: Array,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('ChatBot', chatbotModel);
