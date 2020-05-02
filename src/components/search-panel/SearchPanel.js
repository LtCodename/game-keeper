import React from 'react';
import './SearchPanel.css';
import { connect } from 'react-redux'
import UserBlockMiniConnected from "../user-block/UserBlockMini";

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInputValue: '',
      foundGames: []
    };
  }

  searchInputValueChange = (event) => {
    const gamesToDisplay = event.target.value ? this.props.userBlocks.filter(block => {
      const searchQuery = event.target.value.toLowerCase();
      return block.name.toLowerCase().indexOf(searchQuery) > -1;
    }) : [];

    this.setState({
      searchInputValue: event.target.value,
      foundGames: gamesToDisplay
    });
  };

  render() {
    const gamesToRender = this.state.foundGames.map((elem) => {
      const selectedSection = this.props.userSections.find(section => {
        return section.id === elem.sectionId;
      });

      const listId = selectedSection.listId;

      return <UserBlockMiniConnected
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

    const panel = (
        <textarea
            className="search-input"
            rows={1}
            placeholder='Search'
            value={this.state.searchInputValue}
            onChange={this.searchInputValueChange}/>
    );

    const results = (
        <div className="search-matrix">
          {gamesToRender}
        </div>
    )

    return (
        <div className="search-panel-wrapper">
          {panel}
          {this.state.foundGames.length ? results : ""}
        </div>
    )
  }
}

const stateToProps = (state = {}) => {
  return {
    userBlocks: state.userBlocks,
    userSections: state.userSections,
    userLists: state.userLists
  }
};

const SearchPanelConnected = connect(stateToProps, null)(SearchPanel);

export default SearchPanelConnected;
