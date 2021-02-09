var Author = require('../models/author');
var models = require('../models');

// Display author create form on GET.
exports.author_create_get = function(req, res, next) {
        // create author GET controller logic here 
        res.render('forms/author_form', { title: 'Create Author',  layout: 'layouts/detail'});
        console.log("User form renders successfully");
};

// Handle author create on POST.
exports.author_create_post = function(req, res, next) {
      models.Author.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            role: req.body.role
        }).then(function() {
            console.log("Author created successfully");
           // check if there was an error during author creation
            res.redirect('/blog/authors');
      });
};

// Display author delete form on GET.
exports.author_delete_get = function(req, res, next) {
        // POST logic to delete an author here
        // If an author gets deleted successfully, we just redirect to authors list
        // no need to render a page
        models.Author.destroy({
            // find the author_id to delete from database
            where: {
              id: req.params.author_id  //.split(":")[1]
            }
          }).then(function() {
          // If a author gets deleted successfully, we just redirect to authors list
          // no need to render a page
            res.redirect('/blog/authors');
            console.log("Author deleted successfully");
          });
};

// Handle author delete on POST.
exports.author_delete_post = function(req, res, next) {
        // POST logic to delete an author here
        // If an author gets deleted successfully, we just redirect to authors list
        // no need to render a page
        console.log(req.params.author_id)
        models.Author.destroy({
            // find the author_id to delete from database
            where: {
              id: req.params.author_id  //.split(":")[1]
            }
          }).then(function() {
           // If an author gets deleted successfully, we just redirect to authors list
           // no need to render a page
            res.redirect('/blog/authors');
            console.log("Author deleted successfully");
          });
};

// Display author update form on GET.
exports.author_update_get = function(req, res, next) {
        // Find the author you want to update
        console.log("ID is " + req.params.author_id);
        models.Author.findById(
                req.params.author_id
        ).then(function(author) {
               // renders an authors form
               res.render('forms/author_form', { title: 'Update Author', author: author, layout: 'layouts/detail'});
               console.log("Authors update get successful");
          });
        
};

// Handle post update on POST.
exports.author_update_post = function(req, res, next) {
        console.log("ID is " + req.params.author_id);
        models.Author.update(
        // Values to update
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                email: req.body.email,
                role: req.body.role
            },
          { // Clause
                where: 
                {
                    id: req.params.author_id
                }
            }
        //   returning: true, where: {id: req.params.post_id} 
         ).then(function() { 
                // If an post gets updated successfully, we just redirect to posts list
                // no need to render a page
                res.redirect("/blog/authors");  
                console.log("Authors updated successfully");
          });
};

// Display list of all authors.
exports.author_list = function(req, res, next) {
        // controller logic to display all author
        models.Author.findAll(
        ).then(function(authors) {
        // renders a author list page
        console.log("rendering author list");
        res.render('pages/author_list', { title: 'Author List', authors: authors, layout: 'layouts/list'} );
        console.log("User list renders successfully");
        });
        
};

// Display detail page for a specific author.
exports.author_detail = function(req, res, next) {
        // find a authorr by the primary key Pk
        models.Author.findById(
                req.params.author_id
        ).then(function(author) {
        // renders an inividual author details page
        console.log("Database return author " + author.username);
        res.render('pages/author_detail', { title: 'Author Details', author: author, layout: 'layouts/detail'} );
        console.log("Authors deteials renders successfully");
        });
};
 
 // This is the blog homepage.
exports.index = function(req, res) {

      // find the count of posts in database
      models.User.findAndCountAll(
      ).then(function(userCount) {
          
       
        // find the count of authors in database
 
        // find the count of comments in database
 
        // find the count of categories in database
 
        res.render('pages/index', {title: 'Homepage', userCount: userCount, layout: 'layouts/main'});
        
        // res.render('pages/index_list_sample', { title: 'Post Details', layout: 'layouts/list'});
        // res.render('pages/index_detail_sample', { page: 'Home' , title: 'Post Details', layout: 'layouts/detail'});

      });
    
    
    };
