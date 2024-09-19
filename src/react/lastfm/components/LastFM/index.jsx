//
//  LAST FM
//––––––––––––––––––––––––––––––––––––––––––––––––––

import React, { useEffect, useState } from "react";

import { PeriodNav } from "./PeriodNav";
import { Artist } from "./Artist";
import { ArtistsPlaceholder } from "./ArtistsPlaceholder";

export const LastFM = () => {
  const [artists, setArtists] = useState([]);
  const [period, setPeriod] = useState("overall");
  const limit = 12;

  //
  //  COMPONENT WILL MOUNT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  useEffect(() => {
    requestData(period);
  }, []);

  //
  //  REQUEST DATA (DIRECT)
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  const requestData = (period) => {
    // Clear state so old items disappear.
    setArtists([]);

    // My username.
    var username = "elgyn2";

    // My API key.
    var apikey = import.meta.env.VITE_LASTFM_API_KEY;

    // Build last.fm API url.
    var lastFmUrl =
      "https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=" +
      username +
      "&api_key=" +
      apikey +
      "&format=json&period=" +
      period +
      "&limit=" +
      limit;

    fetch(lastFmUrl)
      .then((response) => response.json())
      .then((response) => {
        const {
          topartists: { artist: responseArtist },
        } = response;

        // Update state.
        setPeriod(period);
        setArtists(responseArtist);
      });
  };

  //
  //  RENDER HEADER
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  const renderLastFMHeader = () => {
    return (
      <div className="row">
        <div className="col-sm-12">
          <h2 className="section__title -has-sub-title">Music</h2>
          <p>
            Scrobbled on{" "}
            <a href="http://last.fm/user/elgyn2" target="_blank">
              last.fm
            </a>{" "}
            since May 2005.
          </p>
        </div>
      </div>
    );
  };

  //
  //  RENDER
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  let items = artists;

  const colClasses = "col-sm-6 col-lg-4 col-xl-3 col__last-fm-artist";

  // If there are items, render them,
  // else render the placeholder.
  return items.length ? (
    <section className="section section__about-music">
      <div className="container container__about-music">
        {renderLastFMHeader()}
        <div className="row row__last-fm">
          <PeriodNav requestData={requestData} period={period} />
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
        {renderLastFMHeader()}
        <div className="row row__last-fm">
          <PeriodNav requestData={requestData} period={period} />
          <ArtistsPlaceholder colClasses={colClasses} limit={limit} />
        </div>
      </div>
    </section>
  );
};
