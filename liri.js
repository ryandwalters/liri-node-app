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

//user input
var cmdIn = process.argv[2];
var searchStr = ""

for (var i = 3; i < process.argv.length; i++) {
  searchStr += process.argv[i] + " ";
};



//TWITTER

var readTwitter = function () {
  var params = { ryzemo99: 'node.js' }
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (error) {
      console.log("got error");
    };
    twitterArray = tweets;
    for (var i = 0; i < twitterArray.length; i++) {

      console.log("Time:" + twitterArray[i].created_at);
      console.log("Text:" + twitterArray[i].text)
      console.log('--------------------------------------');
    }

  });
};



//SPOTIFY
var runSpotify = function (searchName) {

  spotify.
    search({ type: "track", query: searchName }, function (err, data) {
      if (err) {
        console.log("Error: " + err);
        return;
      }

      var song = data.tracks.items[0];
      console.log("-----Artists-----");
      console.log(song.artists[0].name);
      //for (i=0; i <songs.artists.lenght; i++) {

      //}
      console.log("-----Song Name-----");
      console.log(song.name);

      console.log("----Preview Link-----");
      console.log(song.preview_url);

      console.log("-----Album-----")
      console.log(song.album.name);


    });

};

//OMDB

var runOMDB = function () {

  // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
  var request = require("request");

  // Store all of the arguments in an array
  var nodeArgs = process.argv;

  // Create an empty variable for holding the movie name
  var movieName = "";

  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (var i = 3; i < nodeArgs.length; i++) {
    if (movieName === "") {

      movieName = nodeArgs[i];

    } else if (movieName !== "") {

      movieName = movieName + "+" + nodeArgs[i];
    }

  }

  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);

  request(queryUrl, function (error, response, body) {
    if (error) {
      console.log("Error: " + error);
      return;
    }

    // If the request is successful
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("imdbRating: " + JSON.parse(body).imdbRating);

      for (var i = 0; i < JSON.parse(body).Ratings.length; i++) {
        var rating = JSON.parse(body).Ratings[i];
        if (rating.Source === "Rotten Tomatoes") {
          console.log("Rotten Tomatoes: " + rating.Value)
        }
      }

        console.log("Country where produced: " + JSON.parse(body).Country);
        console.log("Language of the movie: " + JSON.parse(body).Language);
        console.log("Plot of the movie: " + JSON.parse(body).Plot);
        console.log("Actors in the movie: " + JSON.parse(body).Actors);
      
    }
  });
}



    //RANDOM 

    if (cmdIn === "tweet") {
      readTwitter();
    } else if (cmdIn === "spotify") {
      runSpotify(searchStr);
    } else if (cmdIn === "omdb") {
      runOMDB();
    }else if (cmdIn==="random") {
      runRandom ();
    }






// //------------------OMDB--------------------//
// var request = require("request");

// // Store all of the arguments in an array
// var nodeArgs = process.argv;

// // Create an empty variable for holding the movie name
// var movieName = "";


// // Loop through ll the words in the node argument
// // And do a little for-loop magic to handle the inclusion of "+"s
// for (var i = 2; i < nodeArgs.length; i++) {

//   if (i > 2 && i < nodeArgs.length) {

//     movieName = movieName + "+" + nodeArgs[i];
//   }

//   else {
//     movieName += nodeArgs[i];

//   }
// }

// // Then run a request to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// // This line is just to help us debug against the actual URL.
// console.log(queryUrl);

// request(queryUrl, function (error, response, body) {

//   // If the request is successful
//   if (!error && response.statusCode === 200) {

//     // Parse the body of the site and recover just the imdbRating
//     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//     //list of console logs from movie site
//     console.log("Release Year: " + JSON.parse(body).Year);
//     console.log()

//     //   3. `node liri.js movie-this '<movie name here>'`

//     //  * This will output the following information to your terminal/bash window:

//     //    ```
//     //      * Title of the movie.
//     //      * Year the movie came out.
//     //      * IMDB Rating of the movie.
//     //      * Rotten Tomatoes Rating of the movie.
//     //      * Country where the movie was produced.
//     //      * Language of the movie.
//     //      * Plot of the movie.
//     //      * Actors in the movie.
//   }
// });





// //-----------------Spotify------------------//

// //. `node liri.js spotify-this-song '<song name here>'`
// //   * This will show the following information about the song in your terminal/bash window

// // * Artist(s)

// // * The song's name

// // * A preview link of the song from Spotify

// // * The album that the song is from

// // * If no song is provided then your program will default to "The Sign" by Ace of Base.


//console.log("#1 = " + searchStr);



//code to allow multiple word queries for OMDB and SPOTIFY
// var nodeArgs = process.argv;
// var action = process.argv[2];
// //Variable for movie or song requeset
// var x = " ";
// for (var i = 3; i < nodeArgs.length; i++) {

//   if (i > 3 && i < nodeArgs.length) {
//   x = x + "+" + nodeArgs[i];
//   }
//   else {
//     x+= nodeArgs[i];
//   }
// }

// //SWITCHES to specify which function to run
// switch (action) {
//   case "my-tweets":
//     twitter();
//     break;

//   case "spotify-this-song":
//   if (x) {
//     spotify(x);
//   } else {
//     spotify ("The Sign")
//   }
//     break;

//   case "movie-this":
//   if (x) {
//     omdb(x)
//   } else {
//     OMDB("Mr. Nobody");
//     break;
//   }

//   case "do-what-it-says":
//     random();
//     break;

//     default:
//     console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
//   break;
// 