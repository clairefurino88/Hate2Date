$(document).ready(function() {

var username;
var nsp;
var room;
var linkList = [];
var numLinks = 0;

// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page
$.get("/api/user_data").then(function(data) {
	username = data.name;
	setUsername();
  $(".member-name").text(data.name);
  $(".member-image").attr("src", data.image);
  $(".member-occupation").text(data.occupation);
  $(".member-location").text(data.location);
  $(".member-bio").text(data.bio);

  if(data.image === null){
          $(".member-image").attr("src", "../images/default-profileIMG.jpg");
        }else{
          $(".member-image").attr("src", data.image);
        }

//User Search button
$("#search-btn").on('click', function(event){
    event.preventDefault();
    var input = $('user-search').val();
    // var filter = inpiut.toLowerCase();

    $.get('/api/signup', function(req, res){
      db.Users.findAll({
        where: {
          name: input
        }
      });
      console.log(res);
    $('.modal-search').append($('<li>' + res + '</li>'));
    })
  
  })


//Feed on click

$('#post-submit').on('click', function(event) {
  event.preventDefault();
  var postBody = $('#post-field').val().trim();
  if(postBody.indexOf('http://') > -1 || postBody.indexOf('https://') > -1){
      postBody = postBody.link(postBody)
      var newPost = {
        author: username,
        body: postBody,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss')
      }
  } else {
      var newPost = {
        author: username,
        body: postBody,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss') 
    }
  }
  $.post('api/newFeed', newPost).done(function() {
      var row = $('<div>');
      row.addClass('post');
      row.append("<p>" + moment(newPost.created_at).format("dddd MMM Do YYYY - h:mma:") + "</p>");
      row.append("<strong><p>" + newPost.author + ": </strong>" + newPost.body + "</p>");
      $("#post-area").prepend(row);
      });
      $("#post-field").val("");
      });
  $.get("/api/allFeed", function(data) {
    if (data.length !== 0) {
      for (var i = 0; i < data.length; i++) {
          var row = $("<div>");
          row.addClass("post");
          row.append("<p>" + moment(data[i].created_at).format("dddd MMM Do YYYY - h:mma:") + "</p>");
          row.append("<strong><p>" + data[i].author + ": </strong>" + data[i].body + "</p>");;
          $("#post-area").prepend(row);
        }
      }
    });
  })
})
