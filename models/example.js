module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    audio: DataTypes.STRING,
    description_highlighted: DataTypes.STRING,
    genre_ids: DataTypes.INTEGER,
    listennotes_url:DataTypes.STRING,
    publisher_highlighted: DataTypes.STRING
  });
  return Example;
};
