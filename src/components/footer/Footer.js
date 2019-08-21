import React from 'react';
import './Footer.css';

class Footer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {

    const shareIcons = (
      <div className="shareIconsWrapper">
          <a href="https://github.com/LtCodename/Game-Keeper" target="blank"><i className="fab fa-github"></i></a>
          <a href="https://twitter.com/LtCodename" target="blank"><i className="fab fa-twitter"></i></a>
      </div>
    );

    const saveIcon = (
      <div className="saveIconWrapper">
          <a download="lists.js" href={this.props.fileLink} target="blank"><i className="fas fa-cloud-download-alt"></i></a>
      </div>
    );

    const copyrighth = (
      <span>© 2019 LtCodename, Inc.</span>
    );

    return (
      <div className="footerWrapper">
        {saveIcon}
        {copyrighth}
        {shareIcons}
      </div>
    )
  }
}

export default Footer;
