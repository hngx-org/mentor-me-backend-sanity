const OneOffSession = require("../models/oneoffsession");
const mongoose = require("mongoose");

const getOneOffSessions = async (req, res) => {
    const oneoffsession = await OneOffSession.find({}).sort({ createdAt: -1 });

    res.status(200).json(oneoffsession);
};

const getOneOffSession = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Schedule" });
    }

    const oneoffsession = await OneOffSession.findById(id);

    if (!oneoffsession) {
        return res.status(404).json({ error: "No Schedule" });
    }

    res.status(200).json(oneoffsession);
};

const createOneOffSessions = async (req, res) => {
    const { sessionName, description, time, date, relevantTopics, sessionUrl, tag, duration, sessionType } = req.body;

    let emptyFields = [];

    if (!sessionName) {
        emptyFields.push("sessionName");
    }
    if (!description) {
        emptyFields.push("description");
    }

    if (!time) {
        emptyFields.push("time");
    }
    if (!date) {
        emptyFields.push("date");
    }
    if (!sessionType) {
        emptyFields.push("sessionType");
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
        const oneoffsession = await OneOffSession.create({
            sessionName,
            description,
            time,
            date,
            relevantTopics,
            sessionUrl,
            tag,
            duration,
            sessionType,
        });
        res.status(200).json(oneoffsession);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteOneOffSessions = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such schedules" });
    }

    const oneoffsession = await oneoffsession.findOneAndDelete({ _id: id });

    if (!oneoffsession) {
        return res.status(400).json({ error: "No such schedules" });
    }

    res.status(200).json(oneoffsession);
};

const updateOneOffSessions = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such schedules" });
    }

    const oneoffsession = await OneOffSession.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );

    if (!oneoffsession) {
        return res.status(400).json({ error: "No such schedules" });
    }

    res.status(200).json(oneoffsession);
};

module.exports = {
    getOneOffSessions,
    getOneOffSession,
    createOneOffSessions,
    deleteOneOffSessions,
    updateOneOffSessions,
};
