$(document).ready(function () {


  // Post Form Event Handler...Sends Post to Database
  $("#postFormSubmit").on("click", function (event) {

    // Preventing page reload
    event.preventDefault();

    // Storing post form values in object
    var post = {
      body: $("#postBody").val(),
      category: $("#postCategory").val(),
    };

    console.log("\n[Post Form Submit] - post: ", post);

    // Adding post to database via ajax 'post'
    $.post('/api/posts', post);

    // Reloading page
    location.reload();

  });


  // Function to retrieve logged in user db info
  function fetchUser() {

    $.ajax("/api/user", {
      type: 'GET'
    })
      .then(function (data) {

        console.log("\n >> /members...user info: \n\n", data);

        if (data === "/login") {
          var origin = window.location.origin;
          var url = origin + data;
          window.location.assign(url);
          return;
        }

        // else {
        // username = data.name;
        // setUsername();
        // $(".member-name").text(data.name);
        // $(".member-image").attr("src", data.image);
        // $(".member-occupation").text(data.occupation);
        // $(".member-location").text(data.location);
        // $(".member-bio").text(data.bio);

        // if (data.image === null)
        //   $(".member-image").attr("src", "../images/default-profileIMG.jpg");
        // else
        //   $(".member-image").attr("src", data.image);
        // }

      });

  };

  fetchUser();

});

