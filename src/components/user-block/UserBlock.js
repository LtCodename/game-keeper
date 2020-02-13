import React from 'react';
import BlockModalWindow from '../block-modal-window/BlockModalWindow.js';
import './UserBlock.css';
import * as moment from 'moment';
import { connect } from 'react-redux'
declare var $;

class UserBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModalWindow: false
    };
  }

  componentWillUnmount() {
    $("#blockModalWindow").unbind('hidden.bs.modal');
  }

  resetState = () => {
    this.setState({
      showModalWindow: false
    })
  };

  openModalWindow = () => {
    this.setState({
      showModalWindow: true
    }, () => {
      $("#blockModalWindow").modal('show');
      $("#blockModalWindow").on('hidden.bs.modal', this.resetState);
    });
  };

  closeModal = () => {
    $("#blockModalWindow").modal('hide');
  };

  render() {
    let className = 'gameBlock gameBlock_';
    let color = this.props.color;

    if (color) {
      className += color;
    }

    const platformsToShow = (this.props.gameData.hasOwnProperty('platforms')) ? (
      this.props.gameData.platforms.map((elem, index) => {
        const path = `${elem.iconName}`;
        let fullPath = '/icons/' + path + '.svg';
        return (<img key={index} className="platformIcon" alt="" src={process.env.PUBLIC_URL + fullPath}/>);
      })) : [];

    const platfotmsOnBlock = (
      <div className="platformsBlock">
        {platformsToShow}
      </div>
    );

    const dateToShow = (
        this.props.gameData.releaseDate ? <span
            className="releaseDate">
          {moment(this.props.gameData.releaseDate).format('DD-MM-YYYY')}
        </span> : ""
    );

    const modalWindow = (
      <BlockModalWindow
        modalId={"blockModalWindow"}
        gameData={this.props.gameData}
        fullMode={true}
        listId={this.props.listId}
        sectionId={this.props.sectionId}
        closeModal={this.closeModal}/>
    );

    return (
      <div className="cardWrapper">
        <button className={className} data-toggle="modal" onClick={this.openModalWindow}>
          <div className="gameBlockContent">
            <span className="gameName">{this.props.gameData.name}</span>
            <div className="gameBlockFooter">
              {dateToShow}
              {platfotmsOnBlock}
            </div>
          </div>
        </button>

        {this.state.showModalWindow ? modalWindow : ""}
      </div>
    )
  }
}

const stateToProps = (state = {}) => {
  return {
    userBlocks: state.userBlocks
  }
};

const UserBlockConnected = connect(stateToProps, null)(UserBlock);

export default UserBlockConnected;
