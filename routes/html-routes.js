// Requiring 'Path' for relative routes to HTML files
var path = require("path");
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
    res.render("profile", req.user);
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