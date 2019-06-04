module.exports = function(sequelize, DataTypes) {
    var Podcast = sequelize.define("Podcast", {
      podcast_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      audio: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    });
  
    Podcast.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Podcast.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Podcast;
  };