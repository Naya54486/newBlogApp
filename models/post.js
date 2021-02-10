'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    post_title: DataTypes.STRING,
    post_body: DataTypes.STRING,
    AuthorId: DataTypes.INTEGER,
  });

  Post.associate = function (models) {
    models.Post.belongsTo(models.Author, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  Post.associate = function (models) {
    models.Post.hasMany(models.Comment);
  };

  Post.associate = function (models) {
    models.Post.belongsToMany(models.Category, {
      as: "categories",
      through: "PostCategories",
      foreignKey: "post_id",                                                                                                                                                                                                                                                                                                                                                                                                                              
    });
    
  };


  return Post;
};

// Make sure you complete other models fields
