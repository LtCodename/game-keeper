import React from 'react';
import Block from '../block/Block.js';
import Colors from '../colors/Colors.js';
import './Section.css';
import WarningModalWindow from '../warning-modal-window/WarningModalWindow.js';
import BlockModalWindow from '../block-modal-window/BlockModalWindow.js';
declare var $;

class Section extends React.Component {
  static defaultProps = {
    games: []
  }

  constructor(props) {
    super(props);

    this.doOnEdit = this.doOnEdit.bind(this);
    this.sectionInputValueChange = this.sectionInputValueChange.bind(this);
    this.doOnSubmit = this.doOnSubmit.bind(this);
    this.doOnCancel = this.doOnCancel.bind(this);
    this.doOnGameAdd = this.doOnGameAdd.bind(this);
    this.openModalWarningWindow = this.openModalWarningWindow.bind(this);
    this.resetState = this.resetState.bind(this);
    this.openAddGameWindow = this.openAddGameWindow.bind(this);
    this.modalSave = this.modalSave.bind(this);

    this.state = {
      editMode: false,
      addGameMode: false,
      sectionInputValue: this.props.sectionName,
      showModalWindow: false,
      showAddGameWindow: false
    };
  }

  modalSave(data) {
    this.props.addNewGame(data);
    this.closeAddGameModal();
  }

  closeAddGameModal() {
    $("#addGame").modal('hide');
  }

  openModalWarningWindow() {
    this.setState({
      showModalWindow: true
    }, () => {
      $("#modalWarning").modal('show');
      $("#modalWarning").on('hidden.bs.modal', this.resetState);
    });
  }

  openAddGameWindow() {
    this.setState({
      showAddGameWindow: true
    }, () => {
      $("#addGame").modal('show');
      $("#addGame").on('hidden.bs.modal', this.resetState);
    });
  }

  componentWillUnmount() {
    $("#modalWarning").unbind('hidden.bs.modal');
    $("#addGame").unbind('hidden.bs.modal');
  }

  resetState() {
    this.setState({
      showModalWindow: false,
      showAddGameWindow: false
    })
  }

  doOnEdit() {
    if (!this.state.editMode) {
      this.setState({
        editMode: true,
        sectionInputValue: this.props.sectionName
      });
    }
  }

  sectionInputValueChange(event) {
    this.setState({
      sectionInputValue: event.target.value
    });
  }

  doOnSubmit() {
    this.props.doOnSectionRename(this.state.sectionInputValue);
    this.setState({
      editMode: false
    });
  }

  doOnGameAdd() {
    if(this.state.gameInputValue) {
      this.props.addNewGame(this.state.gameInputValue);
    }

    this.setState({
      addGameMode: false
    });
  }

  doOnCancel() {
    this.setState({
      editMode: false,
      addGameMode: false,
      gameInputValue: "",
      sectionInputValue: this.props.sectionName
    });
  }

  render() {
    const gamesToRender = this.props.games.map((elem, index) => {
      return <Block
        key={elem.id}
        color={this.props.color}
        onBlockDelete={() => this.props.onBlockDelete(index)}
        gameData={elem}
        saveBlock={(blockData) => this.props.saveBlock(blockData, index)}
        sectionId = {this.props.sectionId}
        content={this.props.content}
        changeGameSection={(newSectionIndex) => this.props.changeGameSection(newSectionIndex, index)}/>;
    }).sort((a, b) => {
      const releaseDateA = a.props.gameData.releaseDate || "";
      const releaseDateB = b.props.gameData.releaseDate || "";

      if (releaseDateA < releaseDateB) {
        return -1;
      }
      if (releaseDateA > releaseDateB) {
        return 1;
      }
      return 0;
    });

    const nameAndButtonsBlock = (
      <div className="nameAndButtonsWrapper">
        <h2>{this.props.sectionName}</h2>
        <div className="sectionActionButtons">
          <button className="btn" onClick={this.doOnEdit}><i className="fas fa-pen-square"></i></button>
          <button className="btn" onClick={this.openModalWarningWindow}><i className="fas fa-trash"></i></button>
          <button className="btn" onClick={this.openAddGameWindow}><i className="fas fa-plus-square"></i></button>
        </div>
      </div>
    );

    const editForm = (
        <div className="editSectionDiv">
          <input className="form-control editSectionInput" type="text" placeholder="Enter new name" value={this.state.sectionInputValue} onChange={this.sectionInputValueChange}></input>
          <button className="btn btn-dark" onClick={this.doOnSubmit}>OK</button>
          <button className="btn" onClick={this.doOnCancel}>Cancel</button>
          <Colors currentColor={this.props.color} passColorToSection={this.props.passColorUp}/>
        </div>
    );

    const modalWarningWindow = (
      <WarningModalWindow
        modalId={"modalWarning"}
        onProceed={this.props.doOnSectionDelete}
        message={`Are you sure you want to delete section ${this.props.sectionName}?`} />
    );

    const addGameWindow = (
      <BlockModalWindow
        modalId={"addGame"}
        gameData={{name:"New game"}}
        modalSave={this.modalSave}
        closeModal={this.closeAddGameModal}  />
    );

    return (
      <div className="section">
        {(this.state.editMode) ? editForm : nameAndButtonsBlock}
        <div className="inner-section">
          {gamesToRender}
        </div>

        {this.state.showModalWindow ? modalWarningWindow : ""}
        {this.state.showAddGameWindow ? addGameWindow : ""}
      </div>
    );
  }
}

export default Section;
