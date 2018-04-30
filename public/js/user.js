$(document).ready(function(){
    
    var userInfo = fetchUser();  

     // Function To Retrieve Logged In User Info
    function fetchUser() {

      $.ajax("/api/user", {
        method: 'GET'
      })
        .then(function (data) {
          console.log('\n\n\n',data,'\nfetcheddata');
  
          if (data === "/login") {
            var url = window.location.origin + data;
            window.location.assign(url);
            return;
          }
  
          // return data;
          res.render('user', {
            name: data.name,
            email: data.email,
            occupation: data.occupation,
            relationship: data.relationshipType,
            location: data.location
          })
        });
    };

    $.ajax("/api/user", {
        method: 'GET'
      })
        .then(function (data) {
  console.log("apiuser return", data.email);
          if (data === "/login") {
            var url = window.location.origin + data;
            window.location.assign(url);
            return;
          }
  
          return data;
  
        });
       
  
  
})

