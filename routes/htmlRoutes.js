var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    if(req.user){
      return res.render("index");
    }

    res.render("signup");
  });

  app.get("/login", function(req, res) {
    if(req.user){
      return res.redirect("/");
    }

    res.render("login");
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
