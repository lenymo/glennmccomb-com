
//
//  LAST FM ARTIST
//––––––––––––––––––––––––––––––––––––––––––––––––––

import React from 'react';

class LastFMArtist extends React.Component {

  formatPlayCount( playCount ) {
    var formattedPlayCount = parseInt(playCount);
    formattedPlayCount = formattedPlayCount.toLocaleString();
    return formattedPlayCount;
  }

  render() {

    var artistImage = this.props.image['#text'];

    var artistStyles = {
      backgroundImage: 'url(' + artistImage + ')'
    };

    // Get playcount.
    var playCount = this.formatPlayCount(this.props.artist.playcount);

    return (
      <div className="col-sm-6 col-lg-4 col-xl-3 col__last-fm-artist -has-dark-bg" key={this.props.artist.name}>
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

export default LastFMArtist;