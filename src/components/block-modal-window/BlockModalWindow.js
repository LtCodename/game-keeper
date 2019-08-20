import React from 'react';
import './BlockModalWindow.css';
import platforms from '../block/platforms.js';
import WarningModalWindow from '../warning-modal-window/WarningModalWindow.js';
declare var $;

class BlockModalWindow extends React.Component {

  constructor(props) {
    super(props);

    this.changeGameName = this.changeGameName.bind(this);
    this.doOnNameChange = this.doOnNameChange.bind(this);
    this.doOnCancel = this.doOnCancel.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.descriptionInputValueChange = this.descriptionInputValueChange.bind(this);
    this.doOnDescriptionChange = this.doOnDescriptionChange.bind(this);
    this.nameInputValueChange = this.nameInputValueChange.bind(this);
    this.dateInputValueChange = this.dateInputValueChange.bind(this);
    this.handleCheckboxInputChange = this.handleCheckboxInputChange.bind(this);
    this.deepCopy = this.deepCopy.bind(this);
    this.rewriteLists = this.rewriteLists.bind(this);
    this.modalSave = this.modalSave.bind(this);
    this.openModalWarningWindow = this.openModalWarningWindow.bind(this);
    this.resetState = this.resetState.bind(this);
    this.selectChangeHandler = this.selectChangeHandler.bind(this);

    this.state = {
      nameEditMode: false,
      descriptionEditMode: false,
      localGameData: {...this.props.gameData, releaseDate: this.props.gameData.releaseDate || ""},
      nameInputValue: this.props.gameData.name,
      descriptionInputValue: "",
      platforms: this.preparePlatformsForState(),
      showModalWindow: false
    };
  }

  selectChangeHandler(event) {
    this.props.changeGameSection(event.target.value);
    this.props.closeModal();
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

    return platforms.map((elem, index) => {
      return {
        id: index,
        name: elem.name,
        url: elem.url,
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

  doOnCancel() {
    this.setState({
      nameEditMode: false,
      descriptionEditMode: false,
      descriptionInputValue: ""
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
                                                    url: elem.url
                                                  }
                                                });

      this.props.modalSave({...this.props.gameData, ...this.state.localGameData, platforms: mappedPlatforms});
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
        modalId={"modalWarning"}
        onProceed={this.props.onDeleteBlock}
        message={`Are you sure you want to delete block ${this.state.localGameData.name}?`} />
    );

    let sectionSelector = "";

    if (this.props.content) {
      const sectionOptions = this.props.content.map((elem, index) => {
        return (
          <option key={index} value={index}>{elem.name}</option>
        );
      })

      sectionSelector = (
        <div className="modalPiece">
          Move to another section
          <select value={this.props.sectionId} className="custom-select" onChange={this.selectChangeHandler}>
            {sectionOptions}
          </select>
        </div>
      );
    }

    const deleteButton = (this.props.onDeleteBlock) ? <button type="button" className="btn" onClick={this.openModalWarningWindow}>Delete</button> : "";

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
                {/*section selector*/}
                {sectionSelector}
                {/*description*/}
                {(this.state.descriptionEditMode) ? descriptionEdit : descriptionCustom}
                {/*date*/}
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

export default BlockModalWindow;
