import React from 'react';
import Footer from '../footer/Footer.js';
import HeaderFake from '../header-fake/HeaderFake.js';
import './Preloader.css';

const Preloader = () => {
  const preloader = (
    <div className="loaderWrapper">
      <div className="loader"/>
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
  );
};

export default Preloader;
