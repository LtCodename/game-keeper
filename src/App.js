import React from 'react';
import './App.css';
import List from './components/list/List.js';
import Nav from './components/nav/Nav.js';
import lists from './mocks/lists.js';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.changeSelectedListIndex = this.changeSelectedListIndex.bind(this);
    this.renameList = this.renameList.bind(this);
    this.renameSection= this.renameSection.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.addList = this.addList.bind(this);
    this.deleteSection = this.deleteSection.bind(this);

    this.state = {
      selectedListIndex: 0,
      lists: lists
    };
  }

  changeSelectedListIndex(newIndex) {
    if (this.state.selectedListIndex !== newIndex && newIndex >= 0 && newIndex < this.state.lists.length) {
      this.setState({
        selectedListIndex: newIndex
      });
    }
  }

  renameList(newName) {
    const copy = this.deepCopy(this.state.lists);
    copy[this.state.selectedListIndex].name = newName;

    this.setState({
      lists: copy
    });
  }

  renameSection(newName, sectionId, listId) {
    const copy = this.deepCopy(this.state.lists);
    copy[listId].content[sectionId].name = newName;

    this.setState({
      lists: copy
    });
  }

  deleteSection(listIndex, sectionIndex) {
    const copy = this.deepCopy(this.state.lists);
    copy[listIndex].content.splice(sectionIndex, 1);

    this.setState({
      lists: copy
    });
  }

  deleteList(index) {
    if (this.state.lists.length === 1) {
      console.log("DO NOT DELETE LAST ITEM IN THE ARRAY!");
      return;
    }

    const copy = this.deepCopy(this.state.lists);
    copy.splice(index, 1);

    this.setState({
      lists: copy,
      selectedListIndex: 0
    });
  }

  addList(listName) {
    const copy = this.deepCopy(this.state.lists);

    copy.push({
      id: copy.length + 1,
      name: listName,
      content: []
    });

    this.setState({
      lists: copy
    });
  }

  deepCopy(objectToCopy) {
    return JSON.parse(JSON.stringify(objectToCopy));
  }

  render() {
    return (
      <div className="appDiv">
        <Nav
          content={this.state.lists}
          indexToHighligth={this.state.selectedListIndex}
          doOnClick={this.changeSelectedListIndex}
          doOnAdd={this.addList}/>
        <List
          listName={this.state.lists[this.state.selectedListIndex].name}
          content={this.state.lists[this.state.selectedListIndex].content}
          doOnListRename={this.renameList}
          doOnSectionRename={(newSectionName, sectionIndex) => this.renameSection(newSectionName, sectionIndex, this.state.selectedListIndex)}
          doOnSectionDelete={(sectionIndex) => this.deleteSection(this.state.selectedListIndex, sectionIndex)}
          doOnDelete={() => this.deleteList(this.state.selectedListIndex)}/>
      </div>
    );
  }
}

export default App;
