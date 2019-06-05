const db = require("../models");
const unirest = require("unirest");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    if (req.user) {
      return res.render("index");
    }

    res.render("signup");
  });

  app.get("/login", function (req, res) {
    if (req.user) {
      return res.redirect("/");
    }

    res.render("login");
  })

  // Load example page and pass in an example by id
  app.get("/podcast/:id", function (req, res) {
    db.Podcast.findOne({ where: { id: req.params.id } }).then(function (dbPodcast) {
      res.render("example", {
        podcast: dbPodcast
      });
    });
  });

  // Get podcasts
  app.get("/podcasts/:search?", async function (req, res) {
    const search = req.params.search || "star wars";
    const response = await unirest
      .get(
        'https://listen-api.listennotes.com/api/v2/search?q=' + search + '&sort_by_date=1')
      .header('X-ListenAPI-Key', 'dbb72be8f67f44a1869d4db98e80bf90');

    var results = response.toJSON().body.results;
    var data = {
      podcasts: [],
      name: search,
      isAuthenticated: (req.user ? true : false)
    };

    for (var i = 0; i < results.length; i++) {
      var currentPodcast = results[i];
      data.podcasts.push({
        id: currentPodcast.id,
        audio: currentPodcast.audio,
        title: currentPodcast.podcast_title_original,
        imageurl: currentPodcast.image
      })
    };
    
    res.render("podcast", data);
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

