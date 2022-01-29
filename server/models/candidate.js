module.exports = function (sequelize, DataTypes) {
  return sequelize.define("candidate", {
    nume: {
      type: DataTypes.STRING,
      // allowNull: false,
      defaultValue: null,
      validate: { is: /.{5,}$/ },
    },
    cv: {
      type: DataTypes.STRING,
      // allowNull: false,
      defaultValue: null,
      validate: { is: /.{100,}$/ },
    },
    email: {
      type: DataTypes.STRING,
      // allowNull: false,
      defaultValue: null,
      validate: { isEmail: true },
    },
  });
};
