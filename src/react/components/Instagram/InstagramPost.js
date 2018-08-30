
//

//  INSTAGRAM POST
//––––––––––––––––––––––––––––––––––––––––––––––––––

import React from 'react';
import PropTypes from 'prop-types';

class InstagramPost extends React.Component {
  render() {

    // console.log(this.props.data);
    let loadingClassName = 'instagram-post--loading';

    const { data} = this.props;

    const { loading } = data;

    // Generate a random number 0-100
    const randomHeight = Math.floor(Math.random() * 100);
    const randomHeightCss = {
      paddingBottom: (randomHeight + 50) + '%'
    };

    // If the page isn't loading.
    if (!loading) {

      // Remove the loading class name.
      loadingClassName = '';
    }

    let likes;
    let image;
    let caption;

    if (data.likes ) {
      likes = this.props.data.likes.count
    }

    if (data.images) {
      image = data.images.standard_resolution.url;
    }

    if (data.caption) {
      caption = data.caption.text;
    }

    return(
      <div className={`instagram-post ${loadingClassName}`}>
        {image ? (
          <img src={image} className="instagram-post__image" />
        ) : (
            <div className="instagram-post__image instagram-post__image--placeholder" style={randomHeightCss} />
        )}
        {!loading ? (
        <div className="instagram-post__meta">
          <p className="instagram-post__caption">
            {caption}
          </p>
          <small className="instagram-post__likes">
            &hearts; {likes}
          </small>
        </div>
        ) : (
          <div className="instagram-post__meta instagram-post__meta--placeholder">
            <p className="instagram-post__caption instagram-post__caption--placeholder">
              &nbsp;
            </p>
            <small className="instagram-post__likes instagram-post__likes--placeholder">
              &nbsp;
            </small>
          </div>
        )}
      </div>
    )
  }
}


//
//  PROP TYPES
//––––––––––––––––––––––––––––––––––––––––––––––––––

InstagramPost.propTypes = {
  data: PropTypes.object.isRequired,
}

export default InstagramPost;