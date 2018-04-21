

//
//  LAST FM
//––––––––––––––––––––––––––––––––––––––––––––––––––

import React from 'react';

import PeriodNav from './PeriodNav';
import Artist from './Artist';
import ArtistsPlaceholder from './ArtistsPlaceholder';

class LastFM extends React.Component {
  constructor() {
    super();

    this.requestData = this.requestData.bind(this);
    this.lambdaFunction = this.lambdaFunction.bind(this);

    // Set initial state.
    this.state = {
      artists: [],
      period: 'overall'
    };

    // Determine how many last.fm artists are
    // requested from the API.
    this.limit = 12;
  }


  //
  //  COMPONENT WILL MOUNT
  //––––––––––––––––––––––––––––––––––––––––––––––––––
  
  componentWillMount() {

    // Request last.fm data.
    this.requestData( this.state.period );

    // Call lambda function.
    this.lambdaFunction( this.state.period );
  }


  requestData( period ) {

    // clear state so old items disappear.
    this.setState({
      artists: {}
    });

    // My username.
    var username = 'elgyn2';

    // My API key.
    var apikey = '8a01aea061e32344de520401cc2e2028';

    // How many records to return.
    var limit = this.limit;

    // Build last.fm API url.
    var lastFmUrl = 'https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=' + username + '&api_key=' + apikey + '&format=json&period=' + period + '&limit=' + limit;

    fetch( lastFmUrl )
    .then(response => response.json())
      .then(response => {
          
          const {topartists:{artist: responseArtist}} = response;

          // Update state.
          this.setState({
            artists: responseArtist,
            period: period
          });
      });
  }


  //
  //  LAMBDA FUNCTION
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  lambdaFunction( period ) {

    console.log( 'period: ' + period );

    // How many records to return.
    var limit = this.limit;

    fetch('/.netlify/functions/hello', {
      method: 'POST',
      body: JSON.stringify({
        limit: limit,
        period: period
      })
    })
    // fetch('http://localhost:9000/hello', {
    //   mode: 'no-cors',
    //   method: 'POST',
    //   // body: JSON.stringify({
    //   //   limit: limit
    //   // }),
    //   headers: { 
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   }
    // })
    .then(response => response.json())
      .then(response => {
        console.log( response );
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
        <PeriodNav 
          requestData={this.requestData} 
          period={this.state.period}
          lambdaFunction={this.lambdaFunction}
        />
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
    ) : (
      <div className="row row__last-fm">
        <PeriodNav 
          requestData={this.requestData} 
          period={this.state.period} 
        />
        <ArtistsPlaceholder 
            colClasses={colClasses} 
            limit={limit}
          />
      </div>
    )
  }
}

// const Artist = (props) =>

export default LastFM