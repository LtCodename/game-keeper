import React from 'react';
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
    </div>
  );
};

export default Preloader;
