import React from 'react';
import './BlockModalWindow.css';
import WarningModalWindow from '../warning-modal-window/WarningModalWindow.js';
import { connect } from 'react-redux'
import fire from "../../Firebase";
declare var $;

class BlockModalWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      localGameData: {...this.props.gameData, releaseDate: this.props.gameData.releaseDate || ""},
      nameInputValue: this.props.gameData.name,
      developerInputValue: "",
      developerSuggestInputValue: "",
      descriptionInputValue: this.props.gameData.description,
      platforms: this.preparePlatformsForState(),
      showModalWindow: false,
      newListForBlock: this.props.listId || this.props.userLists[this.props.listIndex].id,
      newSectionForBlock: this.props.sectionId
    };

    console.log(this.props.gameData)
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
    const copy = [...this.props.userBlocks];

    const targetBlockIndex = copy.findIndex((elem) => {
      return elem.id === this.props.gameData.id;
    });

    if (targetBlockIndex > -1) {
      copy.splice(targetBlockIndex, 1);
    }

    this.props.closeModal();

    fire.firestore().collection('users').doc(this.props.userData.uid).update({
      blocks: copy
    }).then((data) => {
    }).catch(error => {
      console.log(error.message);
    });
  };

  developerChangeHandler = (event) => {
    this.setState({
      localGameData: {...this.state.localGameData, developer:event.target.value}
    });
  };

  developerInputValueChange = (event) => {
    this.setState({
      developerInputValue: event.target.value
    });
  };

  developerSuggestInputValueChange = (event) => {
    this.setState({
      developerSuggestInputValue: event.target.value
    });
  };

  openModalWarningWindow = () => {
    this.setState({
      showModalWindow: true
    }, () => {
      $("#modalWarning").modal('show');
      $("#modalWarning").on('hidden.bs.modal', this.resetState);
    });
  };

  componentWillUnmount() {
    $("#modalWarning").unbind('hidden.bs.modal');
  }

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
        name: elem.name,
        iconName: elem.iconName,
        checked: Boolean(selectedPlatforms.find(platform => elem.name === platform.name))
      };
    });
  }

  doOnAddDeveloper = () => {
    if (!this.state.developerInputValue) {
      return;
    }

    fire.firestore().collection('developers').add({
      name: this.state.developerInputValue
    }).then(() => {
      fire.firestore().collection('developers').get().then(snapshot => {
        this.setState({
          developerInputValue: ""
        });
      }).catch(error => {
        console.log(error.message);
      });
    });
  };

  doOnSuggestDeveloper = () => {
    if (!this.state.developerSuggestInputValue) {
      return;
    }

    fire.firestore().collection('suggestedDevelopers').add({
      name: this.state.developerSuggestInputValue
    }).then(() => {
      fire.firestore().collection('suggestedDevelopers').get().then(snapshot => {
        this.setState({
          developerSuggestInputValue: ""
        });
      }).catch(error => {
        console.log(error.message);
      });
    });
  };

  doOnCancel = () => {
    this.setState({
      descriptionInputValue: "",
      nameInputValue: this.props.gameData.name
    });
  };

  descriptionInputValueChange = (event) => {
    this.setState({
      descriptionInputValue: event.target.value,
      localGameData: {...this.state.localGameData, description:event.target.value}
    });
  };

  nameInputValueChange = (event) => {
    this.setState({
      nameInputValue: event.target.value,
      localGameData: {...this.state.localGameData, name:event.target.value}
    });
  };

  dateInputValueChange = (event) => {
    this.setState({
      localGameData: {...this.state.localGameData, releaseDate:event.target.value}
    });
  };

  modalSave = (event) => {
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

    this.props.closeModal();
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

      fire.firestore().collection('users').doc(this.props.userData.uid).update({
        blocks: allBlocks,
        sections: allSections,
      }).then((data) => {
      }).catch(error => {
        console.log(error.message);
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
    }).catch(error => {
      console.log(error.message);
    });
  }

  render() {
    const datePicker = (
      <div className="modalPiece">
        <label className="dateLabel" >
          <p className="littleHeaders">Release Date</p>
          <input className="form-control" type="date" value={this.state.localGameData.releaseDate} onChange={this.dateInputValueChange}/>
        </label>
      </div>
    );

    const platformPicker = this.state.platforms.map((elem) => {
      return (
          <div className="form-check checkbox" key={elem.id}>
            <input
              className="form-check-input"
              type="checkbox"
              value={elem.id}
              checked={elem.checked}
              onChange={this.handleCheckboxInputChange}
              id={"" + elem.id + elem.name}>
            </input>
            <label className="form-check-label" htmlFor={"" + elem.id + elem.name}>
              {elem.name}
            </label>
          </div>
        );
    });

    const modalWarningWindow = (
      <WarningModalWindow
        onProceed={this.deleteBlock}
        message={`Are you sure you want to delete block ${this.state.localGameData.name}?`} />
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
        <div className="modalPiece">
          <p className="littleHeaders">Pick a List</p>
          <select value={this.state.newListForBlock} className="custom-select" onChange={this.newListSelectChangeHandler}>
            {listSectionOptions}
          </select>
          <p className="littleHeaders">Pick a Section</p>
          <select value={this.state.newSectionForBlock} className="custom-select" onChange={this.newSectionSelectChangeHandler}>
            {sectionSectionOptions}
          </select>
        </div>
      );
    }

    const deleteButton = (this.props.fullMode) ? <button type="button" className="btn btn-danger" onClick={this.openModalWarningWindow}>Delete</button> : "";

    const developerSectionOptions = this.props.developers.map((elem) => {
      return (
        <option key={elem.id} value={elem.id}>{elem.name}</option>
      );
    });

    developerSectionOptions.unshift(<option value="" key={"default"}>Select</option>);

    const devSelectValue = this.state.localGameData.developer || '';

    const addDeveloper = (
      <div>
        <p className="littleHeaders">Add developer</p>
        <input className="form-control" type="text" placeholder="Developer Name" value={this.state.developerInputValue} onChange={this.developerInputValueChange}/>
        <button className="btn btn-success" onClick={this.doOnAddDeveloper}>Add</button>
      </div>
    );

    const suggestDeveloper = (
      <div>
        <p className="littleHeaders">Suggest developer</p>
        <input className="form-control" type="text" placeholder="Developer Name" value={this.state.developerSuggestInputValue} onChange={this.developerSuggestInputValueChange}/>
        <button className="btn btn-success" onClick={this.doOnSuggestDeveloper}>Suggest</button>
      </div>
    );

    const developerSelector = (
      <div className="modalPiece">
        <p className="littleHeaders">Assign developer</p>
        <select value={devSelectValue} className="custom-select" onChange={this.developerChangeHandler}>
          {developerSectionOptions}
        </select>
        {suggestDeveloper}
        {this.props.userData.admin ? addDeveloper : ""}
      </div>
    );

    const description = (
      <div className="desctiptionArea">
        <label className="desctiptionLabel" htmlFor="description">
          <p className="littleHeaders">Description</p>
        </label>
        <textarea placeholder="Enter description" className="form-control" id="description" rows="4" value={this.state.descriptionInputValue} onChange={this.descriptionInputValueChange}/>
      </div>
    );

    const name = (
      <div className="nameArea">
        <label className="nameLabel" htmlFor="name">
          <p className="littleHeaders">Name</p>
        </label>
        <textarea placeholder="Enter name" className="form-control enterNewName" id="name" rows="1" value={this.state.nameInputValue} onChange={this.nameInputValueChange}/>
      </div>
    );

    return (
      <div className="block-modal">
        <div className="modal fade" id={this.props.modalId} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                {/*title*/}
                {name}
                {/*New list and section selector*/}
                {newHomeSelector}
                {/*description*/}
                {description}
                {/*developer*/}
                {developerSelector}
                {/*release date*/}
                {datePicker}
                {/*platform*/}
                <div className="modalPiece">
                  <p className="littleHeaders">Select platform</p>
                  <div className="checkboxWrapper">
                    {platformPicker}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-warning" data-dismiss="modal">Cancel</button>
                {deleteButton}
                <button type="button" className="btn btn-success" onClick={this.modalSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
        {this.state.showModalWindow ? modalWarningWindow : ""}
      </div>
    )
  }
}

const stateToProps = (state = {}) => {
  return {
    listIndex: state.selectedListIndex,
    developers: state.developers,
    platforms: state.platforms,
    userData: state.userData,
    userBlocks: state.userBlocks,
    userSections: state.userSections,
    userLists: state.userLists
  }
};

const BlockModalWindowConnected = connect(stateToProps, null)(BlockModalWindow);

export default BlockModalWindowConnected;
