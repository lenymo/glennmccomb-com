import React from 'react';

const ArtistsPlaceholder = (props) => {
  
  const cols = [];
  const limit = props.limit

  for (var i = 0; i < limit; i++) {
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