$("#login").on("click", function(e) {
  e.preventDefault();

  var userData = {
    email: $("#email").val(),
    password: $("#password").val()
  };

  $.post("/api/login", userData).then(function(data){
    window.location.replace(data);
  });
});
