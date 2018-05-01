$(document).ready(function () {

  // Function To Render User Posts
  function renderUserPosts() {

    // Empty User Feed
    $("#userFeed").empty();

    // Retrieve and Display User Posts
    $.ajax("/api/posts/user", {
      type: "GET",
      success: function (results) {

        for (let i = 0; i < results.Posts.length; i++) {

          // var panelDiv = $("<div>");
          // var panelBodyDiv = $("<div>");
          // var panelHeadingDiv = $("<div>");
          // var bodyDiv = $("<div>");
          // var line = $("<hr>");
          // var timeStampDiv = $("<div>");
          // var categoryDiv = $("<div>");
          // var lineBreak = $("<br>");
          // var likeDiv = $("<div>");
          // var hateButton = $("<button>");
          // var countSpan = $("<span>");
          // panelDiv.addClass("panel post-panel");
          // panelBodyDiv.addClass("panel-body");
          // panelHeadingDiv.addClass("panel-heading postStyle");
          // bodyDiv.addClass("post-body");
          // timeStampDiv.addClass("post-datetime");
          // categoryDiv.addClass("post-category");
          // likeDiv.addClass("like-button");
          // hateButton.addClass("hate-btn");
          // countSpan.addClass("count");
          // panelDiv.append(panelBodyDiv);
          // panelBodyDiv.append(panelHeadingDiv);
          // panelHeadingDiv.text(results.name + ":");
          // panelBodyDiv.append(bodyDiv);
          // bodyDiv.append(results.Posts[i].body).append(line);
          // panelBodyDiv.append(timeStampDiv);
          // // timeStampDiv.text(results.Posts[i].updatedAt);
          // panelBodyDiv.append(categoryDiv);
          // categoryDiv.text("Category: " + results.Posts[i].category);
          // panelBodyDiv.append(lineBreak);
          // panelBodyDiv.append(likeDiv);
          // hateButton.text("I Hate That Too!");
          // likeDiv.append(hateButton);
          // likeDiv.append(countSpan);

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
          h4.addClass("user-postStyle");
          row3Div.addClass("row");
          timeStampDiv.addClass("user-post-datetime");
          col3Div.addClass("col-md-5");
          categoryDiv.addClass("post-category");
          bodyDiv.addClass("feed-post");
          likeDiv.addClass("like-button");
          countSpan.addClass("count");
          hateButton.addClass("hate-btn");

          // Set Up HTML Elements
          image.attr("src", results.imageUrl); // User Image
          col1Div.append(image);
          h4.append(results.name); // User Name
          row2Div.append(h4);
          timeStampDiv.append(results.Posts[i].updatedAt); // Timestamp
          row3Div.append(timeStampDiv);
          col2Div.append(row2Div).append(row3Div);
          categoryDiv.text("Category: " + results.Posts[i].category); // Post Category
          col3Div.append(categoryDiv);
          row1Div.append(col1Div).append(col2Div).append(col3Div);
          bodyDiv.append(results.Posts[i].body); // Post Body
          // hateButton.text("I Hate That Too!");
          // likeDiv.append(hateButton);
          // likeDiv.append(countSpan);
          panelBodyDiv.append(row1Div).append(hr);
          panelBodyDiv.append(bodyDiv).append(br);//.append(likeDiv);
          panelDiv.append(panelBodyDiv);

          // Display HTML Elements
          $("#userFeed").append(panelDiv);

        };

      }
    });

  };

  renderUserPosts();

});