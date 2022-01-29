const { JobPosting } = require("../models");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const controller = {
  addJobPosting: async (req, res) => {
    try {
      const { descriere, deadline } = req.body;

      const errors = [];

      if (!descriere) {
        errors.push("descriere e gol");
      } else if (descriere.length < 3) {
        errors.push("descrierea nu e valida");
      }

      if (!deadline) {
        errors.push("deadline e gol");
      } else if (!Date.parse(deadline)) {
        errors.push("deadline nu e valid");
      }

      if (errors.length === 0) {
        await JobPosting.create({
          descriere,
          deadline,
        });
        res.status(201).send({
          message: `JobPosting a fost creat`,
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
  getJobPostings: async (req, res) => {
    try {
      const limit = 5;
      const { filter, startDate, endDate, sort, offset } = req.query;

      const where = {};

      if (filter) {
        where.descriere = { [Op.like]: "%" + filter + "%" };
      }

      if (startDate && !endDate) {
        where.deadline = { [Op.gte]: startDate };
      } else if (!startDate && endDate) {
        where.deadline = { [Op.lte]: endDate };
      } else if (startDate && endDate) {
        where.deadline = { [Op.gte]: startDate, [Op.lte]: endDate };
      }

      const jobPostings = await JobPosting.findAll({
        where,
        order: [["deadline", sort ? sort : "DESC"]],
        offset: Number.parseInt(offset),
        limit,
      });

      res.status(200).send(jobPostings);

      //
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error",
      });
    }
  },

  getJobPostingById: async (req, res) => {
    try {
      const { id } = req.params;

      const jobPosting = await JobPosting.findOne({
        where: { id },
      });

      res.status(200).send(jobPosting);

      //
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error",
      });
    }
  },

  countJobPostings: async (req, res) => {
    try {
      const { filter, startDate, endDate } = req.query;

      const where = {};

      if (filter) {
        where.descriere = { [Op.like]: "%" + filter + "%" };
      }

      if (startDate && !endDate) {
        where.deadline = { [Op.gte]: startDate };
      } else if (!startDate && endDate) {
        where.deadline = { [Op.lte]: endDate };
      } else if (startDate && endDate) {
        where.deadline = { [Op.gte]: startDate, [Op.lte]: endDate };
      }

      const jobPostings = await JobPosting.count({
        where,
      });

      res.status(200).send({ count: jobPostings });

      //
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error",
      });
    }
  },

  editJobPosting: async (req, res) => {
    try {
      const { descriere, deadline, id } = req.body;

      const errors = [];
      const jobPosting = await JobPosting.findOne({ where: { id } });

      if (!jobPosting) {
        errors.push("JobPosting nu exista");
      }

      if (!descriere) {
        errors.push("descriere e gol");
      }

      if (!deadline) {
        errors.push("deadline e gol");
      }

      if (errors.length === 0) {
        await jobPosting.update({
          ...jobPosting,
          descriere,
          deadline,
        });

        res.status(200).send({
          message: `JobPosting a fost modificat cu succes`,
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
  deleteJobPosting: async (req, res) => {
    try {
      const { id } = req.params;

      const errors = [];
      const jobPosting = await JobPosting.findOne({ where: { id } });

      if (!jobPosting) {
        errors.push("JobPosting nu exista");
      }

      if (errors.length === 0) {
        await jobPosting.destroy();

        res.status(200).send({
          message: `JobPosting a fost sters cu succes`,
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
