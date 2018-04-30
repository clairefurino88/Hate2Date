$(document).ready(function () {

  // Retrieve Logged On User Info
  var userInfo = fetchUser();  

  // Post Form Event Handler...Sends Post to Database
  $("#postFormSubmit").on("click", function (event) {

    // Preventing page reload
    event.preventDefault();

    // Storing User Post In Object
    var post = {
      body: $("#postBody").val(),
      category: $("#postCategory").val(),
    };

    // Post Form Validation
    if (post.body != "" && post.category != null) {
      // Ajax 'POST' Adds User Post to Database Then Reloads Page
      $.ajax('/api/posts', {
        method: 'POST',
        data: post,
        success: function (result) {
          location.reload();
        }
      });
    }
    else {
      alert("Please make sure to enter a message and select a category before submitting a new post.");
    }

  });


  // Function To Retrieve Logged In User Info
  function fetchUser() {

    $.ajax("/api/user", {
      method: 'GET'
    })
      .then(function (data) {

        if (data === "/login") {
          var url = window.location.origin + data;
          window.location.assign(url);
          return;
        }

        return data;

      });

  };

  $(".like-button").one("click", function(e){
    var $counter = $(this).find(".count");
    var count = $counter.text() | 0; //corose current count to an int
    $counter.text(count + 1);//set new count
})

});

