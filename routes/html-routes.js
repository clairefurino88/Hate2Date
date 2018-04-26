// Requiring 'Path' for relative routes to HTML files
var path = require("path");

// Requiring custom middleware for user authentication validation
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If user exists, send user to members page
    if (req.user) {
      res.redirect("/members");
    }
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    // If user exists, send user to members page
    if (req.user) {
      res.redirect("/members");
    }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("login");
  });

  // isAuthenticated middleware for login validation.
  // Users not authenticated will be redirected to signup page
  app.get("/members", isAuthenticated, function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/members.html"));
    res.render("profile", req.user);
  });

  app.get("/about", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/members.html"));
    res.render("about", req.user);
  });


};