import React from 'react';
import './Footer.css';
import { connect } from 'react-redux'

class Footer extends React.Component {

  constructor(props) {
    super(props);

    this.onSaveLists = this.onSaveLists.bind(this);
    this.onSaveDevelopers = this.onSaveDevelopers.bind(this);

    this.state = {
      listsUrl: null,
      developersUrl: null
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

  onSaveDevelopers() {
    const stringified = JSON.stringify(this.props.developers);
    const fileStructure = `const developers = ${stringified}; export default developers;`
    const data = new Blob([fileStructure], {type: 'text/plain'});
    if (this.state.developersUrl) {
      window.URL.revokeObjectURL(this.state.developersUrl);
    }
    this.setState({
      developersUrl: window.URL.createObjectURL(data)
    }, () => {
      let a = document.createElement('a');
      a.href = this.state.developersUrl;
      a.download = "developers.js";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  render() {
    const shareIcons = (
      <div className="shareIconsWrapper">
          <a className="shareIcons-a" href="https://github.com/LtCodename/Game-Keeper" target="blank"><img className="shareIcon" alt="" src={process.env.PUBLIC_URL + '/icons/share-github.svg'}></img></a>
          <a className="shareIcons-a" href="https://twitter.com/LtCodename" target="blank"><img className="shareIcon" alt="" src={process.env.PUBLIC_URL + '/icons/share-twitter.svg'}></img></a>
      </div>
    );

    const saveListsIcon = (
      <div className="saveIconsWrapper">
          <button type="button" className="btn saveButton" onClick={this.onSaveLists}><img className="saveIcon" alt="" src={process.env.PUBLIC_URL + '/icons/save-lists.svg'}></img></button>
          <button type="button" className="btn saveButton" onClick={this.onSaveDevelopers}><img className="saveIcon" alt="" src={process.env.PUBLIC_URL + '/icons/save-developers.svg'}></img></button>
      </div>
    );

    const copyrighth = (
      <span>© 2019 LtCodename, Inc.</span>
    );

    return (
      <div className="footerWrapper">
        {saveListsIcon}
        {copyrighth}
        {shareIcons}
      </div>
    )
  }
}


const stateToProps = (state = {}) => {
  return {
    lists: state.lists,
    developers: state.developers
  }
};

const FooterConnected = connect(stateToProps, null)(Footer);

export default FooterConnected;
