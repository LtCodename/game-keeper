import React from 'react';
import Block from '../block/Block.js';
import Colors from '../colors/Colors.js';
import './Section.css';
import WarningModalWindow from '../warning-modal-window/WarningModalWindow.js';
import BlockModalWindow from '../block-modal-window/BlockModalWindow.js';
import reducers from '../../redux/reducers';
import { connect } from 'react-redux'
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
    this.openModalWarningWindow = this.openModalWarningWindow.bind(this);
    this.resetState = this.resetState.bind(this);
    this.openAddGameWindow = this.openAddGameWindow.bind(this);

    this.state = {
      editMode: false,
      sectionInputValue: this.props.sectionName,
      showModalWindow: false,
      showAddGameWindow: false
    };
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
    this.props.renameSection(this.props.listIndex, this.props.sectionIndex, this.state.sectionInputValue);
    this.setState({
      editMode: false
    });
  }

  doOnCancel() {
    this.setState({
      editMode: false,
      gameInputValue: "",
      sectionInputValue: this.props.sectionName
    });
  }

  render() {
    const gamesToRender = this.props.games.map((elem, index) => {
      return <Block
        key={elem.id}
        color={this.props.color}
        blockIndex={index}
        listIndex={this.props.listIndex}
        sectionIndex={this.props.sectionIndex}
        gameData={elem}
        developers={this.props.developers}
        sectionId = {this.props.sectionId}
        content={this.props.content}/>;
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
          <button className="btn" onClick={this.openAddGameWindow}><i className="fas fa-plus-square"></i></button>
          <button className="btn" onClick={this.openModalWarningWindow}><i className="fas fa-trash"></i></button>
        </div>
      </div>
    );

    const editForm = (
        <div className="editSectionDiv">
          <input className="form-control editSectionInput" type="text" placeholder="Enter new name" value={this.state.sectionInputValue} onChange={this.sectionInputValueChange}></input>
          <button className="btn btn-dark" onClick={this.doOnSubmit}>OK</button>
          <button className="btn" onClick={this.doOnCancel}>Cancel</button>
          <Colors currentColor={this.props.color}
                  listIndex={this.props.listIndex}
                  sectionIndex={this.props.sectionIndex}/>
        </div>
    );

    const modalWarningWindow = (
      <WarningModalWindow
        modalId={"modalWarning"}
        onProceed={() => this.props.sectionDelete(this.props.listIndex, this.props.sectionIndex)}
        message={`Are you sure you want to delete section ${this.props.sectionName}?`} />
    );

    const addGameWindow = (
      <BlockModalWindow
        modalId={"addGame"}
        gameData={{name:"New game"}}
        newGameMode={true}
        listIndex={this.props.listIndex}
        sectionIndex={this.props.sectionIndex}
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

const sectionDispatchToProps = (dispatch) => {
  return {
    renameSection: (listIndex, sectionIndex, sectionName) => {
      dispatch({ type: reducers.actions.listsActions.SECTION_RENAME, listIndex: listIndex, sectionIndex: sectionIndex, sectionName: sectionName });
    },
    sectionDelete: (listIndex, sectionIndex) => {
      dispatch({ type: reducers.actions.listsActions.SECTION_DELETE, listIndex: listIndex, sectionIndex: sectionIndex});
    }
  }
};

const ConnectedSection = connect(null, sectionDispatchToProps)(Section);

export default ConnectedSection;
