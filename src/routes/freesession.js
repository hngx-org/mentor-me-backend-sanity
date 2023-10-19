const express = require("express");
const { getFreeSessions, getFreeSession, createFreeSessions, deleteFreeSessions, updateFreeSessions } = require("../controllers/freesession");

const router = express.Router();

router.get("/", getFreeSessions);

router.get("/:id", getFreeSession);

router.post("/", createFreeSessions);

router.delete("/:id", deleteFreeSessions);

router.patch("/:id", updateFreeSessions);

module.exports = router;
