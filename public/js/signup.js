$(document).ready(function () {

  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var nameInput = $("input#name-input");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var occupationInput = $("input#occupation-input");
  var relationshipTypeInput = $("input#relationshipType-input");
  var locationInput = $("#location-input");
  var imageInput = $("#image-input");
  var bioInput = $("#bio-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {

    event.preventDefault();

    // Validate User Input Before Submitting
    if (validateForm()) {

      var userData = {
        name: nameInput.val().trim(),
        email: emailInput.val().trim(),
        password: passwordInput.val().trim(),
        occupation: occupationInput.val().trim(),
        relationshipType: relationshipTypeInput.val().trim(),
        location: locationInput.val(), // trim() not required on list
        image: imageInput.val().trim(),
        bio: bioInput.val().trim()
      };

      // Sign up user
      signUpUser(userData);

      // Empty Sign-Up Form Values
      // nameInput.val("");
      // emailInput.val("");
      // passwordInput.val("");
      // occupationInput.val("");
      // relationshipTypeInput.val("");
      // locationInput.val("");
      // imageInput.val("");
      // bioInput.val("");
      // $("#errorMessage").text("")

    }
    else {

      alert("All fields are required! Please complete before submitting!");

    }

  });

  // Performs 'post' to signup route.
  // If successful, redirected to members page, otherwise, display error
  function signUpUser(newUser) {

    $.ajax("/api/signup", {
      type: 'POST',
      data: newUser
    }).then(function (data) {
      window.location.replace(data);
      // If error, throw boostrap alert
    }).catch(handleLoginErr);

  };

  function handleLoginErr(err) {

    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);

  }

  // Function To Validate Sign-Up Form Input
  function validateForm() {

    var isValid = true;
    $(".form-control").each(function () {
      if ($(this).val() === "") {
        isValid = false;
      }
    });
    return isValid;

  };

});