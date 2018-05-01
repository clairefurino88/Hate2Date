$(document).ready(function() {

  // Login Check; Alter 'About' Page Buttons
  loginCheck();

  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  };

  // Function Checks Login State; Alters 'About' Page Buttons
  function loginCheck() {

    $.ajax("/api/user", {
      method: 'GET'
    })
      .then(function (result) {
        if (result != "/login") {
          $("#loginButton").text("Back to Members");
          $("#loginAnchor").attr("href", "/");
          $("#rootButton").text("Profile");
          $("#rootAnchor").attr("href", "/user");
        };
        if (result === "/login") {
          $("#logout").css("display", "none");
        }
        return;
      });

  };

});
