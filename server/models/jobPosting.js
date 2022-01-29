module.exports = function (sequelize, DataTypes) {
  return sequelize.define("jobPosting", {
    descriere: {
      type: DataTypes.STRING,
      // allowNull: false,
      defaultValue: null,
      validate: { is: /.{3,}$/ },
    },
    deadline: {
      type: DataTypes.DATE,
      // allowNull: false,
      defaultValue: null,
      // validate: { is: /.{3,}$/ },
    },
  });
};
