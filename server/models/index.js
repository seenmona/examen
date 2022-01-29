const sequelize = require("../config/db");

const JobPosting = sequelize.import("./jobPosting");
const Candidate = sequelize.import("./candidate");

JobPosting.hasMany(Candidate, { onDelete: "Cascade" });

module.exports = { JobPosting, Candidate, sequelize };
