console.log("Ha-CHA")
console.log(process.env.SECRET_MESSAGE)
require("dotenv").keys();
var request = require("request");
var twitter = require("twitter")
var spotify = require("spotify");
var keys = require ("./keys.js")
// console.log(exports);
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);  