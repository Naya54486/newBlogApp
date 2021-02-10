'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    name: DataTypes.STRING
  });

  Category.associate = function (models) {
    models.Category.belongsToMany(models.Post, {
      as: "posts",
      through: "PostCategories",
      foreignKey: "category_id",
    });
    
  };

  return Category;
};

// Make sure you complete other models fields