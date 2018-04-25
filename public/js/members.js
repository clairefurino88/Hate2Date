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
  $(".member-interest1").text(data.interest1);
  $(".member-interest2").text(data.interest2);
  $(".member-interest3").text(data.interest3);
  $(".member-interest4").text(data.interest4);

  if(data.image === null){
          $(".member-image").attr("src", "../images/default-profileIMG.jpg");
        }else{
          $(".member-image").attr("src", data.image);
        }

  //interest 1
  if(data.interest1 == "Music"){
    $("#interest1").css({"background": "url(/images/musicturntable.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
   } 
  else if(data.interest1 == "Entertainment"){
    $("#interest1").css({"background": "url(/images/emmys.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest1 == "Gaming"){
    $("#interest1").css({"background": "url(/images/gaming.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest1 == "Science and Nature"){
    $("#interest1").css({"background": "url(/images/patternal.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest1 == "Business"){
    $("#interest1").css({"background": "url(/images/stockmarket.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest1 == "Politics"){
    $("#interest1").css({"background": "url(/images/flag.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest1 == "Sports"){
    $("#interest1").css({"background": "url(/images/football.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest1 == "Technology"){
    $("#interest1").css({"background": "url(/images/matrix.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  }

//interest 2

if(data.interest2 == "Music"){
    $("#interest2").css({"background": "url(/images/musicturntable.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest2 == "Entertainment"){
    $("#interest2").css({"background": "url(/images/emmys.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest2 == "Gaming"){
    $("#interest2").css({"background": "url(/images/gaming.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest2 == "Science and Nature"){
    $("#interest2").css({"background": "url(/images/patternal.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest2 == "Business"){
    $("#interest2").css({"background": "url(/images/stockmarket.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest2 == "Politics"){
    $("#interest2").css({"background": "url(/images/flag.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest2 == "Sports"){
    $("#interest2").css({"background": "url(/images/football.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest2 == "Technology"){
    $("#interest2").css({"background": "url(/images/matrix.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  }

//interest 3

if(data.interest3 == "Music"){
    $("#interest3").css({"background": "url(/images/musicturntable.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest3 == "Entertainment"){
    $("#interest3").css({"background": "url(/images/emmys.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest3 == "Gaming"){
    $("#interest3").css({"background": "url(/images/gaming.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest3 == "Science and Nature"){
    $("#interest3").css({"background": "url(/images/patternal.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest3 == "Business"){
    $("#interest3").css({"background": "url(/images/stockmarket.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest3 == "Politics"){
    $("#interest3").css({"background": "url(/images/flag.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest3 == "Sports"){
    $("#interest3").css({"background": "url(/images/football.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest3 == "Technology"){
    $("#interest3").css({"background": "url(/images/matrix.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  }

//interest 4

if(data.interest4 == "Music"){
    $("#interest4").css({"background": "url(/images/musicturntable.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest4 == "Entertainment"){
    $("#interest4").css({"background": "url(/images/emmys.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest4 == "Gaming"){
    $("#interest4").css({"background": "url(/images/gaming.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest4 == "Science and Nature"){
    $("#interest4").css({"background": "url(/images/patternal.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest4 == "Business"){
    $("#interest4").css({"background": "url(/images/stockmarket.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest4 == "Politics"){
    $("#interest4").css({"background": "url(/images/flag.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest4 == "Sports"){
    $("#interest4").css({"background": "url(/images/football.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest4 == "Technology"){
    $("#interest4").css({"background": "url(/images/matrix.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  }

});

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

//toggle effect when clicking 
$(".flip").click(function(){
  if (flipped == false){
  $("#toggle-panel").slideToggle("slow");
  $("#chatBox").slideToggle("slow");
  $("#linkBox").slideToggle("slow");
  room = $(this).text();
  socket.emit('room', room);

  $.get("/api/all"+room, function(data) {

    if (data.length !== 0) {
      for (var i = 0; i < data.length; i++) {

        if(data[i].body.indexOf('http') > -1){
          var startLink = data[i].body.indexOf('http');
          var endOfLink = data[i].body.indexOf(' ', startLink);
            if (endOfLink < startLink){
              var url = data[i].body.substring(startLink);
              var link = url.link(url);
            data[i].body = data[i].body.replace(url, link);
            }   else {
              var url = data[i].body.substring(startLink, endOfLink);
              var link = url.link(url);
              data[i].body = data[i].body.replace(url, link);
            }
          $('#messages').append($('<li>').html(moment(data[i].created_at).format("(h:mm a) ")+data[i].author+ ": "+data[i].body));
          $("#messages").animate({scrollTop: $("#messages").prop('scrollHeight')}, 50);
        }
        else
          
          $('#messages').append($('<li>').html(moment(data[i].created_at).format("(h:mm a) ")+data[i].author+ ": "+data[i].body));
          $("#messages").animate({scrollTop: $("#messages").prop('scrollHeight')}, 50);
        }
      }
    });

  $.get("/api/all"+room+"Link", function(data) {

    if (data.length !== 0) {
      for (var i = 0; i < data.length; i++) {
          $("#link-repo").prepend($('<li class="link'+i+'" style="list-style-type: none">').html(moment(data[i].created_at).format("(h:mm a) ")+data[i].author+": <a target='_blank' href="+data[i].body+">"+data[i].body+"</a>"));
          linkList.push(data[i]);
        }
      }
    });
  }
});

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
  // ============ Socket Chat ===============
    var socket = io.connect();
    var linkCount = 0;
    function setUsername() {
        socket.emit('set-username', username);
    }
    $('#chatForm').submit(function(event){
      event.preventDefault(event);
      if ($("#sendMessage").val() == ""){
        return false;
      }
      var newChat = {
      author: username,
      body: $('#sendMessage').val().trim(),
      created_at: moment().format('YYYY-MM-DD HH:mm:ss')
      };
      $.post('api/new'+room, newChat);
      socket.emit('chat message', $('#sendMessage').val());
      $('#sendMessage').val("");
      return false;
        });
   socket.on('chat message', function(msg){
    //variables for chat parsing
       var chat = msg.message;
       var link;
       var linkIndex;
       var linkObj = {};
    //conditionals for url parsing
       if(chat.indexOf('http://') > -1 || chat.indexOf('https://') > -1){
        linkCount++;
        linkIndex = chat.indexOf('http');
        link = chat.slice(linkIndex);
        var linkData = $('<li style="list-style-type: none">').html(linkCount + '. ' + msg.username + ': ');
        linkData = linkData.append($('<a>').html(link));
        linkData.addClass('link' + numLinks);
        numLinks++;
        linkObj = {
          author: username,
          body: link,
          created_at: moment().format('YYYY-MM-DD HH:mm:ss')
        };
    //store all links in linkList as objects
        linkList.push(linkObj);
        $.post('api/new'+room+'Link', linkObj);
        var startLink = chat.indexOf('http');
        var endOfLink = chat.indexOf(' ', startLink);
        if (endOfLink < startLink){
        var url = chat.substring(startLink);
        var link = url.link(url);
        chat = chat.replace(url, link);
        } else {
        var url = chat.substring(startLink, endOfLink);
        var link = url.link(url);
        chat = chat.replace(url, link);
        }

        $('#link-repo').prepend(linkData);
        $('#messages').append($('<li>').html(moment().format("(h:mm a) ")+msg.username+": "+chat));
        $("#messages").animate({scrollTop: $("#messages").prop('scrollHeight')}, 500);
       }
        else {
        $('#messages').append($('<li>').text(moment().format("(h:mm a) ")+msg.username+": "+msg.message));
        $("#messages").animate({scrollTop: $("#messages").prop('scrollHeight')}, 500);
       }
    });
  //Change profile pic script
  var readURL = function(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function(e) {
              $('.profile-img').attr('src', e.target.result);
              storePicture(e);
          }
          reader.readAsDataURL(input.files[0]);
      }
  }
  $(".file-upload").on('change', function() {
      readURL(this);
  });
  $(".upload-btn").on('click', function() {
    
      event.preventDefault();
    $(".file-upload").click();
  });
//live search for link repo
  $('#link-repo-searchbar').keyup(function(){
    var input = $('#link-repo-searchbar').val();
   
    if (linkList.length < 1) {
     
      return false;
    }
    var filter = input.toLowerCase();
    var links;
    var name;
    var messageLink;
      for (var i = 0; i < linkList.length; i++) {
        
        var name = linkList[i].author.toLowerCase();
        var messageLink = linkList[i].body.toLowerCase();
        var targetLink;
        if (name.indexOf(filter) > -1 || messageLink.indexOf(filter) > -1) {
    
          console.log('link present');
          $('.link' + i).css('display', '');
        } else {
          console.log('no link present');
          $('.link' + i).css('display', 'none');
        }
      }

  });

  $('#searchMsgBtn').on('click', function(event){
    event.preventDefault();
  })

}); //End doc ready