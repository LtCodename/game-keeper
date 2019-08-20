import React from 'react';
import './App.css';
import List from './components/list/List.js';
import Nav from './components/nav/Nav.js';
import Dashboard from './components/dashboard/Dashboard.js';
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
    this.changeColor = this.changeColor.bind(this);
    this.addSection = this.addSection.bind(this);
    this.rewriteLists = this.rewriteLists.bind(this);
    this.addGame = this.addGame.bind(this);
    this.onBlockDelete = this.onBlockDelete.bind(this);
    this.onBlockSave = this.onBlockSave.bind(this);
    this.onChangeGameSection = this.onChangeGameSection.bind(this);
    this.onChangeListPosition = this.onChangeListPosition.bind(this);

    this.state = {
      lists: lists,
      selectedListIndex: 0,
      downloadLink: this.createBlob(lists)
    };
  }

  onChangeListPosition(newListPosition, oldListPosition) {
    const copy = this.deepCopy(this.state.lists);
    console.log(`old list position is ${oldListPosition} and new list position is ${newListPosition}`)

    console.log(copy)
    let spliced = copy.splice(oldListPosition, 1);
    console.log(spliced)

    if (newListPosition < oldListPosition) {
      copy.splice(newListPosition, 0, spliced[0]);
    }

    if (newListPosition > oldListPosition) {
      copy.splice(newListPosition - 1, 0, spliced[0]);
    }

    this.setState({
      selectedListIndex: newListPosition
    });
    this.rewriteLists(copy);
  }

  createBlob(lists, oldLink) {
    const stringified = JSON.stringify(lists);
    const fileStructure = `const lists = ${stringified}; export default lists;`
    const data = new Blob([fileStructure], {type: 'text/plain'});
    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (oldLink) {
      window.URL.revokeObjectURL(oldLink);
    }
    return window.URL.createObjectURL(data);
  }

  onChangeGameSection(newSectionIndex, blockIndex, oldSectionIndex, listIndex) {
    const copy = this.deepCopy(this.state.lists);

    copy[listIndex].content[newSectionIndex].games.push(copy[listIndex].content[oldSectionIndex].games[blockIndex]);
    copy[listIndex].content[oldSectionIndex].games.splice(blockIndex, 1);

    this.rewriteLists(copy);
  }

  changeColor(listIndex, sectionIndex, newColor) {
    const copy = this.deepCopy(this.state.lists);
    copy[listIndex].content[sectionIndex].color = newColor;

    this.rewriteLists(copy);
  }

  onBlockSave(blockData, blockId, sectionId, listId) {
    const copy = this.deepCopy(this.state.lists);
    copy[listId].content[sectionId].games[blockId] = blockData;
    this.rewriteLists(copy);
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

    this.rewriteLists(copy);
  }

  renameSection(newName, sectionId, listId) {
    const copy = this.deepCopy(this.state.lists);
    copy[listId].content[sectionId].name = newName;

    this.rewriteLists(copy);
  }

  addGame(data, section, list) {
    const copy = this.deepCopy(this.state.lists);
    const uniqueIndex = `id${new Date().getTime()}`;

    copy[list].content[section].games.push({
      id: `${uniqueIndex}`,
      ...data
    });

    this.rewriteLists(copy);
  }

  deleteSection(listIndex, sectionIndex) {
    const copy = this.deepCopy(this.state.lists);
    copy[listIndex].content.splice(sectionIndex, 1);

    this.rewriteLists(copy);
  }

  deleteList(index) {
    let newIndex = 0;

    if (this.state.lists.length === 1) {
      newIndex = null;
    }

    const copy = this.deepCopy(this.state.lists);
    copy.splice(index, 1);

    this.setState({
      lists: copy,
      selectedListIndex: newIndex
    });
  }

  addSection(sectionName, sectionColor, listIndex) {
    const copy = this.deepCopy(this.state.lists);

    copy[listIndex].content.push({
      id: copy[listIndex].content.length + 1,
      name: sectionName,
      color: sectionColor,
      games: []
    });

    this.rewriteLists(copy);
  }

  rewriteLists(newData) {
    this.setState({
      lists: newData,
      downloadLink: this.createBlob(newData, this.state.downloadLink)
    });
  }

  addList(listName) {
    if (!listName) {
      return;
    }

    const copy = this.deepCopy(this.state.lists);

    copy.push({
      id: copy.length + 1,
      name: listName,
      content: []
    });

    this.rewriteLists(copy);
  }

  onBlockDelete(blockIndex, sectionIndex, listIndex) {
    const copy = this.deepCopy(this.state.lists);

    copy[listIndex].content[sectionIndex].games.splice(blockIndex, 1);

    this.rewriteLists(copy);
  }

  deepCopy(objectToCopy) {
    return JSON.parse(JSON.stringify(objectToCopy));
  }

  render() {
    const dashboard = (
      <Dashboard
        data={this.state.lists}
        doOnAdd={(listName => this.addList(listName))}
        listBlockClick={(index) => this.changeSelectedListIndex(index)}/>
    );

    let listOrDashboard;

    if (this.state.selectedListIndex === null) {
      listOrDashboard = dashboard;
    }else {
      listOrDashboard = <List
        listName={this.state.lists[this.state.selectedListIndex].name}
        content={this.state.lists[this.state.selectedListIndex].content}
        allLists={this.state.lists}
        doOnListRename={this.renameList}
        doOnAddSection={(sectionName, sectionColor) => this.addSection(sectionName, sectionColor, this.state.selectedListIndex)}
        doOnSectionRename={(newSectionName, sectionIndex) => this.renameSection(newSectionName, sectionIndex, this.state.selectedListIndex)}
        doOnAddGame={(gameName, sectionIndex) => this.addGame(gameName, sectionIndex, this.state.selectedListIndex)}
        doOnSectionDelete={(sectionIndex) => this.deleteSection(this.state.selectedListIndex, sectionIndex)}
        doOnColorChange={(sectionIndex, newColor) => this.changeColor(this.state.selectedListIndex, sectionIndex, newColor)}
        onBlockDelete={(blockId, sectionId) => this.onBlockDelete(blockId, sectionId, this.state.selectedListIndex)}
        doOnDelete={() => this.deleteList(this.state.selectedListIndex)}
        listIndex={this.state.selectedListIndex}
        saveBlock={(blockData, blockId, sectionId) => this.onBlockSave(blockData, blockId, sectionId, this.state.selectedListIndex)}
        changeListPosition={(newListPosition, oldListPosition) => this.onChangeListPosition(newListPosition, oldListPosition)}
        changeGameSection={(newSectionIndex, blockIndex, oldSectionIndex) => this.onChangeGameSection(newSectionIndex, blockIndex, oldSectionIndex, this.state.selectedListIndex)}/>
    }

    const nav = (
      <Nav
        content={this.state.lists}
        indexToHighligth={this.state.selectedListIndex}
        doOnClick={this.changeSelectedListIndex}
        doOnAdd={this.addList}
        fileLink={this.state.downloadLink}/>
    );

    return (
      <div className="appDiv">
          {(this.state.selectedListIndex === null) ? "" : nav}
          {listOrDashboard}
      </div>
    );
  }
}

export default App;
