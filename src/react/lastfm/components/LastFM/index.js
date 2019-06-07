//
//  LAST FM
//––––––––––––––––––––––––––––––––––––––––––––––––––

import React from "react";

import PeriodNav from "./PeriodNav";
import Artist from "./Artist";
import ArtistsPlaceholder from "./ArtistsPlaceholder";

class LastFM extends React.Component {
  constructor() {
    super();

    this.requestData = this.requestData.bind(this);
    this.renderLastFMHeader = this.renderLastFMHeader.bind(this);
    // this.lambdaFunction = this.lambdaFunction.bind(this);

    // Set initial state.
    this.state = {
      artists: [],
      period: "overall"
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
    this.requestData(this.state.period);

    // Call lambda function.
    // this.lambdaFunction( this.state.period );
  }

  //
  //  REQUEST DATA (DIRECT)
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  // requestData( period ) {

  //   // Clear state so old items disappear.
  //   this.setState({
  //     artists: {}
  //   });

  //   // My username.
  //   var username = 'elgyn2';

  //   // My API key.
  //   var apikey = '8a01aea061e32344de520401cc2e2028';

  //   // How many records to return.
  //   var limit = this.limit;

  //   // Build last.fm API url.
  //   var lastFmUrl = 'https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=' + username + '&api_key=' + apikey + '&format=json&period=' + period + '&limit=' + limit;

  //   fetch( lastFmUrl )
  //   .then(response => response.json())
  //     .then(response => {

  //         const {topartists:{artist: responseArtist}} = response;

  //         // Update state.
  //         this.setState({
  //           artists: responseArtist,
  //           period: period
  //         });
  //     });
  // }

  //
  //  REQUEST DATA (LAMBDA)
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  requestData(period) {
    // Clear state so old items disappear.
    this.setState({
      artists: {}
    });

    // How many records to return.
    let limit = this.limit;

    // Netlify lambda function endpoint.
    const url = "/.netlify/functions/lastfm";

    const data = {
      limit: limit,
      period: period
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data)
    })
      // fetch('http://localhost:9000/lastfm', {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //     'Access-Control-Allow-Origin' : '*',
      //     'Access-Control-Allow-Credentials' : true
      //   },
      //   mode: 'no-cors',
      //   method: 'POST',
      //   body: JSON.stringify(data)
      // })
      .then(response => response.json())
      .then(response => {
        // console.log( response );

        const {
          topartists: { artist: responseArtist }
        } = response;

        // Update state.
        this.setState({
          artists: responseArtist,
          period: period
        });
      });
  }

  //
  //  RENDER HEADER
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  renderLastFMHeader() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <h2 className="section__title -has-sub-title">Music</h2>
          <p>
            Scrobbled on <a href="http://last.fm/user/elgyn2">last.fm</a> since
            May 2005.
          </p>
        </div>
      </div>
    );
  }

  //
  //  RENDER
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  render() {
    let items = this.state.artists;

    const limit = this.limit;

    const colClasses = "col-sm-6 col-lg-4 col-xl-3 col__last-fm-artist";

    // If there are items, render them,
    // else render the placeholder.
    return items.length ? (
      <section className="section section__about-music">
        <div className="container container__about-music">
          {this.renderLastFMHeader()}
          <div className="row row__last-fm">
            <PeriodNav
              requestData={this.requestData}
              period={this.state.period}
            />
            {items.map((item, index) => (
              <Artist
                key={item.name}
                artist={item}
                image={item.image[3]}
                rank={index + 1}
                colClasses={colClasses}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    ) : (
      <section className="section section__about-music">
        <div className="container container__about-music">
          {this.renderLastFMHeader()}
          <div className="row row__last-fm">
            <PeriodNav
              requestData={this.requestData}
              period={this.state.period}
            />
            <ArtistsPlaceholder colClasses={colClasses} limit={limit} />
          </div>
        </div>
      </section>
    );
  }
}

// const Artist = (props) =>

export default LastFM;
