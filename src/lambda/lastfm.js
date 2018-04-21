

//
//  HELLO
//––––––––––––––––––––––––––––––––––––––––––––––––––

// const fetch = require('node-fetch');
import fetch from 'node-fetch';

export function handler(event, context, callback) {

  // Environment variable.
  const apiKey = process.env.LASTFM_API_KEY;

  // My username.
  const username = 'elgyn2';


  try {
    // Get request data.
    const payload = JSON.parse(event.body);

    const limit = payload.limit;
    const period = payload.period;

    // Build last.fm API url.
    const lastFmUrl = 'https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=' + username + '&api_key=' + apiKey + '&format=json&period=' + period + '&limit=' + limit;

    // // I used this to test that the last.fm URL was working.
    // callback(null, {
    //   // headers: {
    //   //   'Content-Type': 'application/json',
    //   //   'Accept': 'application/json',
    //   //   "Access-Control-Allow-Origin" : "*",
    //   //   "Access-Control-Allow-Credentials" : true
    //   // },
    //   statusCode: 200,
    //   body: JSON.stringify({lastFmUrl: lastFmUrl})
    // });

    // Last.fm API request.
    fetch(lastFmUrl, {
      method: 'GET'
    })
    .then(response => response.json())
      .then(response => {
        callback(null, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            // 'Access-Control-Allow-Origin' : '*', 
            // 'Access-Control-Allow-Credentials' : true 
          },
          statusCode: 200,
          body: JSON.stringify(response)
        });
      }).catch((e) => {
        callback(null, { statusCode: 500, body: "Internal Server Error: " + e });
      });

  } catch(e) {
    callback(null, { 
      statusCode: 500, 
      body: "Internal Server Error: " + e 
    });
  }
}
