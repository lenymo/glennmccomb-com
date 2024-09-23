import fetch from "node-fetch";

export const handler = async (event) => {
  // Environment variable.
  const apiKey = process.env.LASTFM_API_KEY;

  // My username.
  const username = "elgyn2";

  // Get request data.
  // console.log("event", event);
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify("Payload required"),
    };
  }

  const { limit, period } = JSON.parse(event.body);

  // Build last.fm API url.
  const apiBase = `https://ws.audioscrobbler.com/2.0/`;
  const lastFmUrl = `${apiBase}?method=user.gettopartists&user=${username}&api_key=${apiKey}&format=json&period=${period}&limit=${limit}`;

  // Last.fm API request.
  const response = await fetch(lastFmUrl, {
    method: "GET",
  });
  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};
