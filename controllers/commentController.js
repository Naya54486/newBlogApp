var Comment = require('../models/comment');
var models = require('../models');

// Display comment create form on GET.
exports.comment_create_get = function(req, res, next) {
        // create comment GET controller logic here 
        
        // renders a comment form

        res.render('forms/comment_form', { title: 'Create Comment', layout: 'layouts/detail'});
        console.log("Comment form renders successfully");
};

// Handle comment create on POST.
exports.comment_create_post = async function(req, res, next) {
     // create comment POST controller logic here
     let post_id = req.body.post_id
     models.Comment.create({
            title: req.body.comment_title,
            PostId: req.body.post_id
        }).then(function() {
            console.log("Comment created successfully");
           // check if there was an error during post creation
            res.redirect('/blog/post/' + post_id);
      });
};

// Display comment delete form on GET.
exports.comment_delete_get = function(req, res, next) {
        models.Comment.destroy({
            // find the comment_id to delete from database
            where: {
              id: req.params.comment_id
            }
          }).then(function() {
           // If a comment gets deleted successfully, we just redirect to comments list
           // no need to render a page
            res.redirect('/blog/comments');
            console.log("Comment deleted successfully");
          });
};

// Handle comment delete on POST.
exports.comment_delete_post = function(req, res, next) {
        // POST logic to delete a comment here
        // If a comment gets deleted successfully, we just redirect to comment list
        // no need to render a page
        console.log(req.params.comment_id);
        models.Comment.destroy({
            // find the comment_id to delete from database
            where: {
              id: req.params.comment_id  //.split(":")[1]
            }
          }).then(function() {
           // If a comment gets deleted successfully, we just redirect to comments list
           // no need to render a page
            res.redirect('/blog/ccomments');
            console.log("Comment deleted successfully");
          });
};

// Display comment update form on GET.
exports.comment_update_get = function(req, res, next) {
        // Find the comment you want to update
        console.log("ID is " + req.params.comment_id);
        models.Comment.findById(
                req.params.comment_id
        ).then(function(comment) {
               // renders a comment form
               res.render('forms/comment_form', { title: 'Update Comment', comment: comment, layout: 'layouts/detail'});
               console.log("Comment update get successful");
          });
};

// Handle comment update on POST.
exports.comment_update_post = function(req, res, next) {
       console.log("ID is " + req.params.comment_id);
        models.Comment.update(
        // Values to update
            {
                title: req.body.title,
            },
          { // Clause
                where: 
                {
                    id: req.params.comment_id
                }
            }
        //   returning: true, where: {id: req.params.} 
         ).then(function() { 
                // If an comments gets updated successfully, we just redirect to posts list
                // no need to render a page
                res.redirect("/blog/comments");  
                console.log("Comment updated successfully");
          });
};

// Display list of all comments.
exports.comment_list = function(req, res, next) {
        // controller logic to display all comment
        
        models.Comment.findAll(
        ).then(function(comments) {
        // renders a comment list page
        console.log("rendering comment list");
        res.render('pages/comment_list', { title: 'Comment List', comments: comments, layout: 'layouts/list'} );
        console.log("Comment list renders successfully");
        });
};

// Display detail page for a specific comment.
exports.comment_detail = function(req, res, next) {
        // find a comment by the primary key Pk
        models.Comment.findById(
                req.params.comment_id
        ).then(function(comment) {
        // renders an inividual comment details page
        console.log("Database return comment " + comment.title);
        res.render('pages/comment_detail', { title: 'Comment Details', comment: comment, layout: 'layouts/detail'} );
        console.log("comment deteials renders successfully");
        });
        
        
};