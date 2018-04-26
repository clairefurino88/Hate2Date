// Requiring Models (Sequelize) and Passport (Login Authentication)
var db = require("../models");
var passport = require("../config/passport.js");

// Requiring Sequelize for query ordering in 'Post' model 'get' route
var Sequelize = require("sequelize");

// App Routes
module.exports = function (app) {

    // Passport Login Authentication Route
    // If valid login, go to members page, otherwise, display error.
    app.post("/login", passport.authenticate("local"), function (req, res) {

        // Since we're doing a POST with JS, we can't actually redirect POST to GET
        // so we're sending user back to members page because redirect will happen on front-end
        // User will not hit this page if not authenticated
        res.json("/members");

    });

    // User Sign-Up Route
    // User password automatically hashed and stored securely with 'BCrypt."
    // Upon successful user creation, proceed to login, otherwise, display error.
    app.post("/signup", function (req, res) {

        // Inspecting req.body
        console.log("\n >> app.post('/signup'...) >> req.body: \n\n", req.body);

        db.User.create(req.body).then(function () {
            res.redirect(307, "/login");
        }).catch(function (error) {
            console.log("\n >> app.post('/signup'...) >> error:\n\n", error);
            res.json(error);
        });

    });

    // Sign-Out Route
    app.get("/logout", function (req, res) {

        req.logout();
        res.redirect("/");

    });

    // API 'GET' *Logged-On User* Route 
    app.get("/api/users/:id", function (req, res) {

        // Inspecting req.user
        console.log("\n >> app.get('api/users/:id'...) >> req.user:\n\n", req.user);

        // If user not logged in, send empty object
        if (!req.user) {
            res.json({});
        }
        // Else, send back logged on user info
        else {
            db.User.findOne({
                include: [db.Post],
                where: { id: req.params.id }
            }).then(function (dbUser) {
                // Inspecting dbUser
                console.log("\n >> app.get('api/users/:id'...) >> dbUser:\n\n", dbUser);
                res.json(dbUser);
            });
        };

    });

    // API 'GET' Route To *Fetch All Posts*
    app.get("/api/posts", function (req, res) {

        db.Post.findAll(
            // Ordering by 'createdAt' in descending order
            { order: ['createdAt', 'DESC'] }
        ).then(function (data) {
            // Rendering profile.handlebars
            var hbsObject = { posts: data };
            res.render("profile", hbsObject);
            // Also sending back JSON data (if possible)
            res.json(data);
        });

    });

    // API 'POST' Route To Create *New Post*
    app.post("/api/posts", function (req, res) {

        // Inspecting req.body
        console.log("\n >> app.get('/api/posts'...) >> req.body:\n\n", req.body);
        db.Post.create(req.body).then(function (results) {
            res.end();
        });

    });

    // API 'PUT' Route for *Post Update*
    app.put("/api/posts/:id", function (req, res) {

        db.Post.update(req.body,
            { where: { id: request.params.id } }            
        ).then(function (result) {
            if (result.changedRows === 0) return res.status(404).end();
            // Confirming Successful Post Update
            console.log("\n >> app.put('/api/posts/:id...) >> Post updated successfully!\n");
            res.status(200).end();
        });

    });

    // API 'DELETE' Route To *Remove Post* Route
    app.delete("/api/posts/:id", function (req, res) {

        db.Post.destroy(
            { where: { id: req.params.id } }
        ).then(function (result) {
            if (result.changedRows === 0) return res.status(404).end();
            // Confirming Successful Post Removal
            console.log("\n >> app.delete('/api/posts/:id...) >> Post removed successfully!\n");
            res.status(200).end();
        });

    });

};