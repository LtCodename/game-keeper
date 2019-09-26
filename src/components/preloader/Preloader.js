import React from 'react';
import Footer from '../footer/Footer.js';
import HeaderFake from '../header-fake/HeaderFake.js';
import './Preloader.css';

class Preloader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const preloader = (
      <div className="loaderWrapper">
        <div className="loader"></div>
      </div>
    );

    return (
      <div className="preloaderWrapper">
        <HeaderFake/>
        <div className="preloaderContent">
          {preloader}
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Preloader;
