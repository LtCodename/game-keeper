import React from 'react';
import Block from '../block/Block.js';
import Colors from '../colors/Colors.js';
import WarningModalWindow from '../warning-modal-window/WarningModalWindow.js';
declare var  $;

class Section extends React.Component {
  static defaultProps = {
    games: []
  }

  constructor(props) {
    super(props);

    this.doOnEdit = this.doOnEdit.bind(this);
    this.inputValueChange = this.inputValueChange.bind(this);
    this.gameInputValueChange = this.gameInputValueChange.bind(this);
    this.doOnSubmit = this.doOnSubmit.bind(this);
    this.doOnCancel = this.doOnCancel.bind(this);
    this.beforeAddGame = this.beforeAddGame.bind(this);
    this.doOnGameAdd = this.doOnGameAdd.bind(this);
    this.openModalWarningWindow = this.openModalWarningWindow.bind(this);
    this.resetState = this.resetState.bind(this);

    this.state = {
      editMode: false,
      addGameMode: false,
      inputValue: this.props.sectionName,
      gameInputValue: "",
      showModalWindow: false
    };
  }

  openModalWarningWindow() {
    this.setState({
      showModalWindow: true
    }, () => {
      $("#modalWarning").modal('show');
      $("#modalWarning").on('hidden.bs.modal', this.resetState);
    });
  }

  componentWillUnmount() {
    $("#modalWarning").unbind('hidden.bs.modal');
  }

  resetState() {
    this.setState({
      showModalWindow: false
    })
  }

  beforeAddGame() {
    if (!this.state.addGameMode) {
      this.setState({
        addGameMode: true,
        gameInputValue: ""
      });
    }
  }

  doOnEdit() {
    if (!this.state.editMode) {
      this.setState({
        editMode: true
      });
    }
  }

  inputValueChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  gameInputValueChange(event) {
    this.setState({
      gameInputValue: event.target.value
    });
  }

  doOnSubmit() {
    this.props.doOnSectionRename(this.state.inputValue);
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
      inputValue: this.props.sectionName
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

    const nameBlock = (
      <div>
        <h2>{this.props.sectionName}</h2>
        <div className="actionButtons">
          <button className="btn" onClick={this.doOnEdit}>Edit section</button>
          <button className="btn" onClick={this.openModalWarningWindow}>Delete section</button>
        </div>
      </div>
    );

    const editForm = (
        <div>
          <input className="form-control" type="text" placeholder="Enter new name" value={this.state.inputValue} onChange={this.inputValueChange}></input>
          <button className="btn btn-dark" onClick={this.doOnSubmit}>Submit name</button>
          <button className="btn" onClick={this.doOnCancel}>Cancel</button>
          <Colors currentColor={this.props.color} passColorToSection={this.props.passColorUp}/>
        </div>
    );

    const addGameBlock = (
      <div>
        <input className="form-control" type="text" placeholder="Enter game name" value={this.state.gameInputValue} onChange={this.gameInputValueChange}></input>
        <button className="btn btn-dark" onClick={this.doOnGameAdd}>Submit game</button>
        <button className="btn" onClick={this.doOnCancel}>Cancel</button>
      </div>
    );

    const addGameButton = (
      <button className="btn" onClick={this.beforeAddGame}><p>+</p></button>
    );

    const modalWarningWindow = (
      <WarningModalWindow
        modalId={"modalWarning"}
        onProceed={this.props.doOnSectionDelete}
        message={`Are you sure you want to delete section ${this.props.sectionName}?`} />
    );

    return (
      <div className="section">
        {(this.state.editMode) ? editForm : nameBlock}
        <div className="inner-section">
          {gamesToRender}
          {(this.state.addGameMode) ? addGameBlock : addGameButton}
        </div>

        {this.state.showModalWindow ? modalWarningWindow : ""}
      </div>
    );
  }
}

export default Section;
