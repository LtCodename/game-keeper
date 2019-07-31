import React from 'react';
import Section from '../section/Section.js';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.doOnEdit = this.doOnEdit.bind(this);
    this.doOnCancel = this.doOnCancel.bind(this);
    this.doOnSubmitListName = this.doOnSubmitListName.bind(this);
    this.doOnAddSection = this.doOnAddSection.bind(this);
    this.doOnSubmitSection = this.doOnSubmitSection.bind(this);
    this.listNameInputValueChange = this.listNameInputValueChange.bind(this);
    this.sectionNameInputValueChange = this.sectionNameInputValueChange.bind(this);

    this.state = {
      renameListMode: false,
      addSectionMode: false,
      listNameInputValue: this.props.listName,
      sectionNameInputValue: ""
    };
  }

  static defaultProps = {
    content: [],
    newListName: ""
  }

  componentWillReceiveProps(newProps){
    this.setState({
      renameListMode: false,
      listNameInputValue: newProps.listName
    });
  }

  doOnAddSection() {
    console.log("I want to add section mate");

    if (!this.state.addSectionMode) {
      this.setState({
        addSectionMode: true,
        listNameInputValue: ""
      });
    }
  }

  doOnSubmitSection() {
    console.log("I want to sumbit section mate");
  }

  doOnEdit() {
    //console.log("On Edit");

    if (!this.state.renameListMode) {
      this.setState({
        renameListMode: true,
        listNameInputValue: this.props.listName
      });
    }
  }

  doOnCancel() {
    //console.log("On Cancel");

    this.setState({
      renameListMode: false,
      addSectionMode: false,
      listNameInputValue: this.props.listName,
      sectionNameInputValue: ""
    });
  }

  doOnSubmitListName() {
    //console.log("On Submit");

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
        <button className="submitButtons" onClick={this.doOnSubmitSection}>Submit section</button>
        <button className="submitButtons" onClick={this.doOnCancel}>Cancel</button>
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
