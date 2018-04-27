$(document).ready(function () {

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.ajax("/api/user", {
    type: 'GET'
  })
    .then(function (data) {

      console.log("\n >> /members...user info: \n\n", data);

      if (data === "/login") {
        var origin = window.location.origin;
        var url = origin + data;
        window.location.assign(url);
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

});

