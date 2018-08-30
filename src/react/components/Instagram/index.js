

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
      posts: [
        {
          id: 1,
          loading: true
        },{
          id: 2,
          loading: true
        }, {
          id: 3,
          loading: true
        }, {
          id: 4,
          loading: true
        }, {
          id: 5,
          loading: true
        }, {
          id: 6,
          loading: true
        }, {
          id: 7,
          loading: true
        }, {
          id: 8,
          loading: true
        }, {
          id: 9,
          loading: true
        }, {
          id: 10,
          loading: true
        }, {
          id: 11,
          loading: true
        }, {
          id: 12,
          loading: true
        }
      ]
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

  // requestData() {

  //   // clear state so old items disappear.
  //   this.setState({
  //     posts: {}
  //   });

  //   const accessToken = '677237.d4f927a.0fa87949730f4ea5917ad69b14e782d2';
  //   // const userID = '677237';
  //   const userID = 'self';
  //   const numberOfPhotos = 12;

  //   const instagramUrl = 'https://api.instagram.com/v1/users/' + userID + '/media/recent/?access_token=' + accessToken;

  //   fetch(instagramUrl)
  //     .then(response => response.json())
  //       .then(response => {

  //         // Get API response.
  //         const data = response.data;

  //         // Update state.
  //         this.setState({
  //           posts: data,
  //         });

  //         console.log(this.state.posts);
  //       });
  // }


  //
  //  REQUEST DATA (LAMBDA)
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  requestData() {
    // clear state so old items disappear.
    // this.setState({
    //   posts: {}
    // });

    const url = '/.netlify/functions/instagram';

    fetch(url, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(response => {

        console.log(response);

        // Get API response.
        const data = response.data;

        // If there's data.
        if (data) {
          // Update state.
          this.setState({
            posts: data,
          });
        }

      });
  }


  //
  //  RENDER
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  render() {

    let posts = this.state.posts;

    return (
      <section className="section section__about-instagram -has-dark-bg">
        <div className="container container__about-instagram">
          <div className="row">
            <div className="col-sm-12">
              <h2 className="section__title -has-sub-title">
                Photography
              </h2>
              <p>
                Photos I've posted on Instagram recently.
              </p>
            </div>
          </div>
        </div>
        <div className="about-instagram__row">
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