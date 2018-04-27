// Requiring 'Path' for relative routes to HTML files
var path = require("path");
var db = require("../models");
var passport = require("passport");

// Requiring custom middleware for user authentication validation
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  // Root Route
  app.get("/", function (req, res) {
    // If user exists, send user to members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup");
  });

  // Login Route for Login Page
  app.get("/login", function (req, res) {
    res.render("login");
  });

  
  // Login Route for Sign-Up Form
  app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
    // User redirected to '/members' via front-end anchor upon successful authentication
    res.json('/members');
  });
  
  // Login Validation Middleware (isAuthenticated)
  // Users not authenticated will be redirected to signup page
  app.get("/members", isAuthenticated, function (req, res) {
    // user id
    console.log("\n >> req.user >> ", req.user);
    // Retrieve User Info From DB
    db.User.findOne({ where: { id: req.user.id } })
      .then(function (user) {
        console.log("\n >> app.get('/members/user/:user'...) >> user", user);
        res.render("profile", user);
      })
      .catch(function(error) {
        console.log("\n >> app.get('/members/user/:user'...) >> error", error);
        res.json(error);
      })
  });

  app.get("/members/user/:user", isAuthenticated, function (req, res) {
    // user id
    var userId = req.params.user;
    // Retrieve User Info From DB
    db.User.findOne({ where: { id: userId } })
      .then(function (user) {
        console.log("\n >> app.get('/members/user/:user'...) >> user", user);
        res.render("profile", user);
      })
      .catch(function(error) {
        console.log("\n >> app.get('/members/user/:user'...) >> error", error);
        res.json(error);
      })
  });

  // Sign-Out Route for Log-Out Button
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/about", function (req, res) {
    res.render("about", req.user);
  });

};