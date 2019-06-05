$(document).ready(function() {
    // Getting jQuery references to the post id, audio, title, and image select
    var idInput = $("#podcast_id");
    var audioInput = $("#audio");
    var titleInput = $("#title");
    var imageURL = $("#imageurl");
    var addPod = $("#add")
    // Adding an event listener for when the form is submitted
    $(addPod).on("submit", handleFormSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    var url = req.params.search;
    var podId;
    var userId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;
  
    // If we have this section in our url, we pull out the post id from the url
    
    // if (url.indexOf("?podcast_id=") !== -1) {
    //   podId = url.split("=")[1];
    //   getPostData(podId, "post");
    // }
    // // Otherwise if we have an author_id in our url, preset the author select box to be our Author
    // else if (url.indexOf("?user_id=") !== -1) {
    //   userId = url.split("=")[1];
    // }
  
    // Getting the podcasts
    getPodcasts();
  
    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a body, title, or author
      if (!idInput.val().trim() || !audioInput.val().trim() || !titleInput.val() || !imageURL.val()) {
        return;
      }
      // Constructing a newPod object to hand to the database
      var newPod = {
        podcast_id: idInput
        .val()
        .trim(),
        audio: audioInput
        .val()
        .trim(),
        title: titleInput
          .val()
          .trim(),
        imageurl: titleInput.val()
      };
  
      // If we're updating a post run updatePost to update a post
      // Otherwise run submitPost to create a whole new post
      if (updating) {
        newPod.id = podcast_id;
        updatePost(newPod);
      }
      else {
        submitPost(newPod);
      }
    }
  
    // Submits a new post and brings user to podcast search page upon completion
    function submitPost(post) {
      $.post("/api/playlist", post, function() {
        req.params.search = "/podcast";
      });
    }
  
    // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
    function getPostData(id, type) {
      var queryUrl;
      switch (type) {
      case "post":
        queryUrl = "/api/posts/" + id;
        break;
      case "author":
        queryUrl = "/api/authors/" + id;
        break;
      default:
        return;
      }
      $.get(queryUrl, function(data) {
        if (data) {
          console.log(data.podcast_id || data.id);
          // If this post exists, prefill our cms forms with its data
          id.val(data.currentPodcast.id);
          audioInput.val(data.currentPodcast.audio);
          titleInput.val(data.currentPodcast.podcast_title_original);
          imageURL.val(data.currentPodcast.image);
          // If we have a post with this id, set a flag for us to know to update the post
          // when we hit submit
          updating = true;
        }
      });
    }
  
    // A function to get Authors and then render our list of Authors
    function getPodcasts() {
      $.get("/api/podcasts", renderPodcastList);
    }
    // Function to either render a list of authors, or if there are none, direct the user to the page
    // to create an author first
    function renderPodcastList(data) {
      if (!data.length) {
        req.params.search= "/podcasts";
      }
      $(".hidden").removeClass("hidden");
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createPodcastRow(data[i]));
      }
      podcastSelect.empty();
      console.log(rowsToAdd);
      console.log(podcastSelect);
      podcastSelect.append(rowsToAdd);
      podcastSelect.val(podId);
    }
  
    // // Creates the author options in the dropdown
    // function createAuthorRow(author) {
    //   var listOption = $("<option>");
    //   listOption.attr("value", author.id);
    //   listOption.text(author.name);
    //   return listOption;
    // }
  
    // Update a given post, bring user to the blog page when done
    function updatePost(post) {
      $.ajax({
        method: "PUT",
        url: "/api/podcasts",
        data: post
      })
        .then(function() {
            req.params.search = "/podcasts";
        });
    }
  });
//     function createHTML(podcastData) {
// var podTemplate = document.getElementById("podCast").innerHTML;
// var compiledCast = Handlebars.compile(podTemplate);
// var ourGeneratedHTML = compiledCast(podcastData);

// var podContainer = document.getElementById("podCast");
// podContainer.innerHTML = ourGeneratedHTML;
//     }
//   });
  
