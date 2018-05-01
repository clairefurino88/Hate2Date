$(document).ready(function () {
  // Function To Render Posts By Selected Category
  function renderUserPosts() {
    $("#userFeed").empty();
    $.ajax("/api/posts/user", {
      type: "GET",
      success: function (results) {
        console.log("\nrenderUserPosts() result: \n\n", results);
        for (let i = 0; i < results.Posts.length; i++) {
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
          panelHeadingDiv.text(results.name + ":");
          panelBodyDiv.append(bodyDiv);
          bodyDiv.append(results.Posts[i].body).append(line);
          panelBodyDiv.append(timeStampDiv);
          // timeStampDiv.text(results.Posts[i].updatedAt);
          panelBodyDiv.append(categoryDiv);
          categoryDiv.text("Category: " + results.Posts[i].category);
          panelBodyDiv.append(lineBreak);
          panelBodyDiv.append(likeDiv);
          hateButton.text("I Hate That Too!");
          likeDiv.append(hateButton);
          likeDiv.append(countSpan);
          $("#userFeed").append(panelDiv);
        };
      }
    });
  };
  renderUserPosts();
  // var userInfo = fetchUser();
  // // Function To Retrieve Logged In User Info
  // function fetchUser() {
  //   $.ajax("/api/user", {
  //     method: 'GET'
  //   })
  //     .then(function (data) {
  //       console.log('\n\n\n', data, '\nfetcheddata');
  //       if (data === "/login") {
  //         var url = window.location.origin + data;
  //         window.location.assign(url);
  //         return;
  //       }
  //       // return data;
  //       res.render('user', {
  //         image: data.imageUrl,
  //         name: data.name,
  //         email: data.email,
  //         occupation: data.occupation,
  //         relationship: data.relationshipType,
  //         location: data.location
  //       })
  //     });
  // };
  // $.ajax("/api/user", {
  //   method: 'GET'
  // })
  //   .then(function (data) {
  //     console.log("apiuser return", data.email);
  //     if (data === "/login") {
  //       var url = window.location.origin + data;
  //       window.location.assign(url);
  //       return;
  //     }
  //     return data;
  //   });
});