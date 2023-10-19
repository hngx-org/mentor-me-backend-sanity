const express = require("express");
const { getUpcomingSessions, getUpcomingSession, createUpcomingSessions, deleteUpcomingSessions, updateUpcomingSessions } = require("../controllers/upcomingsession");

const router = express.Router();

router.get("/", getUpcomingSessions);

router.get("/:id", getUpcomingSession);

router.post("/", createUpcomingSessions);

router.delete("/:id", deleteUpcomingSessions);

router.patch("/:id", updateUpcomingSessions);

module.exports = router;
