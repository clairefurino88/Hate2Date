$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var nameInput = $("input#name-input");
  var emailInput = $("input#email-input");
  var occupationInput = $("input#occupation-input");
  var locationInput = $("#location-input");
  var passwordInput = $("input#password-input");
  var imageInput = $("#image-input");
  var bioInput = $("#bio-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      occupation: occupationInput.val().trim(),
      location: locationInput.val().trim(),
      password: passwordInput.val().trim(),
      image: imageInput.val().trim(),
      bio: bioInput.val().trim()
    };

    if (!userData.name || !userData.email || !userData.occupation || !userData.location || !userData.password || !userData.image || !userData.bio) {
      return;
    }


    // If we have an email and password, run the signUpUser function
    signUpUser(userData.name, userData.email, userData.occupation, userData.location, userData.password, userData.image, userData.bio);
    nameInput.val("");
    emailInput.val("");
    passwordInput.val("");
    occupationInput.val("");
    locationInput.val("");
    imageInput.val("");
    bioInput.val("");
     $("#errorMessage").text("")
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, email, occupation, location, password, image, bio) {
    $.post("/api/signup", {
      name: name,
      email: email,
      occupation: occupation,
      location: location,
      password: password,
      image: image,
      bio: bio
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});