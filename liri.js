require("dotenv").config();
var request = require("request");
var twitter = require("twitter");
var twitterArray = [];
var spotify = require("node-spotify-api");
var keys = require("./keys.js");
var fs = require("fs");
var OMDB = keys.omdb;
//Global Variables
var spotify = new spotify(keys.spotify);
var client = new twitter(keys.twitter);

var logText = function (text) {

  console.log(text)
  fs.appendFileSync("log.txt", text + "\n", "utf8");

}

//user input
var cmdIn = process.argv[2];
var searchStr = ""

for (var i = 3; i < process.argv.length; i++) {
  searchStr += process.argv[i] + " ";
};



//TWITTER

var readTwitter = function () {
  var params = { ryzemo99: 'node.js', count: 20 }
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (error) {
      logText("got error");
    };
    twitterArray = tweets;
    for (var i = 0; i < twitterArray.length; i++) {
      logText("Time:" + twitterArray[i].created_at);
      logText("Text:" + twitterArray[i].text)
      logText('--------------------------------------');
    }

  });
};

//SPOTIFY
var runSpotify = function (searchName) {
  if (searchName === "") {
    searchName = "The Sign Ace of Base";
  };

  spotify.
    search({ type: "track", query: searchName }, function (err, data) {
      if (err) {
        logText("Error: " + err);
        return;
      }

      var song = data.tracks.items[0];
      logText("--------------ARTIST------------------");
      logText(song.artists[0].name);
      logText('--------------------------------------');
      //for (i=0; i <songs.artists.lenght; i++) {

      //}
      logText("-------------SONG NAME----------------");
      logText(song.name);
      logText('--------------------------------------');

      logText("-------------PREVIEW LINK------------");
      logText(song.preview_url);
      logText('--------------------------------------');

      logText("-------------ALBUM--------------------")
      logText(song.album.name);
      logText('--------------------------------------');

    });
};

//OMDB

var runOMDB = function (movieName) {

  // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
  var request = require("request");

  // Store all of the arguments in an array
  var nodeArgs = process.argv;

  // Create an empty variable for holding the movie name
  //var movieName = "";


  if (movieName === "") {
    movieName = "mr+nobody"

  }

  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  logText(queryUrl);

  request(queryUrl, function (error, response, body) {
    if (error) {
      logText("Error: " + error);
      return;
    }

    // If the request is successful
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      logText("Title: " + JSON.parse(body).Title);
      logText("Release Year: " + JSON.parse(body).Year);
      logText("imdbRating: " + JSON.parse(body).imdbRating);

      for (var i = 0; i < JSON.parse(body).Ratings.length; i++) {
        var rating = JSON.parse(body).Ratings[i];
        if (rating.Source === "Rotten Tomatoes") {
          logText("Rotten Tomatoes: " + rating.Value)
        }
      }

      logText("Country where produced: " + JSON.parse(body).Country);
      logText("Language of the movie: " + JSON.parse(body).Language);
      logText("Plot of the movie: " + JSON.parse(body).Plot);
      logText("Actors in the movie: " + JSON.parse(body).Actors);

    }
  });
}

//Random Do what it says

var runRandom = function () {

  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return logText(error);
    }

    // We will then print the contents of data
    logText(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
    switch (dataArr[0]) {
      case "my-tweets":
        readTwitter();
        break;

      case "spotify-this-song":
        runSpotify(dataArr[1]);
        break;

      case "movie-this":
        runOMDB(dataArr[1]);
        break;

    };
    // if (dataArr[0] === "spotify-this-song") {
    //   runSpotify(dataArr[1]);
    // }
    // We will then re-display the content as an array for later use.
    logText(dataArr);

  })
}



//SWITCH to determine which option to run
switch (cmdIn) {
  case "my-tweets":
    readTwitter();
    break;

  case "spotify-this-song":
    runSpotify(searchStr);
    break;

  case "movie-this":
    runOMDB(searchStr);
    break;

  case "do-what-it-says":
    runRandom();
    break;

}
