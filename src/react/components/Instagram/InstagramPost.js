
//

//  INSTAGRAM POST
//––––––––––––––––––––––––––––––––––––––––––––––––––

import React from 'react';
import PropTypes from 'prop-types';

class InstagramPost extends React.Component {
  render() {

    console.log(this.props.data);

    let data = this.props.data;

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

    console.log(likes);
    console.log(image);
    console.log(caption);

    return(
      <div className="instagram-post">
        <img src={image} className="instagram-post__image" />
        <p className="instagram-post__caption">
          {caption}
        </p>
        <small className="instagram-post__likes">
          {likes} likes
        </small>
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