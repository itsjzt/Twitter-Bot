const Twit = require('twit')
const env = require('./ENV')

const Twitter = new Twit(env)

function Tweet() {
  const day = new Date().getDay()
  const _day = ['sunday', 'monday', 'tuesday', 'wednesday',
   'thursday', 'friday', 'saturday']
  Twitter.post(
    'statuses/update',
    { status: `Enjoy your ${_day[day]} ` },
    (err, data, response) => { console.log(`Tweeted ${_day[day]}`); })
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
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min;
  //The maximum is exclusive and the minimum is inclusive
}
