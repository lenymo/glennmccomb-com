

//
//  INSTAGRAM
//––––––––––––––––––––––––––––––––––––––––––––––––––

import fetch from 'node-fetch';

export function handler(event, context, callback) {

  // Environment variable.
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  // User id (can be a number of self)
  const userID = 'self';

  try {
    // Build Instagram API url.
    const instagramUrl = 'https://api.instagram.com/v1/users/' + userID + '/media/recent/?access_token=' + accessToken;

    // Instagram API request.
    fetch(instagramUrl, {
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

  } catch (e) {
    callback(null, {
      statusCode: 500,
      body: "Internal Server Error: " + e
    });
  }
}
