const { Candidate, JobPosting } = require("../models");

const controller = {
  addCandidate: async (req, res) => {
    try {
      const { nume, cv, email, jobPostingId } = req.body;

      const errors = [];
      let jobPost;

      if (!jobPostingId) {
        errors.push("JobPost nu a fost specificat");
      } else
        jobPost = await JobPosting.findOne({ where: { id: jobPostingId } });

      if (!jobPost) {
        errors.push("Job post nu a fost gasit");
      }
      if (!email) {
        errors.push("Email e gol");
      } else if (
        !email.match(
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        )
      ) {
        errors.push("Email nu e valid");
      }

      if (!nume) {
        errors.push("Nume e gol");
      } else if (nume.length < 5) {
        errors.push("Numele nu e valid");
      }
      if (!cv) {
        errors.push("CV e gol");
      } else if (cv.length < 100) {
        errors.push("CV nu e valid");
      }

      if (errors.length === 0) {
        await Candidate.create({
          cv,
          nume,
          email,
          jobPostingId,
        });
        res.status(201).send({
          message: `Candidate a fost creat`,
        });
      } else {
        res.status(400).send({ errors });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error",
      });
    }
  },
  getCandidates: async (req, res) => {
    try {
      const { jobPostingId } = req.params;

      const candidates = jobPostingId
        ? await Candidate.findAll({
            where: { jobPostingId },
          })
        : await Candidate.findAll({
            where: {},
          });
      res.status(200).send(candidates);

      //
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error",
      });
    }
  },

  editCandidate: async (req, res) => {
    try {
      const { nume, cv, email, id } = req.body;

      const errors = [];
      const candidate = await Candidate.findOne({ where: { id } });

      if (!candidate) {
        errors.push("Candidate nu exista");
      }

      if (!email) {
        errors.push("Email e gol");
      } else if (
        !email.match(
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        )
      ) {
        errors.push("Email nu e valid");
      }

      if (!nume) {
        errors.push("Nume e gol");
      } else if (nume.length < 5) {
        errors.push("Numele nu e valid");
      }
      if (!cv) {
        errors.push("CV e gol");
      } else if (cv.length < 100) {
        errors.push("CV nu e valid");
      }

      if (errors.length === 0) {
        await candidate.update({
          ...candidate,
          nume,
          cv,
          email,
        });

        res.status(200).send({
          message: `Candidate a fost modificat cu succes`,
        });
      } else {
        res.status(400).send({ errors });
      }
      //
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error",
      });
    }
  },

  getCandidateById: async (req, res) => {
    try {
      const { id } = req.params;

      const candidate = await Candidate.findOne({
        where: { id },
      });

      res.status(200).send(candidate);

      //
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error",
      });
    }
  },

  deleteCandidate: async (req, res) => {
    try {
      const { id } = req.params;

      const errors = [];
      const candidate = await Candidate.findOne({ where: { id } });

      if (!candidate) {
        errors.push("Candidate nu exista");
      }

      if (errors.length === 0) {
        await candidate.destroy();

        res.status(200).send({
          message: `Candidate a fost sters cu succes`,
        });
      } else {
        res.status(400).send({ errors });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error",
      });
    }
  },
};

module.exports = controller;
