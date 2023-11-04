const FreeSession = require("../models/freesession");
const mongoose = require("mongoose");

const getFreeSessions = async (req, res) => {
    const freesession = await FreeSession.find({}).sort({ createdAt: -1 });

    res.status(200).json(freesession);
};

const getFreeSession = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Schedule" });
    }

    const freesession = await FreeSession.findById(id);

    if (!freesession) {
        return res.status(404).json({ error: "No Schedule" });
    }

    res.status(200).json(freesession);
};

const createFreeSessions = async (req, res) => {
    const { sessionName, description, attendeesLimit, time, date, relevantTopics, sessionUrl, tag, duration } = req.body;

    let emptyFields = [];

    if (!sessionName) {
        emptyFields.push("description");
    }
    if (!description) {
        emptyFields.push("description");
    }
    if (!attendeesLimit) {
        emptyFields.push("attendeesLimit");
    }
    if (!time) {
        emptyFields.push("time");
    }
    if (!date) {
        emptyFields.push("date");
    }

    if (!relevantTopics) {
        emptyFields.push("relevantTopics");
    }
    if (!sessionUrl) {
        emptyFields.push("sessionUrl");
    }
    if (!tag) {
        emptyFields.push("tag");
    }
    if (!duration) {
        emptyFields.push("duration");
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: "Please fill in all fields", emptyFields });
    }

    try {
        const freesession = await FreeSession.create({
            sessionName,
            description,
            attendeesLimit,
            time,
            date,
            relevantTopics,
            sessionUrl,
            tag,
            duration,
        });
        res.status(200).json(freesession);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteFreeSessions = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such schedules" });
    }

    const freesession = await freesession.findOneAndDelete({ _id: id });

    if (!freesession) {
        return res.status(400).json({ error: "No such schedules" });
    }

    res.status(200).json(freesession);
};

const updateFreeSessions = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such schedules" });
    }

    const freesession = await FreeSession.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );

    if (!freesession) {
        return res.status(400).json({ error: "No such schedules" });
    }

    res.status(200).json(freesession);
};

module.exports = {
    getFreeSessions,
    getFreeSession,
    createFreeSessions,
    deleteFreeSessions,
    updateFreeSessions,
};
