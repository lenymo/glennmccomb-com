

//
//  LAST FM
//––––––––––––––––––––––––––––––––––––––––––––––––––

import React from 'react';

import LastFMArtist from './LastFMArtist';

class LastFM extends React.Component {
  constructor() {
    super();
    this.state = {artists: []};
  }

  componentWillMount() {

    // Build last.fm API url.
    var timePeriod = "overall";
    var username = 'elgyn2'; // My username.
    var apikey = '8a01aea061e32344de520401cc2e2028'; // My API key.
    var limit = 12;
    var lastFmUrl = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=' + username + '&api_key=' + apikey + '&format=json&period=' + timePeriod + '&limit=' + limit;

    fetch( lastFmUrl )
    .then(response => response.json())
      .then(response => {
          const {topartists:{artist: responseArtist}} = response;
          this.setState({
            artists: responseArtist
          });
      });
  }

  render() {
    let items = this.state.artists;

    return(
      <div className="row row__last-fm">
        {items.map((item, index) => 
          <LastFMArtist 
            key={item.name} 
            artist={item} 
            image={item.image[3]}
            rank={index + 1} />
        )}
      </div>
    )
  }
}

// const Artist = (props) =>

export default LastFM