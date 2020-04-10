import React from 'react';
import './Footer.css';
import AlertModalWindow from '../alert-modal-window/AlertModalWindow.js';
declare var $;

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlertWindow: false,
    };
  }

  onVersionClick = () => {
    this.setState({
      showAlertWindow: true
    }, () => {
      $("#versionAlert").modal('show');
      $("#versionAlert").on('hidden.bs.modal', this.resetState);
    });
  };

  resetState = () => {
    this.setState({
      showAlertWindow: false
    })
  };

  componentWillUnmount() {
    $("#versionAlert").unbind('hidden.bs.modal');
  }

  render() {
    const rightIcons = (
      <div>
          <a
              className="right-a"
              href="https://twitter.com/LtCodename"
              target="blank">
            <img
              className="icon" alt="" src={process.env.PUBLIC_URL + '/icons/share-twitter.svg'}/>
          </a>
      </div>
    );

    const leftIcons = (
      <div>
          <a
              className="left-a version-a"
              onClick={this.onVersionClick}>
            <img className="icon" alt="" src={process.env.PUBLIC_URL + '/icons/version.svg'}/>
          </a>
          <a
              className="left-a"
              href="https://trello.com/b/GT6AY0oi/game-keeper-roadmap"
              target="blank">
            <img className="icon" alt="" src={process.env.PUBLIC_URL + '/icons/share-trello.svg'}/>
          </a>
      </div>
    );

    const copyright = (
      <a className="copyright"
         href="https://ltcodename.com/"
         target="blank">
        LtCodename
      </a>
    );

    const alertWindow = (
      <AlertModalWindow
        title={`Game Keeper Alpha`}
        message={`Version: 0.45. Release date: Apr 9, 2020.`}/>
    );

    return (
      <div>
        <div className="footerWrapper">
          {leftIcons}
          {copyright}
          {rightIcons}
        </div>
        {this.state.showAlertWindow ? alertWindow : ""}
      </div>
    )
  }
}

export default Footer;
