import React from 'react';

const ArtistsPlaceholder = (props) => {
  
  var cols = [];
  for (var i = 0; i < 12; i++) {
    cols.push(
      <div key={i} className={props.colClasses}>
        <div className="last-fm-artist -is-placeholder">
          <div className="last-fm-artist__rank">
          </div>
          <div className="last-fm-artist__meta">
            <div className="last-fm-artist__name"></div>
            <div className="last-fm-artist__play-count"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row row__last-fm">

      {cols}

    </div>
  )
}

export default ArtistsPlaceholder;