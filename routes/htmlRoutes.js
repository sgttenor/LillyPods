var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    console.log("get html routes : ", req.user);
    if (req.user) {
      console.log("hay usuario ", req.user);
      return res.render("index");
    }

    console.log("NO hay usuario ", req.user);
    res.render("signup");
  });

  app.get("/login", function (req, res) {
    console.log("login : ", req.user);
    if (req.user) {
      return res.redirect("/");
    }

    res.render("login");
  })

  // Load example page and pass in an example by id
  app.get("/podcast/:id", function (req, res) {
    db.dbPodcast.findOne({ where: { id: req.params.id } }).then(function (dbPodcast) {
      res.render("example", {
        podcast: dbPodcast
      });
    });
  });



  app.get('/playlist', async function (req, res) {

    res.render("playlist", {
      podcasts: [
        {
          title: "Testing 1",
          audio: "http://google.com",
          imageurl: "http://placehold.it/200/200"
        },
        {
          title: "Testing 2",
          audio: "http://google.com",
          imageurl: "http://placehold.it/200/200"
        },
        {
          title: "Testing 3",
          audio: "http://google.com",
          imageurl: "http://placehold.it/200/200"
        }
      ]
    })


  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

