const Twit = require('twit');
// should be in Enviornment variable
const env = {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
};


const Twitter = new Twit(env);

function Tweet() {
  const day = new Date().getDay()
  const _day = ['sunday', 'monday', 'tuesday', 'wednesday',
   'thursday', 'friday', 'saturday']
  Twitter.post(
    'statuses/update',
    { status: `Enjoy your ${_day[day]} ` },
    (err, data, response) => { console.log(`Tweeted ${_day[day]}`); });
}


const hashtags = ['#100DaysOfCode', '#javascript', '@jztsaurabh', '#reactjs',
 '#vuejs', '#atom', '#DailyCSSimage']
 // for acessing the hashtags

function Retweet() {
  let i = getRandomInt(0, 6)
  Twitter.get(
    'search/tweets',
    { q: hashtags[i], count: 10 },
    (err, data) => {
      // go to statuses obj then array 0 then id to get the `id`
      i = getRandomInt(0, 9)
      const tweetId = data.statuses[i].id_str;
      console.log(`${tweetId}`)
          Twitter.post(
            'statuses/retweet/:id',
            { id: tweetId },
            (err, res) => {
              if (res) console.log(`Retweeted! ${tweetId}`)
            if (err) console.log('RETWEET ERROR!...: May be Duplicated ')
        });
  });
}

// Retweet()
// Retweet every 10 second
setInterval(Retweet, 10000)
// Daily
setInterval(Tweet, 60*60*24*1000)

// random integer between the specified values.
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


// workaround for not crashing server and listen on a port
const express = require('express');
const app     = express();

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    const result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
