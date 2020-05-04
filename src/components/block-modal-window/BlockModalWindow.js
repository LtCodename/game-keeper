import React from 'react';
import './BlockModalWindow.css';
import WarningModalWindow from '../warning-modal-window/WarningModalWindow.js';
import { connect } from 'react-redux'
import fire from "../../Firebase";
import { Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import NameSearchResults from "./NameSearchResults";
import { getGameInformation, searchGamesByName } from "../../rawgApi";
import Button from "../button/Button";
import PlatformsIcons from "../user-block/UserBlock";

class BlockModalWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      localGameData: {...this.props.gameData, releaseDate: this.props.gameData.releaseDate || ""},
      nameInputValue: this.props.gameData.name,
      platforms: this.preparePlatformsForState(),
      showModalWindow: false,
      newListForBlock: this.props.listId,
      newSectionForBlock: this.props.sectionId,
      displaySearchResults: false,
      searchResult: [],
      foundGameInfo: {},
      saveButtonDisabled: false,
      deleteButtonDisabled: false
    };
  }

  newListSelectChangeHandler = (event) => {
    const sections = this.props.userSections.filter((elem) => {
      return elem.listId === event.target.value;
    });
    const firstSectionId = sections[0] ? sections[0].id : 0;

    this.setState({
      newListForBlock: event.target.value,
      newSectionForBlock: firstSectionId
    });
  };

  newSectionSelectChangeHandler = (event) => {
    this.setState({
      newSectionForBlock: event.target.value
    });
  };

  deleteBlock = () => {
    this.setState({
      deleteButtonDisabled: true
    })

    const copy = [...this.props.userBlocks];

    const targetBlockIndex = copy.findIndex((elem) => {
      return elem.id === this.props.gameData.id;
    });

    if (targetBlockIndex > -1) {
      copy.splice(targetBlockIndex, 1);
    }

    this.props.hideWindow();

    fire.firestore().collection('users').doc(this.props.userData.uid).update({
      blocks: copy
    }).then(() => {
      this.setState({
        deleteButtonDisabled: false
      })
    }).catch(error => {
      console.log(error.message);
      this.setState({
        deleteButtonDisabled: false
      })
    });
  };

  openModalWarningWindow = () => {
    this.setState({
      showModalWindow: true
    });
  };

  resetState = () => {
    this.setState({
      showModalWindow: false
    })
  };

  handleCheckboxInputChange = (event) => {
    const copy = this.deepCopy(this.state.platforms);
    copy[event.target.value].checked = event.target.checked;

    this.rewriteLists(copy);
  };

  deepCopy = (objectToCopy) => {
    return JSON.parse(JSON.stringify(objectToCopy));
  };

  rewriteLists = (newData) => {
    this.setState({
      platforms: newData
    });
  };

  preparePlatformsForState(){
    const selectedPlatforms = this.props.gameData.platforms || [];

    return this.props.platforms.map((elem, index) => {
      return {
        id: index,
        name: elem['name'],
        iconName: elem['iconName'],
        checked: Boolean(selectedPlatforms.find(platform => elem['name'] === platform.name))
      };
    });
  }

  searchApi() {
    console.log('searching...');
    searchGamesByName(this.state.nameInputValue).then(response => {
      console.log(response);
      this.setState({
        searchResult: response
      }, () => {
        this.setState({
          displaySearchResults: true
        })
      })
    });
  }

  getGameData(id) {
    console.log('retrieving game info..');

    getGameInformation(id).then(r => {
      this.setState({
        foundGameInfo: r
      }, () => {
        console.log(this.state.foundGameInfo);

        let developersNames = [];
        this.state.foundGameInfo.developers.map((elem) => {
          if (developersNames.length === 0) {
            return developersNames += elem.name;
          } else {
            return developersNames += `, ${elem.name}`;
          }
        })

        this.setState({
          localGameData: {
            ...this.state.localGameData,
            releaseDate: this.state.foundGameInfo['released'],
            developers: developersNames,
            name: this.state.foundGameInfo['name'],
            apiId: this.state.foundGameInfo['id']
          },
          nameInputValue: this.state.foundGameInfo['name']
        }, () => {
          console.log(this.state.localGameData);
        })
      })
    })
  }

  passIdBack = (gameId) => {
    console.log(gameId);
    this.getGameData(gameId);
    this.resetSearchResults();
  }

  resetSearchResults = () => {
    this.setState({
      displaySearchResults: false,
      searchResult: []
    })
  }

  nameInputValueChange = (event) => {
    this.setState({
      nameInputValue: event.target.value,
      localGameData: {...this.state.localGameData, name:event.target.value}
    },() => {
      //server
      if (this.state.nameInputValue.length >= 3) {
        this.searchApi();
      }
    });
  };

  modalSave = () => {
    this.setState({
      saveButtonDisabled: true
    })

    const mappedPlatforms = this.state.platforms
      .filter((elem) => elem.checked)
      .map((elem) => {
        return {
          name: elem.name,
          iconName: elem.iconName
        }
      });
    if (!this.props.fullMode) {
      this.addNewBlock(mappedPlatforms);
    }else {
      this.updateBlock(mappedPlatforms);
    }
  };

  updateBlock(platforms) {
    const allBlocks = [...this.props.userBlocks];
    const allSections = [...this.props.userSections];

    let targetBlockIndex = allBlocks.findIndex(elem => {
      return elem.id === this.props.gameData.id
    });

    if (targetBlockIndex > -1) {
      let sectionId = this.state.newSectionForBlock;

      if (this.state.newSectionForBlock === 0) {
        const newSectionId = `id${new Date().getTime()}`;
        sectionId = newSectionId;

        const newSection = {
          id: newSectionId,
          name: 'New section',
          color: "witch-haze",
          listId: this.state.newListForBlock
        };

        allSections.push(newSection);
      }

      allBlocks[targetBlockIndex] = {
        ...this.props.gameData,
        ...this.state.localGameData,
        platforms: platforms,
        sectionId: sectionId
      };

      //console.log(this.props.gameData);
      //console.log(this.state.localGameData);
      //console.log(allBlocks[targetBlockIndex]);

      fire.firestore().collection('users').doc(this.props.userData.uid).update({
        blocks: allBlocks,
        sections: allSections,
      }).then((data) => {
        this.setState({
          saveButtonDisabled: false
        }, () => this.props.hideWindow())
      }).catch(error => {
        console.log(error.message);
        this.setState({
          saveButtonDisabled: false
        })
      });
    }
  }

  addNewBlock(platforms) {
    const newBlock = {
      ...this.props.gameData,
      ...this.state.localGameData,
      id: `id${new Date().getTime()}`,
      platforms: platforms,
      sectionId: this.props.sectionId
    };

    const allBlocks = [...this.props.userBlocks, newBlock];

    fire.firestore().collection('users').doc(this.props.userData.uid).update({
      blocks: allBlocks
    }).then((data) => {
      this.setState({
        saveButtonText: "Done"
      }, () => this.props.hideWindow())
    }).catch(error => {
      console.log(error.message);
    });
  }

  render() {
    const platformPicker = this.state.platforms.map((elem) => {
      return (
          <div className="checkbox-wrapper" key={elem.id}>
            <input
              className="platform-checkbox-input"
              type="checkbox"
              value={elem.id}
              checked={elem.checked}
              onChange={this.handleCheckboxInputChange}
              id={"" + elem.id + elem.name}>
            </input>
            <span className="platform-checkbox-status">
              <span className="platform-checkbox-icon">{PlatformsIcons[elem.iconName]}</span>
            </span>
            <span className="platform-tooltip">{elem.name}</span>
          </div>
        );
    });

    const modalWarningWindow = (
      <WarningModalWindow
        onProceed={this.deleteBlock}
        message={`Are you sure you want to delete game ${this.state.localGameData.name}?`}
        show={this.state.showModalWindow}
        hideWindow={this.resetState.bind(this)}/>
    );

    let newHomeSelector = "";

    if (this.props.fullMode) {
      const listSectionOptions = this.props.userLists.map((elem, index) => {
        return (
          <option key={index} value={elem.id}>{elem.name}</option>
        );
      });

      const sectionSectionOptions = this.props.userSections.filter((elem) => {
        return elem.listId === this.state.newListForBlock;
      }).map((elem, index) => {
        return (
          <option key={index} value={elem.id}>{elem.name}</option>
        );
      });

      newHomeSelector = (
        <div className="modalPiece lt-row">
          <div className="lt-col home-selector">
            <span className="littleHeaders">List</span>
            <select
                className="block-select"
                value={this.state.newListForBlock}
                onChange={this.newListSelectChangeHandler}>
              {listSectionOptions}
            </select>
          </div>
          <div className="lt-col">
            <span className="littleHeaders">Pick a Section</span>
            <select
                className="block-select"
                value={this.state.newSectionForBlock}
                onChange={this.newSectionSelectChangeHandler}>
              {sectionSectionOptions}
            </select>
          </div>
        </div>
      );
    }

    const deleteButton = (this.props.fullMode) ?
        <Button
            buttonAction={this.openModalWarningWindow}
            disabled={this.state.deleteButtonDisabled}
            text={'Delete'}
            margin={'right'}/> : '';

    const name = (
      <div className="lt-row search-row">
        {this.state.displaySearchResults ? <span className='search-overlay' onClick={this.resetSearchResults}/> : ''}
        <textarea
            placeholder="Enter name"
            className="block-textarea"
            id="name"
            rows={1}
            value={this.state.nameInputValue}
            onChange={this.nameInputValueChange}/>
        {this.state.displaySearchResults ? <NameSearchResults
            results={this.state.searchResult}
            passIdBack={(gameId) => this.passIdBack(gameId)}/> : ''}
      </div>
    );

    const apiDeveloper = (
        <div className="modalPiece">
          <p className="littleHeaders">Developer</p>
          <span className="game-property">{this.state.localGameData.developers || 'No Data'}</span>
        </div>
    )

    const apiDate = (
        <div className="modalPiece">
          <p className="littleHeaders">Release Date</p>
          <span className="game-property">{this.state.localGameData.releaseDate || 'TBA'}</span>
        </div>
    )

    return (
        <>
          <Modal show={this.props.show} onHide={this.props.hideWindow} dialogClassName={'block-modal'}>
            <Modal.Body>
              <div className="lt-col">
                {/*title*/}
                {name}
                {/*New list and section selector*/}
                {newHomeSelector}
                {/*developer*/}
                {apiDeveloper}
                {/*release date*/}
                {apiDate}
                {/*platform*/}
                <div className="modalPiece">
                  <p className="littleHeaders">I've played it on</p>
                  <div className="checkbox-holder">
                    {platformPicker}
                  </div>
                </div>
              </div>
              <div className="lt-row">
                <Button
                    buttonAction={this.props.hideWindow}
                    text={'Cancel'}
                    margin={'right'}
                />
                {deleteButton}
                <Button
                    buttonAction={this.modalSave}
                    disabled={this.state.saveButtonDisabled}
                    text={'Save'}
                />
              </div>
            </Modal.Body>
          </Modal>
          {this.state.showModalWindow ? modalWarningWindow : ''}
        </>
    )
  }
}

const stateToProps = (state = {}, props = {}) => {
  return {
    listId: props.listId || props.match.params.listId,
    listIndex: state.selectedListIndex,
    platforms: state.platforms,
    userData: state.userData,
    userBlocks: state.userBlocks,
    userSections: state.userSections,
    userLists: state.userLists
  }
};

const BlockModalWindowConnected = connect(stateToProps, null)(BlockModalWindow);

export default withRouter(BlockModalWindowConnected);
