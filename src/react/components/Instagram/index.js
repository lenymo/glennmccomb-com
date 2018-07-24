

//
//  INSTAGRAM
//––––––––––––––––––––––––––––––––––––––––––––––––––

import React from 'react';

import InstagramPost from './InstagramPost';

class Instagram extends React.Component {

  constructor() {
    super();

    this.requestData = this.requestData.bind(this);

    this.state = {
      posts: []
    }
  }


  //
  //  COMPONENT WILL MOUNT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  componentWillMount() {

    // Request Instagram data.
    this.requestData();
  }


  //
  //  REQUEST DATA
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  requestData() {

    // clear state so old items disappear.
    this.setState({
      posts: {}
    });

    const accessToken = '677237.d4f927a.0fa87949730f4ea5917ad69b14e782d2';
    // const userID = '677237';
    const userID = 'self';
    const numberOfPhotos = 12;

    const instagramUrl = 'https://api.instagram.com/v1/users/' + userID + '/media/recent/?access_token=' + accessToken;

    fetch(instagramUrl)
      .then(response => response.json())
        .then(response => {

          // Get API response.
          const data = response.data;

          // Update state.
          this.setState({
            posts: data,
          });
        });
  }


  //
  //  RENDER
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  render() {

    let posts = this.state.posts;

    console.log(posts);

    return (
      <section className="section section__about-instagram">
        <div className="container container__about-instagram">
          <div className="row">
            <div className="col-sm-12">
              <h2>
                Photography
              </h2>
              <p>
                Photos I've posted on Instagram recently.
              </p>
            </div>
          </div>
        </div>
        <div className="row row__instagram">
          {posts.length > 0 &&
            posts.map((post, index) =>
              <InstagramPost
                key={post.id}
                data={post}
              />
            )
          }
        </div>
      </section>
    )
  }
}

export default Instagram