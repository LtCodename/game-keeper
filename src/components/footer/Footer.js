import React from 'react';
import './Footer.css';
import { connect } from 'react-redux'
import AlertModalWindow from '../alert-modal-window/AlertModalWindow.js';
declare var $;

class Footer extends React.Component {

  constructor(props) {
    super(props);

    this.onSaveLists = this.onSaveLists.bind(this);
    this.onVersionClick = this.onVersionClick.bind(this);
    this.resetState = this.resetState.bind(this);

    this.state = {
      listsUrl: null,
      showAlertWindow: false,
    };
  }

  onSaveLists() {
    const stringified = JSON.stringify(this.props.lists);
    const fileStructure = `const lists = ${stringified}; export default lists;`
    const data = new Blob([fileStructure], {type: 'text/plain'});
    if (this.state.listsUrl) {
      window.URL.revokeObjectURL(this.state.listsUrl);
    }
    this.setState({
      listsUrl: window.URL.createObjectURL(data)
    }, () => {
      let a = document.createElement('a');
      a.href = this.state.listsUrl;
      a.download = "lists.js";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  onVersionClick() {
    this.setState({
      showAlertWindow: true
    }, () => {
      $("#versionAlert").modal('show');
      $("#versionAlert").on('hidden.bs.modal', this.resetState);
    });
  }

  resetState() {
    this.setState({
      showAlertWindow: false
    })
  }

  componentWillUnmount() {
    $("#versionAlert").unbind('hidden.bs.modal');
  }

  render() {
    const shareIcons = (
      <div className="shareIconsWrapper">
          <a className="shareIcons-a" href="https://www.linkedin.com/in/yevhen-chernenko/" target="blank"><img className="shareIcon" alt="" src={process.env.PUBLIC_URL + '/icons/share-linkedin.svg'}></img></a>
          <a className="shareIcons-a" href="https://twitter.com/LtCodename" target="blank"><img className="shareIcon" alt="" src={process.env.PUBLIC_URL + '/icons/share-twitter.svg'}></img></a>
      </div>
    );

    const saveListsIcon = (
      <div className="saveIconsWrapper">
          <button type="button" className="btn saveButton" onClick={this.onSaveLists}><img className="saveIcon" alt="" src={process.env.PUBLIC_URL + '/icons/save-lists.svg'}></img></button>
          <button type="button" className="btn saveButton" onClick={this.onVersionClick}><img className="saveIcon" alt="" src={process.env.PUBLIC_URL + '/icons/version.svg'}></img></button>
      </div>
    );

    const copyrighth = (
      <span>© 2019 Yevhen Chernenko</span>
    );

    const alertWindow = (
      <AlertModalWindow
        title={`Game Keeper Alpha`}
        message={`Version: 0.002a. Release date: 18.09.19`}/>
    );

    return (
      <div className="footerWrapper">
        {saveListsIcon}
        {copyrighth}
        {shareIcons}
        {this.state.showAlertWindow ? alertWindow : ""}
      </div>
    )
  }
}

const stateToProps = (state = {}) => {
  return {
    lists: state.lists
  }
};

const FooterConnected = connect(stateToProps, null)(Footer);

export default FooterConnected;
