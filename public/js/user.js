$(document).ready(function(){
    
    var userProfile = fetchUser();  


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
  console.log(userProfile)
})