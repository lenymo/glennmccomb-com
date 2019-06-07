//
//  APP
//––––––––––––––––––––––––––––––––––––––––––––––––––

import React from "react";

import LastFM from "./components/LastFM";

class App extends React.Component {
  render() {
    return (
      <div className="about-content">
        <LastFM />
      </div>
    );
  }
}

export default App;
