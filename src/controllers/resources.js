const Resources = require("../models/resources");
const uuid = require("uuid");
const mongoose = require("mongoose");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dfxu5hvrw",
    api_key: "235297942498392",
    api_secret: "-N970A8IobIZ-n_KrHlkOeK7mmY",
});

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        files: 2, // You can upload up to 2 files (image and video)
        fileSize: 15 * 1024 * 1024, // Total file size limit (5 MB)
    },
});

// Move the 'fields' declaration here
const fields = [
    { name: "image", maxCount: 1 }, // Accept 1 image file
    { name: "video", maxCount: 1 }, // Accept 1 video file
];

const getResources = async (req, res) => {
    const resources = await Resources.find({}).sort({ createdAt: -1 });

    res.status(200).json(resources);
};

const getResource = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Resources" });
    }

    const resources = await Resources.findById(id);

    if (!resources) {
        return res.status(404).json({ error: "No Resources" });
    }

    res.status(200).json(resources);
};

const createResources = async (req, res) => {
    const { title, name, role, company, ratings, reviews, currency, price, track, category, description, courseContents } = req.body;

    const imageBuffer = req.files.image[0].buffer;
    const videoBuffer = req.files.video[0].buffer;

    if (courseContents && Array.isArray(courseContents)) {
        req.body.courseContents = courseContents.map((courseContent) => {
            return {
                id: courseContent.id,
                title: courseContent.title,
                duration: courseContent.duration,
            };
        });
    } else {
        req.body.courseContents = [];
    }

    let emptyFields = [];

    if (!title) {
        emptyFields.push("title");
    }
    if (!name) {
        emptyFields.push("name");
    }
    if (!role) {
        emptyFields.push("role");
    }
    if (!company) {
        emptyFields.push("company");
    }
    if (!ratings) {
        emptyFields.push("ratings");
    }
    if (!reviews) {
        emptyFields.push("reviews");
    }
    if (!currency) {
        emptyFields.push("currency");
    }
    if (!price) {
        emptyFields.push("price");
    }
    if (!track) {
        emptyFields.push("track");
    }
    if (!category) {
        emptyFields.push("category");
    }
    if (!description) {
        emptyFields.push("description");
    }
    if (emptyFields.length > 0) {
        console.log(req.body);
    }

    try {
        const imageString = imageBuffer.toString("base64");
        const videoString = videoBuffer.toString("base64");

        const imageUri = `data:${req.files.image[0].mimetype};base64,${imageString}`;
        const videoUri = `data:${req.files.video[0].mimetype};base64,${videoString}`;

        // Upload the image to Cloudinary
        const imageResult = await cloudinary.uploader.upload(imageUri, {
            resource_type: "auto",
            public_id: `images/${uuid.v4()}`,
            file: imageString,
        });

        // Upload the video to Cloudinary
        const videoResult = await cloudinary.uploader.upload(videoUri, {
            resource_type: "video",
            public_id: `videos/${uuid.v4()}`,
            file: videoString,
        });

        const resources = await Resources.create({
            title,
            name,
            role,
            company,
            ratings,
            reviews,
            currency,
            price,
            track,
            category,
            description,
            courseContents,
            imageUrl: imageResult.secure_url,
            videoUrl: videoResult.secure_url,
        });

        res.status(200).json(resources);
        console.log(resources);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(req.body);
        console.log(error);
    }
};

const deleteResources = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such resources" });
    }

    const resources = await Resources.findOneAndDelete({ _id: id });

    if (!resources) {
        return res.status(400).json({ error: "No such resources" });
    }

    res.status(200).json(resources);
};

const updateResources = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such resources" });
    }

    const resources = await Resources.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );

    if (!resources) {
        return res.status(400).json({ error: "No such resources" });
    }

    res.status(200).json(resources);
};

module.exports = {
    getResource,
    getResources,
    createResources,
    deleteResources,
    updateResources,
    upload,
    fields,
};
