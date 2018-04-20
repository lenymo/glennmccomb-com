

//
//  HELLO
//––––––––––––––––––––––––––––––––––––––––––––––––––

const fetch = require("node-fetch");

export function handler(event, context, callback) {
  
  // console.log(event);

  // Replace this with environment variable.
  const apiKey = '8a01aea061e32344de520401cc2e2028';

  // My username.
  const username = 'elgyn2';

  const period = 'overall';

  // How many records to return.
  const limit = 12;

  try {

    // Get request data.
    const payload = JSON.parse(event.body);

    // const limit = payload.limit;

    // Build last.fm API url.
    const lastFmUrl = 'https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=' + username + '&api_key=' + apiKey + '&format=json&period=' + period + '&limit=' + limit;

    fetch(lastFmUrl, {
      method: 'POST'

    }).then(response => response.json())
      .then(response => {
        body: response
      });

  } catch(e) {
    callback(null, { statusCode: 500, body: "Internal Server Error: " + e });
  }

  // callback(null, {
  //   statusCode: 200,
  //   body: JSON.stringify({msg: "Hello, World!"})
  // });
}
