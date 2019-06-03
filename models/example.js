module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("lillypods_db", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Example;
};
