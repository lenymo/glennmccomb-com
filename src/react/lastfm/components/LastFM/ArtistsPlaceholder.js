//
//  ARTISTS PLACEHOLDER
//––––––––––––––––––––––––––––––––––––––––––––––––––

import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  limit: PropTypes.number.isRequired,
  colClasses: PropTypes.string.isRequired,
};

export const ArtistsPlaceholder = ({ limit, colClasses }) => {
  const cols = [];

  for (var i = 0; i < limit; i++) {
    cols.push(
      <div key={i} className={colClasses}>
        <div className="last-fm-artist -is-placeholder">
          <div className="last-fm-artist__rank"></div>
          <div className="last-fm-artist__meta">
            <div className="last-fm-artist__name"></div>
            <div className="last-fm-artist__play-count"></div>
          </div>
          <div className="last-fm-artist__square"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-sm-12">
      <div className="row">{cols}</div>
    </div>
  );
};

ArtistsPlaceholder.propTypes = propTypes;
