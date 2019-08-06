import React from 'react';
import BlockModalWindow from '../block-modal-window/BlockModalWindow.js';
import './Block.css';
declare var  $;

class Block extends React.Component {

  constructor(props) {
    super(props);

    this.modalSave = this.modalSave.bind(this);
    this.onDeleteBlock = this.onDeleteBlock.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.resetState = this.resetState.bind(this);
    this.openModalWindow = this.openModalWindow.bind(this);

    this.state = {
      showModalWindow: false
    };
  }

  modalSave(data) {
    this.props.saveBlock(data);
    this.closeModal();
  }

  onDeleteBlock() {
    this.props.onBlockDelete();
    this.closeModal();
  }

  componentWillUnmount() {
    $("#bModal" + this.props.gameData.id + this.props.sectionId).unbind('hidden.bs.modal');
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
      $("#bModal" + this.props.gameData.id + this.props.sectionId).modal('show');
      $("#bModal" + this.props.gameData.id + this.props.sectionId).on('hidden.bs.modal', this.resetState);
    });
  }

  closeModal() {
    $("#bModal" + this.props.gameData.id + this.props.sectionId).modal('hide');
  }

  render() {
    let className = 'game-block game-block_';

    if (this.props.color) {
      className += this.props.color;
    }

    const platformsToShow = (this.props.gameData.hasOwnProperty('platforms')) ? (
      this.props.gameData.platforms.map((elem, index) => {
        return (<img className="platforms" key={index}  src={elem.url} alt={elem.name} />);
      })) : [];

    const platfotmsOnBlock = (
      <div className="platformsBlock">
        {platformsToShow}
      </div>
    );

    const dateToShow = (this.props.gameData.releaseDate ? <span className="releaseDate">{this.props.gameData.releaseDate}</span> : "");

    const modalWindow = (
      <BlockModalWindow
        modalId={"bModal" + this.props.gameData.id + this.props.sectionId}
        gameData={this.props.gameData}
        onDeleteBlock={this.onDeleteBlock}
        modalSave={this.modalSave}
        sectionId={this.props.sectionId}
        content={this.props.content}
        changeGameSection={this.props.changeGameSection}
        closeModal = {this.closeModal} />
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

export default Block;
