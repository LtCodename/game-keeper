import React from 'react';
import Block from '../block/Block.js';
import Colors from '../colors/Colors.js';

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

    this.state = {
      editMode: false,
      addGameMode: false,
      inputValue: this.props.sectionName,
      gameInputValue: ""
    };
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
        sectionId = {this.props.sectionId}/>;
    });


    console.log(gamesToRender);

    const nameBlock = (
      <div>
        <h2>{this.props.sectionName}</h2>
        <div className="actionButtons">
          <button onClick={this.doOnEdit}>Edit</button>
          <button onClick={this.props.doOnSectionDelete}>Delete section</button>
        </div>
      </div>
    );

    const editForm = (
        <div>
          <input type="text" placeholder="Enter new name" value={this.state.inputValue} onChange={this.inputValueChange}></input>
          <button className="submitButtons" onClick={this.doOnSubmit}>Submit name</button>
          <button className="submitButtons" onClick={this.doOnCancel}>Cancel</button>
          <Colors currentColor={this.props.color} passColorToSection={this.props.passColorUp}/>
        </div>
    );

    const addGameBlock = (
      <div>
        <input type="text" placeholder="Enter game name" value={this.state.gameInputValue} onChange={this.gameInputValueChange}></input>
        <button className="submitButtons" onClick={this.doOnGameAdd}>Add game</button>
        <button className="submitButtons" onClick={this.doOnCancel}>Cancel</button>
      </div>
    );

    const addGameButton = (
      <button onClick={this.beforeAddGame}><p>+</p></button>
    );

    return (
      <div className="section">
        {(this.state.editMode) ? editForm : nameBlock}
        <div className="inner-section">
          {gamesToRender}
            {(this.state.addGameMode) ? addGameBlock : addGameButton}
        </div>
      </div>
    );
  }
}

export default Section;
