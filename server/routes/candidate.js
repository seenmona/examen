const express = require("express");
const router = express.Router();
const { candidate } = require("../controllers");

router.post("/", candidate.addCandidate);
router.delete("/:id", candidate.deleteCandidate);
router.put("/", candidate.editCandidate);
router.get("/:jobPostingId", candidate.getCandidates);
router.get("/:id", candidate.getCandidateById);
router.get("/:jobPostingId", candidate.getCandidates);

module.exports = router;
