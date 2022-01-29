const { sequelize, JobPosting, Candidate } = require("../models");

const controller = {
  reset: async (req, res) => {
    try {
      await sequelize.sync({ force: true });
      res.status(201).send({
        message: "Database reset",
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error",
      });
    }
  },

  import: async (req, res) => {
    try {
      const jobPostings = req.body;

      await Promise.all(
        jobPostings.map(async (jobPosting) => {
          const jobPost = await JobPosting.create(jobPosting);
          await Promise.all(
            jobPosting.candidates.map(async (candidate) => {
              await Candidate.create({
                ...candidate,
                jobPostingId: jobPost.id,
              });
            })
          );
        })
      );
      res.status(200).send({ message: "Import finalizat" });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error",
      });
    }
  },
  export: async (req, res) => {
    try {
      const rawJobPostings = await JobPosting.findAll({
        attributes: ["id", "descriere", "deadline"],
        raw: true,
      });

      const jobPostings = await Promise.all(
        rawJobPostings.map(async (jobPosting) => {
          const candidates = await Candidate.findAll({
            attributes: ["nume", "email", "cv"],
            where: { jobPostingId: jobPosting.id },
            raw: true,
          });
          return {
            descriere: jobPosting.descriere,
            deadline: jobPosting.deadline,
            candidates,
          };
        })
      );

      res.status(200).send(jobPostings);
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error",
      });
    }
  },
};

module.exports = controller;
