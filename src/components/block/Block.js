import React from 'react';
import BlockModalWindow from '../block-modal-window/BlockModalWindow.js';
import './Block.css';
import * as moment from 'moment';
import { connect } from 'react-redux'
declare var $;

class Block extends React.Component {

  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
    this.resetState = this.resetState.bind(this);
    this.openModalWindow = this.openModalWindow.bind(this);

    this.state = {
      showModalWindow: false
    };
  }

  componentWillUnmount() {
    $("#bModal" + this.props.allLists[this.props.listIndex].content[this.props.sectionIndex].games[this.props.blockIndex].id + this.props.sectionIndex).unbind('hidden.bs.modal');
  }

  resetState() {
    this.setState({
      showModalWindow: false
    })
  }

  openModalWindow() {
    this.setState({
      showModalWindow: true
    }, () => {
      $("#bModal" + this.props.allLists[this.props.listIndex].content[this.props.sectionIndex].games[this.props.blockIndex].id + this.props.sectionIndex).modal('show');
      $("#bModal" + this.props.allLists[this.props.listIndex].content[this.props.sectionIndex].games[this.props.blockIndex].id + this.props.sectionIndex).on('hidden.bs.modal', this.resetState);
    });
  }

  closeModal() {
    $("#bModal" + this.props.allLists[this.props.listIndex].content[this.props.sectionIndex].games[this.props.blockIndex].id + this.props.sectionIndex).modal('hide');
  }

  render() {
    let className = 'gameBlock gameBlock_';
    let color = this.props.allLists[this.props.listIndex].content[this.props.sectionIndex].color;

    if (color) {
      className += color;
    }

    const platformsToShow = (this.props.allLists[this.props.listIndex].content[this.props.sectionIndex].games[this.props.blockIndex].hasOwnProperty('platforms')) ? (
      this.props.allLists[this.props.listIndex].content[this.props.sectionIndex].games[this.props.blockIndex].platforms.map((elem, index) => {
        const iconClassName = `${elem.iconName}`;
        return (<i key={index} className={iconClassName}></i>);
      })) : [];

    const platfotmsOnBlock = (
      <div className="platformsBlock">
        {platformsToShow}
      </div>
    );

    const dateToShow = (this.props.allLists[this.props.listIndex].content[this.props.sectionIndex].games[this.props.blockIndex].releaseDate ? <span className="releaseDate">{moment(this.props.allLists[this.props.listIndex].content[this.props.sectionIndex].games[this.props.blockIndex].releaseDate).format('DD-MM-YYYY')}</span> : "");

    const modalWindow = (
      <BlockModalWindow
        modalId={"bModal" + this.props.allLists[this.props.listIndex].content[this.props.sectionIndex].games[this.props.blockIndex].id + this.props.sectionIndex}
        
        gameData={this.props.allLists[this.props.listIndex].content[this.props.sectionIndex].games[this.props.blockIndex]}
        sectionIndex={this.props.sectionIndex}
        blockIndex={this.props.blockIndex}
        fullMode={true}
        closeModal={this.closeModal}/>
    );

    return (
      <div className="cardWrapper">
        <button className={className} data-toggle="modal" onClick={this.openModalWindow}>
          <div className="gameBlockContent">
            <span className="gameName">{this.props.allLists[this.props.listIndex].content[this.props.sectionIndex].games[this.props.blockIndex].name}</span>
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
    allLists: state.lists,
    listIndex: state.selectedListIndex
  }
};

const BlockConnected = connect(stateToProps, null)(Block);

export default BlockConnected;
