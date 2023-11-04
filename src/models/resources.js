const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resourcesSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        ratings: {
            type: Number,
            required: true,
        },
        reviews: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        track: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },

        courseContents: [
            {
                id: String,
                title: String,
                duration: Number,
                required: true,
            },
        ],
        imageUrl: {
            type: String,
            required: true,
        },
        videoUrl: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Resources", resourcesSchema);
