const express = require("express");
const router = express.Router();
const jobsRouter = require("./jobPosting");
const candidateRouter = require("./candidate");
const { reset } = require("../controllers");

//reset
router.get("/reset", reset.reset);

router.get("/", reset.export);
router.post("/", reset.import);

router.use("/jobs", jobsRouter);
router.use("/candidates", candidateRouter);

module.exports = router;
