//
//  ARTIST
//––––––––––––––––––––––––––––––––––––––––––––––––––

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const propTypes = {
  artist: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  rank: PropTypes.number.isRequired,
  colClasses: PropTypes.string.isRequired,
};

export const Artist = ({ index, artist, colClasses, rank }) => {
  const [artistImage, setArtistImage] = useState(null);

  const formatPlayCount = (playCount) => {
    var formattedPlayCount = parseInt(playCount);
    formattedPlayCount = formattedPlayCount.toLocaleString();
    return formattedPlayCount;
  };

  const delay = index * 0.05;

  //
  //  STYLES
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  const rankStyles = {
    animationDelay: delay + "s",
  };

  const nameStyles = {
    animationDelay: delay + "s",
  };

  const playcountStyles = {
    animationDelay: delay + "s",
  };

  const alpha = 1.5 - (1 - index * 0.05);

  const backgroundImageStyles = {
    backgroundColor: `rgba(28, 36, 44, ${alpha})`,
    backgroundImage: "url(" + artistImage + ")",
    animationDelay: delay + "s",
  };

  const overlayStyles = {
    animationDelay: delay + "s",
  };

  // Get playcount.
  const playCount = formatPlayCount(artist.playcount);

  //
  //  GET ARTIST IMAGES
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  const fetchArtistImages = async () => {
    const url =
      "https://musicbrainz.org/ws/2/artist/" +
      artist.mbid +
      "?inc=url-rels&fmt=json";

    const response = await fetch(url);
    const data = await response.json();

    const relations = data.relations;
    console.table(relations);

    // Find image relation
    for (let i = 0; i < relations.length; i++) {
      if (relations[i].type === "image") {
        let image_url = relations[i].url.resource;
        if (image_url.startsWith("https://commons.wikimedia.org/wiki/File:")) {
          const filename = image_url.substring(image_url.lastIndexOf("/") + 1);
          image_url =
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/" +
            filename;
        }
        console.log(image_url);
        setArtistImage(image_url);
      }
    }
  };

  useEffect(() => {
    console.log("artist.mbid", artist.mbid);
    if (artist && artist.mbid && !artistImage) {
      fetchArtistImages(artist.mbid);
    }
  }, [artist, artistImage]);

  return (
    <div className={colClasses} key={artist.name}>
      <a
        key={rank}
        href={artist.url}
        className="last-fm-artist -is-artist"
        target="_blank"
      >
        <div className="last-fm-artist__rank" style={rankStyles}>
          {rank}
        </div>
        <div className="last-fm-artist__meta">
          <h3 className="last-fm-artist__name" style={nameStyles}>
            {artist.name}
          </h3>
          <p className="last-fm-artist__play-count" style={playcountStyles}>
            {playCount} plays
          </p>
          {/* <img
              className="last-fm-artist__image"
              src={artistImage}
              alt={artist.name}
            /> */}
        </div>
        <div
          className="last-fm-artist__background-image"
          style={backgroundImageStyles}
        />
        <div className="last-fm-artist__overlay" style={overlayStyles} />
        <div className="last-fm-artist__square" />
      </a>
    </div>
  );
};

Artist.propTypes = propTypes;
