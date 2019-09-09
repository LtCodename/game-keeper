import React from 'react';
import './App.css';
import List from './components/list/List.js';
import Nav from './components/nav/Nav.js';
import Footer from './components/footer/Footer.js';
import Header from './components/header/Header.js';
import Dashboard from './components/dashboard/Dashboard.js';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.changeSelectedListIndex = this.changeSelectedListIndex.bind(this);
    this.renameSection= this.renameSection.bind(this);
    this.deleteSection = this.deleteSection.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.rewriteLists = this.rewriteLists.bind(this);
    this.rewriteDevelopers = this.rewriteDevelopers.bind(this);
    this.addGame = this.addGame.bind(this);
    this.onBlockSave = this.onBlockSave.bind(this);

    this.state = {
      lists: this.props.lists,
      developers: this.props.developers,
      selectedListIndex: this.props.selectedListIndex,
      listsDownloadLink: this.createListsBlob(this.props.lists),
      developersDownloadLink: this.createDevelopersBlob(this.props.developers)
    };
  }

  createListsBlob(lists, oldLink) {
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

  createDevelopersBlob(lists, oldLink) {
    const stringified = JSON.stringify(lists);
    const fileStructure = `const developers = ${stringified}; export default developers;`
    const data = new Blob([fileStructure], {type: 'text/plain'});
    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (oldLink) {
      window.URL.revokeObjectURL(oldLink);
    }
    return window.URL.createObjectURL(data);
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
    if (this.state.selectedListIndex !== newIndex && newIndex >= 0 && newIndex < this.props.lists.length) {
      this.setState({
        selectedListIndex: newIndex
      });
    }
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

  rewriteLists(newData) {
    this.setState({
      lists: newData,
      listsDownloadLink: this.createListsBlob(newData, this.state.listsDownloadLink)
    });
  }

  rewriteDevelopers(newData) {
    this.setState({
      developers: newData,
      developersDownloadLink: this.createDevelopersBlob(newData, this.state.developersDownloadLink)
    });
  }

  deepCopy(objectToCopy) {
    return JSON.parse(JSON.stringify(objectToCopy));
  }

  render() {
    const dashboard = (
      <Dashboard
        data={this.props.lists}
        listBlockClick={(index) => this.changeSelectedListIndex(index)}/>
    );

    let listOrDashboard;

    if (this.state.selectedListIndex === null) {
      listOrDashboard = dashboard;
    }else {
      listOrDashboard = <List
        listName={this.props.lists[this.state.selectedListIndex].name}
        content={this.props.lists[this.state.selectedListIndex].content}
        doOnSectionRename={(newSectionName, sectionIndex) => this.renameSection(newSectionName, sectionIndex, this.state.selectedListIndex)}
        doOnAddGame={(gameName, sectionIndex) => this.addGame(gameName, sectionIndex, this.state.selectedListIndex)}
        doOnSectionDelete={(sectionIndex) => this.deleteSection(this.state.selectedListIndex, sectionIndex)}
        doOnColorChange={(sectionIndex, newColor) => this.changeColor(this.state.selectedListIndex, sectionIndex, newColor)}
        listIndex={this.state.selectedListIndex}
        developers={this.state.developers}
        saveBlock={(blockData, blockId, sectionId) => this.onBlockSave(blockData, blockId, sectionId, this.state.selectedListIndex)}/>
    }

    const nav = (
      <Nav
        content={this.props.lists}
        indexToHighligth={this.state.selectedListIndex}
        switchBetweenTabs={this.changeSelectedListIndex}/>
    );

    const footer = (
      <Footer
        listsLink={this.state.listsDownloadLink}
        developersLink={this.state.developersDownloadLink}/>
    );

    const header = (
      <Header
        goToDashboard={this.changeSelectedListIndex}/>
    );

    return (
      <div className="appWrapper">
        <header>
          {header}
        </header>
        <div className="contentWrapper">
            {(this.state.selectedListIndex === null) ? "" : nav}
            {listOrDashboard}
        </div>
        <footer>
          {footer}
        </footer>
      </div>
    );
  }
}

export default App;
