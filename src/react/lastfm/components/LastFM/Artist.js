//
//  ARTIST
//––––––––––––––––––––––––––––––––––––––––––––––––––

import React from "react";
import PropTypes from "prop-types";

// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Artist extends React.Component {
  formatPlayCount(playCount) {
    var formattedPlayCount = parseInt(playCount);
    formattedPlayCount = formattedPlayCount.toLocaleString();
    return formattedPlayCount;
  }

  render() {
    const { index, artist, colClasses, rank } = this.props;

    // const artistImage = this.props.image["#text"];

    const delay = index * 0.05;

    //
    //  STYLES
    //––––––––––––––––––––––––––––––––––––––––––––––––––

    const rankStyles = {
      animationDelay: delay + "s"
    };

    const nameStyles = {
      animationDelay: delay + "s"
    };

    const playcountStyles = {
      animationDelay: delay + "s"
    };

    // const backgroundImageStyles = {
    //   backgroundImage: "url(" + artistImage + ")",
    //   animationDelay: delay + "s"
    // };

    const overlayStyles = {
      animationDelay: delay + "s"
    };

    // Get playcount.
    const playCount = this.formatPlayCount(artist.playcount);

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
            style={{
              opacity: 100 - index * 2
            }}
          />
          <div className="last-fm-artist__overlay" style={overlayStyles} />
          <div className="last-fm-artist__square" />
        </a>
      </div>
    );
  }
}

Artist.propTypes = {
  artist: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  rank: PropTypes.number.isRequired,
  colClasses: PropTypes.string.isRequired
};

export default Artist;
