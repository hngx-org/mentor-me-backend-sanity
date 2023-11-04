const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const upcomingsessionSchema = new Schema(
    {
        menteeName: {
            type: String,
            required: true,
        },
        sessionName: {
            type: String,
            required: true,
        },

        date: {
            type: String,
            required: true,
        },
        dateOfSession: {
            type: Date,
            required: true,
        },

        time: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        personalNote: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Rescheduled", "Accepted", "Cancelled"],
            required: true,
        },
        pricing: {
            type: String,
            enum: ["Pay", "Rescheduled"],
            required: true,
        },
        typeOfSession: {
            type: String,
            enum: ["1 One 1", "General"],
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("UpcomingSession", upcomingsessionSchema);
