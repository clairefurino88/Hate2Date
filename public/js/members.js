$(document).ready(function () {

  // Retrieve Logged On User Info
  var userInfo = fetchUser();

  // Category Buttons Event Handler...Loads Posts By Category
  $(document).on("click", ".h2dCategories", function (event) {

    event.preventDefault();
    $("#h2dFeed").empty();

    var categoryInput = $(this).val();

    if (categoryInput != 'All') {
      $.ajax("/api/posts/category", {
        type: "GET",
        data: { category: categoryInput },
        success: function (result) {
          renderPostsByCategory(result);
        }
      });
    }
    else location.reload();

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

      // Reference to HTML Elements
      var panelDiv = $("<div>");
      var panelBodyDiv = $("<div>");
      var row1Div = $("<div>"); // NEW
      var col1Div = $("<div>"); // NEW
      var image = $("<img>"); // NEW
      var col2Div = $("<div>"); // NEW
      var row2Div = $("<div>"); // NEW
      var h4 = $("<h4>"); // NEW
      var row3Div = $("<div>"); // NEW
      var timeStampDiv = $("<div>");
      var col3Div = $("<div>");
      var categoryDiv = $("<div>");
      var hr = $("<hr>");
      var bodyDiv = $("<div>");
      var br = $("<br>");
      var likeDiv = $("<div>");
      var hateButton = $("<button>");
      var countSpan = $("<span>");

      // Add Classes to HTML Elements
      panelDiv.addClass("panel post-panel");
      panelBodyDiv.addClass("panel-body");
      row1Div.addClass("row");
      col1Div.addClass("col-md-2");
      image.addClass("user-img-members");
      col2Div.addClass("col-md-5");
      row2Div.addClass("row");
      h4.addClass("postStyle");
      row3Div.addClass("row");
      timeStampDiv.addClass("post-datetime");
      col3Div.addClass("col-md-5");
      categoryDiv.addClass("post-category");
      bodyDiv.addClass("feed-post");
      likeDiv.addClass("like-button");
      countSpan.addClass("count");
      hateButton.addClass("hate-btn");

      // Set Up HTML Elements
      image.attr("src", posts[i].User.imageUrl); // User Image
      col1Div.append(image);
      h4.append(posts[i].User.name); // User Name
      row2Div.append(h4);
      timeStampDiv.append(posts[i].updatedAt);
      row3Div.append(timeStampDiv);
      col2Div.append(row2Div).append(row3Div);
      categoryDiv.text("Category: " + posts[i].category); // Post Category
      col3Div.append(categoryDiv);
      row1Div.append(col1Div).append(col2Div).append(col3Div);
      bodyDiv.append(posts[i].body);
      hateButton.text("I Hate That Too!");
      likeDiv.append(hateButton);
      likeDiv.append(countSpan);
      panelBodyDiv.append(row1Div).append(hr);
      panelBodyDiv.append(bodyDiv).append(br).append(likeDiv);
      panelDiv.append(panelBodyDiv);

      // Display HTML Elements
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
      'All',
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