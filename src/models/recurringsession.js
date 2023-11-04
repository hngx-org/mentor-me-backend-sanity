const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recurringSchema = new Schema(
    {
        sessionName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },

        occurence: {
            type: String,
            required: true,
        },
        numberOfSession: {
            type: Number,
            required: true,
        },

        relevantTopics: {
            type: String,
            required: true,
        },
        sessionType: {
            type: String,
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
        sessionUrl: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("RecurringSession", recurringSchema);
