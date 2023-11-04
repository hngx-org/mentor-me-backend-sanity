const express = require("express");
const { getRecurringSessions, getRecurringSession, createRecurringSessions, deleteRecurringSessions, updateRecurringSessions } = require("../controllers/recurringsession");

const router = express.Router();

router.get("/", getRecurringSessions);

router.get("/:id", getRecurringSession);

router.post("/", createRecurringSessions);

router.delete("/:id", deleteRecurringSessions);

router.patch("/:id", updateRecurringSessions);

module.exports = router;
