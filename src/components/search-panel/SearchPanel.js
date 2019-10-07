import React from 'react';
import UserBlock from '../user-block/UserBlock.js';
import './SearchPanel.css';
import { connect } from 'react-redux'

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInputValue: '',
      findedGames: []
    };
  }

  searchInputValueChange = (event) => {
    const gamesToDisplay = event.target.value ? this.props.userBlocks.filter(block => {
      const searchQuery = event.target.value.toLowerCase();
      return block.name.toLowerCase().indexOf(searchQuery) > -1;
    }) : [];

    this.setState({
      searchInputValue: event.target.value,
      findedGames: gamesToDisplay
    });
  }

  onCollapse = () => {
    this.setState({
      searchInputValue: '',
      findedGames: []
    });
  }

  render() {
    const gamesToRender = this.state.findedGames.map((elem, index) => {
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

    if (this.state.findedGames.length) {
      matrixClassName += " findedWrapper"
    }

    let foundTextClass = "foundText";
    let foundTextValue = 0;

    if (this.state.findedGames.length) {
      foundTextValue = this.state.findedGames.length;
      foundTextClass += " foundTextVisible";
    }

    return (
      <div className="searchPanel">
        <button className="searchButton" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={this.onCollapse}>
          <img className="searchIcon" alt="" src={process.env.PUBLIC_URL + '/icons/search.svg'}></img>
        </button>
        <div className="collapse" id="collapseExample">
          <div className="card card-body">
            <input className="form-control" type="search" placeholder="Enter game name" value={this.state.searchInputValue} onChange={this.searchInputValueChange}></input>
            <p className={foundTextClass}>{`Games found in Game Keeper: ${foundTextValue}`}</p>
            <div className={matrixClassName}>
              {gamesToRender}
            </div>
          </div>
        </div>
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
