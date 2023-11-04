const UpcomingSession = require("../models/upcomingsession");
const mongoose = require("mongoose");

const getUpcomingSessions = async (req, res) => {
    const upcomingsession = await UpcomingSession.find({}).sort({
        createdAt: -1,
    });

    res.status(200).json(upcomingsession);
};

const getUpcomingSession = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Schedule" });
    }

    const upcomingsession = await UpcomingSession.findById(id);

    if (!upcomingsession) {
        return res.status(404).json({ error: "No Schedule" });
    }

    res.status(200).json(upcomingsession);
};

const createUpcomingSessions = async (req, res) => {
    const { menteeName, sessionName, date, dateOfSession, time, currency, personalNote, price, status, pricing, typeOfSession } = req.body;

    let emptyFields = [];

    if (!menteeName) {
        emptyFields.push("menteeName");
    }
    if (!sessionName) {
        emptyFields.push("sessionName");
    }
    if (!date) {
        emptyFields.push("date");
    }

    if (!dateOfSession) {
        emptyFields.push("dateOfSession");
    }

    if (!time) {
        emptyFields.push("time");
    }
    if (!currency) {
        emptyFields.push("currency");
    }
    if (!personalNote) {
        emptyFields.push("personalNote");
    }
    if (!price) {
        emptyFields.push("price");
    }

    if (!status) {
        emptyFields.push("status");
    }
    if (!pricing) {
        emptyFields.push("pricing");
    }
    if (!typeOfSession) {
        emptyFields.push("typeOfSession");
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: "Please fill in all fields", emptyFields });
    }

    try {
        const upcomingsession = await UpcomingSession.create({
            menteeName,
            sessionName,
            date,
            dateOfSession,
            time,
            currency,
            personalNote,
            price,
            status,
            pricing,
            typeOfSession,
        });
        res.status(200).json(upcomingsession);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteUpcomingSessions = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such schedules" });
    }

    const upcomingsession = await upcomingsession.findOneAndDelete({ _id: id });

    if (!upcomingsession) {
        return res.status(400).json({ error: "No such schedules" });
    }

    res.status(200).json(upcomingsession);
};

const updateUpcomingSessions = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such schedules" });
    }

    const upcomingsession = await UpcomingSession.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );

    if (!upcomingsession) {
        return res.status(400).json({ error: "No such schedules" });
    }

    res.status(200).json(upcomingsession);
};

module.exports = {
    getUpcomingSessions,
    getUpcomingSession,
    createUpcomingSessions,
    deleteUpcomingSessions,
    updateUpcomingSessions,
};
