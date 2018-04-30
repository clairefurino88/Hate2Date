$(document).ready(function () {

  // References To Our Form Input IDs
  var signUpForm = $("form.signup");
  var nameInput = $("input#name-input");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var occupationInput = $("input#occupation-input");
  var relationshipTypeInput = $("input#relationshipType-input");
  var locationInput = $("#location-input");
  var imageInput = $("#image-input");
  var bioInput = $("#bio-input");


  // Sign-Up Form Event Handler To Capture Data, Validate and Send to Database
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
        location: locationInput.val(), // trim() not required on 'select' list
        imageUrl: imageInput.val().trim(),
        bio: bioInput.val().trim()
      };

      console.log("\nlocation: ", userData.location);

      // Sign Up User
      signUpUser(userData);

    }
    else {

      alert("Please complete all fields before submitting!");

    }

  });

  // Sign Up User; If Successful, Redirect To Login Page
  function signUpUser(newUser) {

    $.ajax("/api/signup", {
      method: 'POST',
      data: newUser,
    })
      .then(function (pathname) {

        console.log("-----------url: \n", pathname);
        var origin = window.location.origin;
        var url = origin + pathname;
        window.location.assign(url);
        console.log(url);

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
      if ($(this).val() === "" || $(this).val() === null) {
        isValid = false;
      }
    });
    return isValid;

  };

});