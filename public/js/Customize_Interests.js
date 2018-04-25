var id;
var hate1;
var hate2;
var hate3;
var hate4;

$.get("/api/user_data").then(function(data) {
  id = data.id;
  hate1 = data.hate1
  hate2 = data.hate2
  hate3 = data.hate3
  hate4 = data.hate4
})

$(".interestEditOne").click(function(){
  var categorySelection = $(this).text();
  console.log(categorySelection);

  if(categorySelection != hate2 && categorySelection != hate3 && categorySelection != hate4){
    $("member-hate1").text(categorySelection);

    $.post("/api/updateInterestsOne", {
      id: id,
      hate1: categorySelection
    }).then(function(data) {
      console.log("success")
    })
  }else{
  console.log("duplicate entry");
}
});


$(".interestEditTwo").click(function(){
  var categorySelection = $(this).text();
  console.log(categorySelection);

if(categorySelection != hate1 && categorySelection != hate3 && categorySelection != hate4){
  $.post("/api/updateInterestsTwo", {
    id: id,
    hate2: categorySelection
  }).then(function(data) {
    console.log("success")
  })
}else{
  console.log("duplicate entry");
}
});

$(".interestEditThree").click(function(){
  var categorySelection = $(this).text();
  console.log(categorySelection);

if(categorySelection != hate2 && categorySelection != hate1 && categorySelection != hate4){
  $.post("/api/updateInterestsThree", {
    id: id,
    hate3: categorySelection
  }).then(function(data) {
    console.log("success")
  })
} else{
  console.log("duplicate entry");
}
});


$(".interestEditFour").click(function(){
  var categorySelection = $(this).text();
  console.log(categorySelection);

if(categorySelection != hate2 && categorySelection != hate3 && categorySelection != hate1){
  $.post("/api/updateInterestsFour", {
    id: id,
    hate4: categorySelection
  }).then(function(data) {
    console.log("success")
  })
} else{
  console.log("duplicate entry");
}
});