const RecurringSession = require("../models/recurringsession");
const mongoose = require("mongoose");

const getRecurringSessions = async (req, res) => {
    const recurringsession = await RecurringSession.find({}).sort({
        createdAt: -1,
    });

    res.status(200).json(recurringsession);
};

const getRecurringSession = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Schedule" });
    }

    const recurringsession = await RecurringSession.findById(id);

    if (!recurringsession) {
        return res.status(404).json({ error: "No Schedule" });
    }

    res.status(200).json(recurringsession);
};

const createRecurringSessions = async (req, res) => {
    const { sessionName, description, occurence, numberOfSession, relevantTopics, sessionType, time, date, sessionUrl, tag } = req.body;

    let emptyFields = [];

    if (!sessionName) {
        emptyFields.push("sessionName");
    }
    if (!description) {
        emptyFields.push("description");
    }

    if (!occurence) {
        emptyFields.push("occurence");
    }
    if (!numberOfSession) {
        emptyFields.push("numberOfSession");
    }
    if (!sessionType) {
        emptyFields.push("sessionType");
    }

    if (!relevantTopics) {
        emptyFields.push("relevantTopics");
    }
    if (!time) {
        emptyFields.push("time");
    }
    if (!date) {
        emptyFields.push("date");
    }
    if (!sessionUrl) {
        emptyFields.push("sessionUrl");
    }
    if (!tag) {
        emptyFields.push("tag");
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: "Please fill in all fields", emptyFields });
    }

    try {
        const recurringsession = await RecurringSession.create({
            sessionName,
            description,
            occurence,
            numberOfSession,
            relevantTopics,
            sessionType,
            time,
            date,
            sessionUrl,
            tag,
        });
        res.status(200).json(recurringsession);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteRecurringSessions = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such schedules" });
    }

    const recurringsession = await recurringsession.findOneAndDelete({ _id: id });

    if (!recurringsession) {
        return res.status(400).json({ error: "No such schedules" });
    }

    res.status(200).json(recurringsession);
};

const updateRecurringSessions = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such schedules" });
    }

    const recurringsession = await RecurringSession.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );

    if (!recurringsession) {
        return res.status(400).json({ error: "No such schedules" });
    }

    res.status(200).json(recurringsession);
};

module.exports = {
    getRecurringSessions,
    getRecurringSession,
    createRecurringSessions,
    deleteRecurringSessions,
    updateRecurringSessions,
};
