import React from 'react';
import UserBlock from '../user-block/UserBlock.js';
import './SearchPanel.css';
import { connect } from 'react-redux'
import {SearchIcon} from "../../IconsLibrary";

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInputValue: '',
      foundGames: [],
      searchMode: "name",
      showPanel: false
    };
  }

  searchInputValueChange = (event) => {
    let gamesToDisplay = [];
    if (this.state.searchMode === "name") {
      gamesToDisplay = event.target.value ? this.props.userBlocks.filter(block => {
        const searchQuery = event.target.value.toLowerCase();
        return block.name.toLowerCase().indexOf(searchQuery) > -1;
      }) : [];
    }else{
      let developers = event.target.value ? this.props.developers.filter(developer => {
        const searchingFor = event.target.value.toLowerCase();
        return developer.name.toLowerCase().indexOf(searchingFor) > -1;
      }) : [];

      gamesToDisplay = this.props.userBlocks.filter(block => {
        const developerInFoundList = developers.find(dev => {
          return block.developer === dev.id;
        });

        return Boolean(developerInFoundList);
      });
    }

    this.setState({
      searchInputValue: event.target.value,
      foundGames: gamesToDisplay
    });
  };

  searchModeChangeHandler = (event) => {
    this.setState({
      searchMode: event.target.value,
      searchInputValue: "",
      foundGames: []
    });
  };

  onCollapse = () => {
    this.setState({
      searchInputValue: '',
      foundGames: [],
      showPanel: !this.state.showPanel
    });
  };

  render() {
    const gamesToRender = this.state.foundGames.map((elem) => {
      const selectedSection = this.props.userSections.find(section => {
        return section.id === elem.sectionId;
      });

      const listId = selectedSection.listId;

      return <UserBlock
        key={elem.id}
        color={"witch-haze"}
        gameData={elem}
        listId={listId}
        sectionId={elem.sectionId}/>;
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

    let matrixClassName = "listsMatrix";

    switch(this.props.userLists.length) {
      case 2:
        matrixClassName += " threeCells";
        break;
      case 1:
        matrixClassName += " twoCells";
        break;
      case 0:
        matrixClassName += " oneCell";
        break;
      default:
        matrixClassName += " fourCells"
    }

    if (this.state.foundGames.length) {
      matrixClassName += " findedWrapper"
    }

    let foundTextClass = "foundText";
    let foundTextValue = 0;

    if (this.state.foundGames.length) {
      foundTextValue = this.state.foundGames.length;
      foundTextClass += " foundTextVisible";
    }

    const searchPlaceholderText = (this.state.searchMode === "name") ? "Enter game name" : "Enter developer name";

    const searchModeArray = [
      {
        id: "name",
        name: "Search by game name"
      },
      {
        id: "developer",
        name: "Search by game developer"
      }
    ];

    const searchModeOptions = searchModeArray.map((elem, index) => {
      return (
          <option key={index} value={elem.id}>{elem.name}</option>
      );
    });

    const searchModeSelector = (
        <select
            value={this.state.newListForBlock}
            className="searchModeSelector"
            onChange={this.searchModeChangeHandler}>
          {searchModeOptions}
        </select>
    );

    const panel = (
        <div className="lt-col search-panel-wrapper">
          {searchModeSelector}
          <textarea
              className="search-input"
              rows={1}
              placeholder={searchPlaceholderText}
              value={this.state.searchInputValue}
              onChange={this.searchInputValueChange}/>
          <span className={foundTextClass}>{`Games found in Game Keeper: ${foundTextValue}`}</span>
          <div className={matrixClassName}>
            {gamesToRender}
          </div>
        </div>
    );

    return (
      <div className="searchPanel">
        <button
            className="searchButton"
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
            onClick={this.onCollapse}>
          {SearchIcon}
        </button>
        {this.state.showPanel ? panel : ''}
      </div>
    )
  }
}

const stateToProps = (state = {}) => {
  return {
    userBlocks: state.userBlocks,
    userSections: state.userSections,
    userLists: state.userLists,
    developers: state.developers
  }
};

const SearchPanelConnected = connect(stateToProps, null)(SearchPanel);

export default SearchPanelConnected;
