import React from 'react';
import './BlockModalWindow.css';
import WarningModalWindow from '../warning-modal-window/WarningModalWindow.js';
import { connect } from 'react-redux'
declare var $;
declare var firebase;

class BlockModalWindow extends React.Component {

  constructor(props) {
    super(props);

    this.changeGameName = this.changeGameName.bind(this);
    this.doOnNameChange = this.doOnNameChange.bind(this);
    this.doOnAddDeveloper = this.doOnAddDeveloper.bind(this);
    this.doOnSuggestDeveloper = this.doOnSuggestDeveloper.bind(this);
    this.doOnCancel = this.doOnCancel.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.descriptionInputValueChange = this.descriptionInputValueChange.bind(this);
    this.doOnDescriptionChange = this.doOnDescriptionChange.bind(this);
    this.nameInputValueChange = this.nameInputValueChange.bind(this);
    this.developerInputValueChange = this.developerInputValueChange.bind(this);
    this.developerSuggestInputValueChange = this.developerSuggestInputValueChange.bind(this);
    this.dateInputValueChange = this.dateInputValueChange.bind(this);
    this.handleCheckboxInputChange = this.handleCheckboxInputChange.bind(this);
    this.deepCopy = this.deepCopy.bind(this);
    this.rewriteLists = this.rewriteLists.bind(this);
    this.modalSave = this.modalSave.bind(this);
    this.openModalWarningWindow = this.openModalWarningWindow.bind(this);
    this.resetState = this.resetState.bind(this);
    this.newListSelectChangeHandler = this.newListSelectChangeHandler.bind(this);
    this.newSectionSelectChangeHandler = this.newSectionSelectChangeHandler.bind(this);
    this.developerChangeHandler = this.developerChangeHandler.bind(this);
    this.deleteBlock = this.deleteBlock.bind(this);

    this.state = {
      nameEditMode: false,
      descriptionEditMode: false,
      localGameData: {...this.props.gameData, releaseDate: this.props.gameData.releaseDate || ""},
      nameInputValue: this.props.gameData.name,
      developerInputValue: "",
      developerSuggestInputValue: "",
      descriptionInputValue: "",
      platforms: this.preparePlatformsForState(),
      showModalWindow: false,
      newListForBlock: this.props.userLists[this.props.listIndex].id,
      newSectionForBlock: this.props.sectionId
    };
  }

  newListSelectChangeHandler(event) {
    const sections = this.props.userSections.filter((elem) => {
      return elem.listId === event.target.value;
    });
    const firstSectionId = sections[0].id;

    this.setState({
      newListForBlock: event.target.value,
      newSectionForBlock: firstSectionId
    });
  }

  newSectionSelectChangeHandler(event) {
    this.setState({
      newSectionForBlock: event.target.value
    });
  }

  deleteBlock() {
    const copy = [...this.props.userBlocks];

    const targetBlockIndex = copy.findIndex((elem) => {
      return elem.id === this.props.gameData.id;
    })

    if (targetBlockIndex > -1) {
      copy.splice(targetBlockIndex, 1);
    }

    this.props.closeModal();

    firebase.firestore().collection('users').doc(this.props.userData.uid).update({
      blocks: copy
    }).then((data) => {
    }).catch(error => {
      console.log(error.message);
    });
  }

  developerChangeHandler(event) {
    this.setState({
      localGameData: {...this.state.localGameData, developer:event.target.value}
    });
  }

  developerInputValueChange(event) {
    this.setState({
      developerInputValue: event.target.value
    });
  }

  developerSuggestInputValueChange(event) {
    this.setState({
      developerSuggestInputValue: event.target.value
    });
  }

  openModalWarningWindow() {
    this.setState({
      showModalWindow: true
    }, () => {
      $("#modalWarning").modal('show');
      $("#modalWarning").on('hidden.bs.modal', this.resetState);
    });
  }

  componentWillUnmount() {
    $("#modalWarning").unbind('hidden.bs.modal');
  }

  resetState() {
    this.setState({
      showModalWindow: false
    })
  }

  handleCheckboxInputChange(event) {
    const copy = this.deepCopy(this.state.platforms);
    copy[event.target.value].checked = event.target.checked;

    this.rewriteLists(copy);
  }

  deepCopy(objectToCopy) {
    return JSON.parse(JSON.stringify(objectToCopy));
  }

  rewriteLists(newData) {
    this.setState({
      platforms: newData
    });
  }

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

  changeGameName() {
    this.setState({
      nameEditMode: true
    });
  }

  doOnNameChange() {
    this.setState({
      nameEditMode: false,
      localGameData: {...this.state.localGameData, name:this.state.nameInputValue}
    });
  }

  doOnAddDeveloper() {
    if (!this.state.developerInputValue) {
      return;
    }

    firebase.firestore().collection('developers').add({
      name: this.state.developerInputValue
    }).then(() => {
      firebase.firestore().collection('developers').get().then(snapshot => {
        this.setState({
          developerInputValue: ""
        });
      }).catch(error => {
        console.log(error.message);
      });
    });
  }

  doOnSuggestDeveloper() {
    if (!this.state.developerSuggestInputValue) {
      return;
    }

    firebase.firestore().collection('suggestedDevelopers').add({
      name: this.state.developerSuggestInputValue
    }).then(() => {
      firebase.firestore().collection('suggestedDevelopers').get().then(snapshot => {
        this.setState({
          developerSuggestInputValue: ""
        });
      }).catch(error => {
        console.log(error.message);
      });
    });
  }

  doOnCancel() {
    this.setState({
      nameEditMode: false,
      descriptionEditMode: false,
      descriptionInputValue: "",
      nameInputValue: this.props.gameData.name
    });
  }

  changeDescription() {
    this.setState({
      descriptionEditMode: true
    });
  }

  doOnDescriptionChange() {
    this.setState({
      descriptionEditMode: false,
      localGameData: {...this.state.localGameData, description:this.state.descriptionInputValue}
    });
  }

  descriptionInputValueChange(event) {
    this.setState({
      descriptionInputValue: event.target.value
    });
  }

  nameInputValueChange(event) {
    this.setState({
      nameInputValue: event.target.value
    });
  }

  dateInputValueChange(event) {
    this.setState({
      localGameData: {...this.state.localGameData, releaseDate:event.target.value}
    });
  }

  modalSave(event) {
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
  }

  updateBlock(platforms) {
    const allBlocks = [...this.props.userBlocks];

    let targetBlockIndex = allBlocks.findIndex(elem => {
      return elem.id === this.props.gameData.id
    });

    if (targetBlockIndex > -1) {
      allBlocks[targetBlockIndex] = {
        ...this.props.gameData,
        ...this.state.localGameData,
        platforms: platforms,
        sectionId: this.state.newSectionForBlock
      };

      firebase.firestore().collection('users').doc(this.props.userData.uid).update({
        blocks: allBlocks
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
    }

    const allBlocks = [...this.props.userBlocks, newBlock];

    firebase.firestore().collection('users').doc(this.props.userData.uid).update({
      blocks: allBlocks
    }).then((data) => {
    }).catch(error => {
      console.log(error.message);
    });
  }

  render() {
    const descriptionEdit = (
      <div className="modalPiece">
        <textarea className="form-control" row="3" type="text" placeholder="Add your text" value={this.state.descriptionInputValue} onChange={this.descriptionInputValueChange}></textarea>
        <button className="btn btn-dark" onClick={this.doOnDescriptionChange}>OK</button>
        <button className="btn" onClick={this.doOnCancel}>Cancel</button>
      </div>
    );

    const descriptionCustom = (
      <div className="modalPiece">
        <p className="modalParagraph" onClick={this.changeDescription}>{(this.state.localGameData.description) ? this.state.localGameData.description : "Click this text to enter description"}</p>
      </div>
    );

    const gameName = (
      <h5 className="modal-title" onClick={this.changeGameName}>{this.state.localGameData.name}</h5>
    );

    const gameNameEdit = (
      <div>
        <input className="form-control enterNewName" type="text" placeholder="Enter new name" value={this.state.nameInputValue} onChange={this.nameInputValueChange}></input>
        <button className="btn btn-dark" onClick={this.doOnNameChange}>OK</button>
        <button className="btn" onClick={this.doOnCancel}>Cancel</button>
      </div>
    );

    const datePicker = (
      <div className="modalPiece">
        <label>
          Release Date
          <input className="form-control" type="date" value={this.state.localGameData.releaseDate} onChange={this.dateInputValueChange}></input>
        </label>
      </div>
    );

    const platformPicker = this.state.platforms.map((elem, index) => {
      return (
        <div className="form-check" key={elem.id}>
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
          Move to another List or Section
          <br></br>
          <br></br>
          Pick a List
          <select value={this.state.newListForBlock} className="custom-select" onChange={this.newListSelectChangeHandler}>
            {listSectionOptions}
          </select>
          Pick a Section
          <select value={this.state.newSectionForBlock} className="custom-select" onChange={this.newSectionSelectChangeHandler}>
            {sectionSectionOptions}
          </select>
        </div>
      );
    }

    const deleteButton = (this.props.fullMode) ? <button type="button" className="btn" onClick={this.openModalWarningWindow}>Delete</button> : "";

    const developerSectionOptions = this.props.developers.map((elem, index) => {
      return (
        <option key={elem.id} value={elem.id}>{elem.name}</option>
      );
    });

    developerSectionOptions.unshift(<option value="" key={"default"}>Select</option>);

    const devSelectValue = this.state.localGameData.developer || '';

    const addDeveloper = (
      <div>
        Add developer
        <input className="form-control" type="text" placeholder="Developer Name" value={this.state.developerInputValue} onChange={this.developerInputValueChange}></input>
        <button className="btn btn-dark" onClick={this.doOnAddDeveloper}>Add</button>
      </div>
    );

    const suggestDeveloper = (
      <div>
        Suggest developer
        <input className="form-control" type="text" placeholder="Developer Name" value={this.state.developerSuggestInputValue} onChange={this.developerSuggestInputValueChange}></input>
        <button className="btn btn-dark" onClick={this.doOnSuggestDeveloper}>Suggest</button>
      </div>
    );

    const developerSelector = (
      <div className="modalPiece">
        Assing developer
        <select style={{fontWeight:"bold"}} value={devSelectValue} className="custom-select" onChange={this.developerChangeHandler}>
          {developerSectionOptions}
        </select>
        {suggestDeveloper}
        {this.props.userData.admin ? addDeveloper : ""}
      </div>
    );

    return (
      <div>
        <div className="modal fade" id={this.props.modalId} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                {/*title*/}
                {(this.state.nameEditMode) ? gameNameEdit : gameName}
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/*New list and section selector*/}
                {newHomeSelector}
                {/*description*/}
                {(this.state.descriptionEditMode) ? descriptionEdit : descriptionCustom}
                {/*developer*/}
                {developerSelector}
                {/*release date*/}
                {datePicker}
                {/*platform*/}
                <div className="modalPiece">
                  Select platform
                  {platformPicker}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" data-dismiss="modal">Cancel</button>
                {deleteButton}
                <button type="button" className="btn btn-dark" onClick={this.modalSave}>Save</button>
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
