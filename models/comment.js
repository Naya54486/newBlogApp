'use strict';
 module.exports = (sequelize, DataTypes) => {
   var Comment = sequelize.define('Comment', {
     title: DataTypes.STRING,
     PostId: DataTypes.INTEGER
   });
 
   // create post association
   // a post will have an author
   // a field called AuthorId will be created in the post table inside the db
   Comment.associate = function (models) {
     models.Comment.belongsTo(models.Post, {
       onDelete: "CASCADE",
       foreignKey: {
         allowNull: false
       }
 
     });
     
   };
 
   return Comment;
 };
 
 // Make sure you complete other models fields