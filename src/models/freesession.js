const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const freesessionSchema = new Schema(
    {
        sessionName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        attendeesLimit: {
            type: Number,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },

        relevantTopics: {
            type: String,
            required: true,
        },
        sessionUrl: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("FreeSession", freesessionSchema);
