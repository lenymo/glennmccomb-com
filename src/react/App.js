

//
//  APP
//––––––––––––––––––––––––––––––––––––––––––––––––––

import React from 'react';

import LastFM from './components/LastFM';
import Instagram from './components/Instagram';


class App extends React.Component {
  render() {
    return(
      <div className="about-content">
        <LastFM />
        <Instagram />
      </div>
    )
  }
}

export default App