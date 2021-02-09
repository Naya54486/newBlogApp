var User = require('../models/user');
var models = require('../models');

// Display user create form on GET.
exports.user_create_get = function(req, res, next) {
        // create user GET controller logic here 
        res.render('forms/user_form', { title: 'Create User',  layout: 'layouts/detail'});
        console.log("User form renders successfully");
};

// Handle user create on POST.
exports.user_create_post = function(req, res, next) {
     models.User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            role: req.body.role
        }).then(function() {
            console.log("User created successfully");
           // check if there was an error during user creation
            res.redirect('/blog/users');
      });
};

// Display user delete form on GET.
exports.user_delete_get = function(req, res, next) {
        // GET logic to delete an user here
        models.User.destroy({
            // find the user_id to delete from database
            where: {
              id: req.params.user_id
            }
          }).then(function() {
           // If a user gets deleted successfully, we just redirect to users list
           // no need to render a page
            res.redirect('/blog/users');
            console.log("User deleted successfully");
          });
        // renders user delete page
        // res.render('pages/user_delete', { title: 'Delete User',  layout: 'layouts/detail'} );
};

// Handle user delete on POST.
exports.user_delete_post = function(req, res, next) {
        // POST logic to delete an user here
        // If an user gets deleted successfully, we just redirect to users list
        // no need to render a page
        console.log(req.params.user_id)
        models.User.destroy({
            // find the user_id to delete from database
            where: {
              id: req.params.user_id  //.split(":")[1]
            }
          }).then(function() {
           // If a user gets deleted successfully, we just redirect to users list
           // no need to render a page
            res.redirect('/blog/users');
            console.log("User deleted successfully");
          });
};


// Display user update form on GET.
exports.user_update_get = function(req, res, next) {
        // Find the user you want to update
        console.log("ID is " + req.params.user_id);
        models.User.findById(
                req.params.user_id
        ).then(function(user) {
               // renders a user form
               res.render('forms/user_form', { title: 'Update User', user: user, layout: 'layouts/detail'});
               console.log("User update get successful");
          });
        
};

// Handle post update on POST.
exports.user_update_post = function(req, res, next) {
        console.log("ID is " + req.params.user_id);
        models.User.update(
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
                    id: req.params.user_id
                }
            }
        //   returning: true, where: {id: req.params.post_id} 
         ).then(function() { 
                // If an post gets updated successfully, we just redirect to posts list
                // no need to render a page
                res.redirect("/blog/users");  
                console.log("User updated successfully");
          });
};

// Display detail page for a specific user.
exports.user_detail = function(req, res, next) {
        // find a user by the primary key Pk
        models.User.findById(
                req.params.user_id
        ).then(function(user) {
        // renders an inividual user details page
        console.log("Database return user " + user.username);
        res.render('pages/user_detail', { title: 'User Details', user: user, layout: 'layouts/detail'} );
        console.log("User deteials renders successfully");
        });
};

// Display list of all users.
exports.user_list = function(req, res, next) {
        // controller logic to display all users
        models.User.findAll(
        ).then(function(users) {
        // renders a user list page
        console.log("rendering user list");
        res.render('pages/user_list', { title: 'User List', users: users, layout: 'layouts/list'} );
        console.log("User list renders successfully");
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

 