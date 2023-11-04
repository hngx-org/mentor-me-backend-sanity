const express = require("express");
const { getOneOffSessions, getOneOffSession, createOneOffSessions, deleteOneOffSessions, updateOneOffSessions } = require("../controllers/oneoffsession");

const router = express.Router();

router.get("/", getOneOffSessions);

router.get("/:id", getOneOffSession);

router.post("/", createOneOffSessions);

router.delete("/:id", deleteOneOffSessions);

router.patch("/:id", updateOneOffSessions);

module.exports = router;
