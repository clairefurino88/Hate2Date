// Requiring 'Path' for relative routes to HTML files
var path = require("path");
var db = require("../models");
var passport = require("passport");
var Sequelize = require("sequelize");

// Requiring isAuthenticated middleware for user authentication validation
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  /////////////////////////// SIGNUP PAGE ///////////////////////////////////////////

  // Root Route
  app.get("/", function (req, res) {
    // If user exists, send user to members page
    if (req.user) {
      return res.redirect("/members");
    }
    res.render("signup");
  });

  /////////////////////////// LOGIN PAGE ///////////////////////////////////////////

  app.get("/login", function (req, res) {
    // If user exists, send user to members page
    if (req.user) {
      return res.redirect("/members");
    }
    res.render("login");
  });

  // Login Route for Sign-Up Form
  app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
    // User redirected to '/members' via front-end redirect (<a></a>) upon successful authentication
    res.json('/members');
  });

  // Login Validation Middleware (isAuthenticated) Checks for Authentication
  // Authenticated users sent to /members, otherwise redirected to signup page
  app.get("/members", isAuthenticated, function (req, res) {

    // Logging Logged-On User Info
    console.log("\n >> req.user >> ", req.user);

    db.Post.findAll({
      include: [db.User],
      order: [['updatedAt', 'DESC']]
    })
      .then(function (dbUsers) {
        var hbsObject = { posts: dbUsers };
        res.render("profile", hbsObject);
      });

  });

  // Route for Posts View By Category
  app.get("/posts/category", isAuthenticated, function (req, res) {

    console.log("\nreq: ", req);
    db.Post.findAll({
      include: [db.User],
      where: { category: req.query.category },
      order: [['updatedAt', 'DESC']]
    })
      .then(function (dbUsers) {
        var hbsObject = { posts: dbUsers };
        console.log("\n\n >> app.get('/posts/category'...)...hbsObject.posts", hbsObject.posts);
        return res.render("profile", hbsObject);
      });

  });

  /////////////////////////// USER PAGE ///////////////////////////////////////////

  // User profile page (not members!) for logged on user
  app.get("/user", function (req, res) {
    // If user exists, send user to members page
    if (!req.user) {
      return res.redirect("/login");
    }
    // console.log("req.user", req.user);
    db.User.findOne({
      include: [{ model: db.Post, order: [['updatedAt', 'DESC']] }],
      where: { id: req.user.id }
    })
      .then(function (dbUser) {
        var hbsObject = { user: dbUser };
        return res.render("user", hbsObject);
      });

  });

  /////////////////////////// LOGOUT ROUTE ///////////////////////////////////////////

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/about", function (req, res) {
    res.render("about", req.user);
  });

};