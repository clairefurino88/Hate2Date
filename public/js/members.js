$(document).ready(function () {

  // Retrieve Logged On User Info
  var userInfo = fetchUser();

  // Category Buttons Event Handler...Loads Posts By Category
  $(document).on("click", ".h2dCategories", function (event) {

    event.preventDefault();
    $("#h2dFeed").empty();

    $.ajax("/api/posts/category", {
      type: "GET",
      data: { category: $(this).val() },
      success: function (result) {
        renderPostsByCategory(result);
      }
    });

  });


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

  // Function To Render Posts By Selected Category
  function renderPostsByCategory(posts) {

    for (let i = 0; i < posts.length; i++) {

      var panelDiv = $("<div>");
      var panelBodyDiv = $("<div>");
      var panelHeadingDiv = $("<div>");
      var bodyDiv = $("<div>");
      var line = $("<hr>");
      var timeStampDiv = $("<div>");
      var categoryDiv = $("<div>");
      var lineBreak = $("<br>");
      var likeDiv = $("<div>");
      var hateButton = $("<button>");
      var countSpan = $("<span>");

      panelDiv.addClass("panel post-panel");
      panelBodyDiv.addClass("panel-body");
      panelHeadingDiv.addClass("panel-heading postStyle");
      bodyDiv.addClass("post-body");
      timeStampDiv.addClass("post-datetime");
      categoryDiv.addClass("post-category");
      likeDiv.addClass("like-button");
      hateButton.addClass("hate-btn");
      countSpan.addClass("count");

      panelDiv.append(panelBodyDiv);
      panelBodyDiv.append(panelHeadingDiv);
      panelHeadingDiv.text(posts[i].User.name + ":");
      $('<img>').attr("src", posts[i].User.imageUrl).appendTo(panelHeadingDiv);
      panelBodyDiv.append(bodyDiv);
      bodyDiv.append(posts[i].body).append(line);
      panelBodyDiv.append(timeStampDiv);
      timeStampDiv.text(posts[i].updatedAt);
      panelBodyDiv.append(categoryDiv);
      categoryDiv.text("Category: " + posts[i].category);
      panelBodyDiv.append(lineBreak);
      panelBodyDiv.append(likeDiv);
      hateButton.text("I Hate That Too!");
      likeDiv.append(hateButton);
      likeDiv.append(countSpan);
      $("#h2dFeed").append(panelDiv);

    };

  };

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

// Render Category Buttons
function renderCategories() {

  var catButtons = [
    'Coding',
    'Education',
    'Entertainment',
    'Fashion',
    'Food',
    'Health',
    'Love',
    'Money',
    'People',
    'Politics',
    'People',
    'Teens',
    'Transportation',
    'Weather'];

  // Reference Category Div
  var categoryDiv = $(".categoryButtons");

  // Render Category Buttons
  for (let i = 0; i < catButtons.length; i++) {
    var button = $("<button>");
    button.addClass("h2dCategories");
    button.val(catButtons[i]).text(catButtons[i]);
    categoryDiv.append(button);
  };

};


renderCategories();

});