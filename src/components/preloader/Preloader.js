import React from "react";
import "./Preloader.css";

const Preloader = () => {
  const preloader = (
    <div className="loaderWrapper">
      <div className="loader" />
    </div>
  );

  return <div className="preloaderContent">{preloader}</div>;
};

export default Preloader;
