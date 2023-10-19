const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scheduleSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: Number,
            required: true,
        },
        meetingUrl: {
            type: String,
            required: true,
        },
        menteeName: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["Private", "Public"],
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
