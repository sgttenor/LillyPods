$("#signup").on("click", function(e) {
  e.preventDefault();

  var userData = {
    email: $("#email").val(),
    password: $("#password").val()
  };

  $.post("/api/signup", userData).then(function(data){
    console.log(data);
    alert(data.message);
  })
});
