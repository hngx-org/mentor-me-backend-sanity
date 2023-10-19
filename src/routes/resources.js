const express = require("express");
const { getResources, getResource, createResources, deleteResources, updateResources, upload, fields } = require("../controllers/resources");

const router = express.Router();

router.get("/", getResources);

router.get("/:id", getResource);

router.post("/", upload.fields(fields), createResources);

router.delete("/:id", deleteResources);

router.patch("/:id", updateResources);

module.exports = router;
