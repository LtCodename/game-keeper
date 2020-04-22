import React from 'react';
import './Footer.css';
import AlertModalWindow from '../alert-modal-window/AlertModalWindow.js';
import LogInModalWindow from "../log-in-modal-window/LogInModalWindow";
import {TrelloIcon, TwitterIcon, VersionIcon} from "../../IconsLibrary";

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
    });
  };

  closeAlertModal = () => {
    this.setState({
      showAlertWindow: false
    });
  };

  render() {
    const rightIcons = (
      <div>
          <a
              className="right-a"
              href="https://twitter.com/LtCodename"
              target="blank">
              {TwitterIcon}
          </a>
      </div>
    );

    const leftIcons = (
      <div>
          <a
              className="left-a version-a"
              onClick={this.onVersionClick}>
            {VersionIcon}
          </a>
          <a
              className="left-a"
              href="https://trello.com/b/GT6AY0oi/game-keeper-roadmap"
              target="blank">
            {TrelloIcon}
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
        message={`Version: 0.55. Release date: Apr 10, 2020.`}
        show={this.state.showAlertWindow}
        hideWindow={this.closeAlertModal.bind(this)}/>
    );

    return (
      <div>
        <div className="footerWrapper">
          {leftIcons}
          {copyright}
          {rightIcons}
        </div>
        {alertWindow}
      </div>
    )
  }
}

export default Footer;
