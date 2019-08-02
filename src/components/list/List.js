import React from 'react';
import Section from '../section/Section.js';
import Colors from '../colors/Colors.js';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.doOnEdit = this.doOnEdit.bind(this);
    this.doOnCancel = this.doOnCancel.bind(this);
    this.doOnSubmitListName = this.doOnSubmitListName.bind(this);
    this.doOnAddSection = this.doOnAddSection.bind(this);
    this.listNameInputValueChange = this.listNameInputValueChange.bind(this);
    this.sectionNameInputValueChange = this.sectionNameInputValueChange.bind(this);
    this.holdColorForNewSection = this.holdColorForNewSection.bind(this);

    this.state = {
      renameListMode: false,
      addSectionMode: false,
      listNameInputValue: this.props.listName,
      sectionNameInputValue: "",
      colorFofNewSection: ""
    };
  }

  static defaultProps = {
    content: [],
    newListName: ""
  }

  holdColorForNewSection(color) {
    this.setState({
      colorForNewSection: color
    });
  }

  componentWillReceiveProps(newProps){
    this.setState({
      renameListMode: false,
      addSectionMode: false,
      listNameInputValue: newProps.listName,
      sectionNameInputValue: ""
    });
  }

  doOnAddSection() {
    if (!this.state.addSectionMode) {
      this.setState({
        addSectionMode: true,
        listNameInputValue: ""
      });
    }
  }

  doOnEdit() {
    if (!this.state.renameListMode) {
      this.setState({
        renameListMode: true,
        listNameInputValue: this.props.listName
      });
    }
  }

  doOnCancel() {
    this.setState({
      renameListMode: false,
      addSectionMode: false,
      listNameInputValue: this.props.listName,
      sectionNameInputValue: ""
    });
  }

  doOnSubmitListName() {
    this.props.doOnListRename(this.state.listNameInputValue);
    this.setState({
      renameListMode: false
    });
  }

  listNameInputValueChange(event) {
    this.setState({
      listNameInputValue: event.target.value
    });
  }

  sectionNameInputValueChange(event) {
    this.setState({
      sectionNameInputValue: event.target.value
    });
  }

  render() {
    let sectionsToRender = this.props.content.map((elem, index) => {
      return (
        <Section
          key={elem.id}
          sectionName={elem.name}
          color={elem.color}
          passColorUp={(newColor) => this.props.doOnColorChange(index, newColor)}
          doOnSectionRename={(newSectionName) => this.props.doOnSectionRename(newSectionName, index)}
          addNewGame={(gameName) => this.props.doOnAddGame(gameName, index)}
          doOnSectionDelete={() => this.props.doOnSectionDelete(index)}
          games={elem.games} />);
    })

    const nameAndButtonsBlock = (
      <div>
        <h1>{this.props.listName}</h1>
        <div className="actionButtons">
          <button onClick={this.doOnEdit}>Edit name</button>
          <button onClick={this.props.doOnDelete}>Delete list</button>
          <button onClick={this.doOnAddSection}>Add section</button>
        </div>
      </div>
    );

    const editListNameForm = (
      <div>
        <input type="text" placeholder="Enter new name" value={this.state.listNameInputValue} onChange={this.listNameInputValueChange}></input>
        <button className="submitButtons" onClick={this.doOnSubmitListName}>Submit name</button>
        <button className="submitButtons" onClick={this.doOnCancel}>Cancel</button>
      </div>
    );

    const addNewSectionForm = (
      <div>
        <input type="text" placeholder="Enter section name" value={this.state.sectionNameInputValue} onChange={this.sectionNameInputValueChange}></input>
        <button className="submitButtons" onClick={() => this.props.doOnAddSection(this.state.sectionNameInputValue, this.state.colorForNewSection)}>Submit section</button>
        <button className="submitButtons" onClick={this.doOnCancel}>Cancel</button>
        <Colors passColorToSection={this.holdColorForNewSection}/><br />
      </div>
    );

    return (
      <div className="all-content">
        {this.state.renameListMode ? editListNameForm : this.state.addSectionMode ? addNewSectionForm : nameAndButtonsBlock}
        {sectionsToRender}
      </div>
    );
  }
}

export default List;
