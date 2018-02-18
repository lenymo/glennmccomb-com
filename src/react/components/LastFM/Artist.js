
//
//  ARTIST
//––––––––––––––––––––––––––––––––––––––––––––––––––

import React from 'react';
import PropTypes from 'prop-types';

class Artist extends React.Component {

  formatPlayCount( playCount ) {
    var formattedPlayCount = parseInt(playCount);
    formattedPlayCount = formattedPlayCount.toLocaleString();
    return formattedPlayCount;
  }

  render() {

    const artistImage = this.props.image['#text'];

    const artistStyles = {
      backgroundImage: 'url(' + artistImage + ')'
    };

    // Get playcount.
    const playCount = this.formatPlayCount(this.props.artist.playcount);

    return (
      <div className={this.props.colClasses} key={this.props.artist.name}>
        <a href={this.props.artist.url} className="last-fm-artist" target="_blank">
          <div className="last-fm-artist__rank">
            {this.props.rank}
          </div>
          <div className="last-fm-artist__meta">
            <h3 className="last-fm-artist__name">
              {this.props.artist.name}
            </h3>
            <p className="last-fm-artist__play-count">{playCount} plays</p>
            <img className="last-fm-artist__image" src={artistImage} alt={this.props.artist.name} />
          </div>
          <div className="last-fm-artist__background-image" style={artistStyles}></div>
          <div className="last-fm-artist__overlay"></div>
        </a>
      </div>
    )
  }
}

Artist.propTypes = {
  artist: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  rank: PropTypes.number.isRequired,
  colClasses: PropTypes.string.isRequired
}

export default Artist;