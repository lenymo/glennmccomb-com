

//
//  HELLO
//––––––––––––––––––––––––––––––––––––––––––––––––––

// const fetch = require('node-fetch');
import fetch from 'node-fetch';

export function handler(event, context, callback) {
  
  // console.log(event);

  // Replace this with environment variable.
  const apiKey = process.env.LASTFM_API_KEY;

  // My username.
  const username = 'elgyn2';

  // const period = 'overall';

  // How many records to return.
  // const limit = 12;

  try {

    // Get request data.
    const payload = JSON.parse(event.body);

    const limit = payload.limit;
    const period = payload.period;

    // Build last.fm API url.
    const lastFmUrl = 'https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=' + username + '&api_key=' + apiKey + '&format=json&period=' + period + '&limit=' + limit;

    // I used this to test that the last.fm URL was working.
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

    // console.log( 'test' );

    fetch(lastFmUrl, {
      method: 'GET'
    })
    // .then(response => response.json())
      .then(response => {
        callback(null, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          statusCode: 200,
          body: response
        });
      });

  } catch(e) {
    callback(null, { 
      statusCode: 500, 
      body: "Internal Server Error: " + e 
    });
  }

  // callback(null, {
  //   statusCode: 200,
  //   body: JSON.stringify({msg: "Hello, World!"})
  // });
}
