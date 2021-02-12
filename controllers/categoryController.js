var Category = require('../models/category');
var models = require('../models');

// Display category create form on GET.
exports.category_create_get = function(req, res, next) {
        // create category GET controller logic here 
        res.render('forms/category_form', { title: 'Create Category',  layout: 'layouts/detail'});
        console.log("Category form renders successfully");
};

// Handle category create on POST.
exports.category_create_post = function(req, res, next) {
     models.Category.create({
            name: req.body.name,
        }).then(function() {
            console.log("Category created successfully");
           // check if there was an error during category creation
            res.redirect('/blog/categories');
      });
};

// Display category delete form on GET.
exports.category_delete_get = function(req, res, next) {
        // GET logic to delete a category here
        models.Category.destroy({
            // find the category_id to delete from databases
            where: {
              id: req.params.category_id
            }
          }).then(function() {
           // If a category gets deleted successfully, we just redirect to categories list
           // no need to render a page
            res.redirect('/blog/categories');
            console.log("Category deleted successfully");
          });
        // renders category delete page
        // res.render('pages/category_delete', { title: 'Category Category',  layout: 'layouts/detail'} );
};

// Handle category delete on POST.
exports.category_delete_post = function(req, res, next) {
        // POST logic to delete a category here
        // If a category gets deleted successfully, we just redirect to category list
        // no need to render a page
        console.log(req.params.category_id)
        models.Category.destroy({
            // find the category_id to delete from database
            where: {
              id: req.params.category_id  //.split(":")[1]
            }
          }).then(function() {
           // If a category gets deleted successfully, we just redirect to categories list
           // no need to render a page
            res.redirect('/blog/categories');
            console.log("Category deleted successfully");
          });
};


// Display category update form on GET.
exports.category_update_get = function(req, res, next) {
        // Find the category you want to update
        console.log("ID is " + req.params.category_id);
        models.Category.findById(
                req.params.category_id
        ).then(function(category) {
               // renders a category form
               res.render('forms/category_form', { title: 'Update Category', category: category, layout: 'layouts/detail'});
               console.log("Category update get successful");
          });
        
};

// Handle category update on POST.
exports.category_update_post = function(req, res, next) {
        console.log("ID is " + req.params.category_id);
        models.Category.update(
        // Values to update
            {
                name: req.body.name,
            },
          { // Clause
                where: 
                {
                    id: req.params.category_id
                }
            }
        //   returning: true, where: {id: req.params.} 
         ).then(function() { 
                // If an post gets updated successfully, we just redirect to posts list
                // no need to render a page
                res.redirect("/blog/categories");  
                console.log("Category updated successfully");
          });
};

// Display detail page for a specific category.
exports.category_detail = function(req, res, next) {
        // find a category by the primary key Pk
        models.Category.findById(
                req.params.category_id,
                {
                        include: [
                                {
                                        model: models.Post,
                                        as: 'posts',
                                        required: false,
                                        // Pass in the Category attributes that you want to retrieve
                                        attributes: ['id', 'post_title', 'post_body'],
                                        through: {
                                                // This block of code allows you to retrieve the properties of the join table PostCategories
                                                model: models.PostCategories,
                                                as: 'PostCategories',
                                                attributes: ['post_id', 'category_id'],
                                        }
                                }
                        ]
                }
        ).then(function(category) {
        // renders an inividual category details page
        console.log("Database return category " + category.name);
        res.render('pages/category_detail', { title: 'Category Details', category: category, layout: 'layouts/detail'} );
        console.log("category deteials renders successfully");
        });
};

// Display list of all category.
exports.category_list = function(req, res, next) {
        // controller logic to display all category
        models.Category.findAll(
        ).then(function(categories) {
        // renders a category list page
        console.log("rendering category list");
        res.render('pages/category_list', { title: 'Category List', categories: categories, layout: 'layouts/list'} );
        console.log("Category list renders successfully");
        });
        
};

