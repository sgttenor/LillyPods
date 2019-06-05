var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    console.log("get html routes : ",req.user);
    if(req.user){
      console.log("hay usuario ", req.user);
      return res.render("index");
    }

    console.log("NO hay usuario ", req.user);
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    console.log("login : ",req.user);
    if(req.user){
      return res.redirect("/");
    }

    res.render("login");
  })

  app.get("/about", function(req, res) {
    // console.log("login : ",req.user);
    // if(req.user){
    //   return res.redirect("/");
    // }

    res.render("about");
  })

  app.get("/playlist", function(req, res) {
    console.log("test")
    // console.log("login : ",req.user);
    // if(req.user){
    //   return res.redirect("/");
    // }

    res.render("playlist");
  })
  // Load example page and pass in an example by id
  app.get("/podcast/:id", function(req, res) {
    db.dbPodcast.findOne({ where: { id: req.params.id } }).then(function(dbPodcast) {
      res.render("example", {
        podcast: dbPodcast
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

