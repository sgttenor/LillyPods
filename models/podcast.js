module.exports = function(sequelize, DataTypes) {
  var Podcast = sequelize.define("Podcast", {
    audio: DataTypes.STRING,
    description_original: DataTypes.TEXT
  });
  return Podcast;
};
