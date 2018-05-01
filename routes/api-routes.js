// Requiring Models (Sequelize) and Passport (Login Authentication)
var db = require("../models");
var passport = require("../config/passport.js");
// Requiring Sequelize for query ordering in 'Post' model 'get' route
var Sequelize = require("sequelize");
// App Routes
module.exports = function (app) {

    //---------------------------------------------//
    //-------------API Routes for User-------------//
    //---------------------------------------------//

    // Passport Login Authentication Route
    // If valid login, go to members page, otherwise, display error.
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        // Since we're doing a POST with JS, we can't actually redirect POST to GET
        // so we're sending user back to members page with front-end redirect
        // User will not hit this page if not authenticated
        res.json("/members");
    });

    // User Sign-Up Route (password encrypted\hashed with 'BCrypt')
    // Upon successful sign-up, redirect to login, otherwise, display error.
    // app.post("/api/signup", function (req, res) {
    app.post("/api/signup", function (req, res) {
        db.User.create(req.body)
            .then(function (user) {
                res.status(200).json('/login');
            })
            .catch(function (error) {
                console.log(error);
                res.json(error);
            });
    });

    // API 'GET' Route To Retrieve Logged-On User Info
    app.get("/api/user", function (req, res) {
        // If User Not Logged In, Redirect To Login Page, Otherwise, Send User Info
        if (!req.user) res.redirect('/login')
        else {
            db.User.findOne({
                include: [db.Post],
                where: { id: req.user.id }
            })
                .then(function (dbUser) {
                    res.json({
                        id: dbUser.id,
                        name: dbUser.name,
                        email: dbUser.email,
                        occupation: dbUser.occupation,
                        relationshipType: dbUser.relationshipType,
                        location: dbUser.location,
                        imageUrl: dbUser.imageUrl,
                        bio: dbUser.bio
                    });
                });
        };
    });

    // API 'GET' *Logged-On User* Route 
    // app.get("/api/users/:id", function (req, res) {
    //     if (!req.user) {
    //         res.json({});
    //     }
    //     // Else, send back logged on user info
    //     else {
    //         db.User.findOne({
    //             include: [db.Post],
    //             where: { id: req.params.id }
    //         }).then(function (dbUser) {
    //             res.json(dbUser);
    //         });
    //     };
    // });

    //---------------------------------------------//
    //----------API Routes for User Posts----------//
    //---------------------------------------------//

    // API 'GET' Route To *Fetch All Posts*
    app.get("/api/posts", function (req, res) {
        db.Post.findAll({ order: [['updatedAt', 'DESC']] })
            .then(function (data) {
                var hbsObject = { posts: data };
                res.render("profile", hbsObject);
            });
    });

    // API 'GET' Route To *Fetch All Posts for Particular Category*
    app.get("/api/posts/category", function (req, res) {
        db.Post.findAll({
            where: { category: req.body.category },
            order: [['updatedAt', 'DESC']]
        })
            .then(function (data) {
                var hbsObject = { posts: data };
                res.render("profile", hbsObject);
            });
    });

    // API 'GET' Route To *Fetch All Posts for Particular User*
    app.get("/api/posts/user", function (req, res) {
        db.Post.findAll({
            where: { UserId: req.body.userId },
            order: [['updatedAt', 'DESC']]
        })
            .then(function (data) {
                var hbsObject = { posts: data };
                res.render("profile", hbsObject);
            });
    });

    // API 'POST' Route To Create *New Post*
    app.post("/api/posts", function (req, res) {
        db.Post.create({
            body: req.body.body,
            category: req.body.category,
            UserId: req.user.id
        })
            .then(function (results) {
                res.end();
            });
    });

    // // API 'PUT' Route for *Post Update*
    // app.put("/api/posts/:id", function (req, res) {
    //     db.Post.update(req.body,
    //         { where: { id: req.params.id } }
    //     ).then(function (result) {
    //         if (result.changedRows === 0) return res.status(404).end();
    //         res.status(200).end();
    //     });
    // });

    // API 'PUT' Route for *Post Like Increment*
    app.put("/api/posts/likes", function (req, res) {
        console.log("MADE IT HERE!", req.body.id);
        db.Post.update(req.body,
            { where: { id: req.body.id } }
        ).then(function (result) {
            console.log("PUT-> result: ", result);
            if (result.changedRows === 0) return res.status(404).end();
            res.status(200).end();
        });
    });

    // // API 'DELETE' Route To *Remove Post* Route
    // app.delete("/api/posts/:id", function (req, res) {
    //     db.Post.destroy(
    //         { where: { id: req.params.id } }
    //     ).then(function (result) {
    //         if (result.changedRows === 0) return res.status(404).end();
    //         res.status(200).end();
    //     });
    // });

};