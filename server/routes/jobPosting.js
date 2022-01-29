const express = require("express");
const router = express.Router();
const { jobPosting } = require("../controllers");

router.post("/", jobPosting.addJobPosting);
router.delete("/:id", jobPosting.deleteJobPosting);
router.put("/", jobPosting.editJobPosting);
router.get("/", jobPosting.getJobPostings);
router.get("/:id", jobPosting.getJobPostingById);
router.get("/count", jobPosting.countJobPostings);

module.exports = router;
