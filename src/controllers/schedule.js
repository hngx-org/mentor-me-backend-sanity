const Schedule = require("../models/schedule");
const mongoose = require("mongoose");

const getSchedules = async (req, res) => {
    const schedule = await Schedule.find({}).sort({ createdAt: -1 });

    res.status(200).json(schedule);
};

const getSchedule = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Schedule" });
    }

    const schedule = await Schedule.findById(id);

    if (!schedule) {
        return res.status(404).json({ error: "No Schedule" });
    }

    res.status(200).json(schedule);
};

const createSchedules = async (req, res) => {
    const { title, date, time, meetingUrl, menteeName, type } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push("title");
    }
    if (!date) {
        emptyFields.push("date");
    }
    if (!time) {
        emptyFields.push("time");
    }
    if (!meetingUrl) {
        emptyFields.push("meetingUrl");
    }
    if (!menteeName) {
        emptyFields.push("menteeName");
    }
    if (!type) {
        emptyFields.push("type");
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: "Please fill in all fields", emptyFields });
    }

    try {
        const schedule = await Schedule.create({
            title,
            date,
            time,
            meetingUrl,
            menteeName,
            type,
        });
        res.status(200).json(schedule);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteSchedules = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such schedules" });
    }

    const schedule = await schedule.findOneAndDelete({ _id: id });

    if (!schedule) {
        return res.status(400).json({ error: "No such schedules" });
    }

    res.status(200).json(resources);
};

const updateSchedules = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such schedules" });
    }

    const resources = await Schedule.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );

    if (!resources) {
        return res.status(400).json({ error: "No such schedules" });
    }

    res.status(200).json(resources);
};

module.exports = {
    getSchedules,
    getSchedule,
    createSchedules,
    deleteSchedules,
    updateSchedules,
};
