

//
//  LAST FM
//––––––––––––––––––––––––––––––––––––––––––––––––––

import React from 'react';

import Artist from './Artist';
import ArtistsPlaceholder from './ArtistsPlaceholder';

class LastFM extends React.Component {
  constructor() {
    super();
    this.state = {artists: []};

    // Determine how many last.fm artists are
    // requested from the API.
    this.limit = 12;
  }


  //
  //  COMPONENT WILL MOUNT
  //––––––––––––––––––––––––––––––––––––––––––––––––––
  
  componentWillMount() {

    // Build last.fm API url.
    var timePeriod = "overall";
    var username = 'elgyn2'; // My username.
    var apikey = '8a01aea061e32344de520401cc2e2028'; // My API key.
    var limit = this.limit;
    var lastFmUrl = 'https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=' + username + '&api_key=' + apikey + '&format=json&period=' + timePeriod + '&limit=' + limit;

    fetch( lastFmUrl )
    .then(response => response.json())
      .then(response => {
          const {topartists:{artist: responseArtist}} = response;
          this.setState({
            artists: responseArtist
          });
      });
  }

  
  //
  //  RENDER
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  render() {
    let items = this.state.artists;

    const limit = this.limit;

    const colClasses = 'col-sm-6 col-lg-4 col-xl-3 col__last-fm-artist';

    // If there are items, render them, 
    // else render the placeholder.
    return items.length ? (
      <div className="row row__last-fm">
        {items.map((item, index) => 
          <Artist 
            key={item.name} 
            artist={item} 
            image={item.image[3]}
            rank={index + 1}
            colClasses={colClasses}
          />
        )}
      </div>
    ) : <ArtistsPlaceholder 
          colClasses={colClasses} 
          limit={limit}
        />
  }
}

// const Artist = (props) =>

export default LastFM