const express = require("express");
const { getSchedules, getSchedule, createSchedules, deleteSchedules, updateSchedules } = require("../controllers/schedule");

const router = express.Router();

router.get("/", getSchedules);

router.get("/:id", getSchedule);

router.post("/", createSchedules);

router.delete("/:id", deleteSchedules);

router.patch("/:id", updateSchedules);

module.exports = router;
