import React from 'react';
import './BlockModalWindow.css';
import platforms from '../block/platforms.js';

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

    this.state = {
      nameEditMode: false,
      descriptionEditMode: false,
      localGameData: {...this.props.gameData, releaseDate: this.props.gameData.releaseDate || ""},
      nameInputValue: this.props.gameData.name,
      descriptionInputValue: "",
      platforms: this.preparePlatformsForState()
    };
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
      <div>
        <textarea row="3" type="text" placeholder="Add your text" value={this.state.descriptionInputValue} onChange={this.descriptionInputValueChange}></textarea>
        <button className="submitButtons" onClick={this.doOnDescriptionChange}>OK</button>
        <button className="submitButtons" onClick={this.doOnCancel}>Cancel</button>
      </div>
    );

    const descriptionCustom = (
      <p onClick={this.changeDescription}>{(this.state.localGameData.description) ? this.state.localGameData.description : "Click here to enter description."}</p>
    );

    const gameName = (
      <h5 className="modal-title" onClick={this.changeGameName}>{this.state.localGameData.name}</h5>
    );

    const gameNameEdit = (
      <div>
        <input type="text" placeholder="Enter new name" value={this.state.nameInputValue} onChange={this.nameInputValueChange}></input>
        <button className="submitButtons" onClick={this.doOnNameChange}>OK</button>
        <button className="submitButtons" onClick={this.doOnCancel}>Cancel</button>
      </div>
    );

    const datePicker = (
      <label>
        Release date
        <input type="date" value={this.state.localGameData.releaseDate} onChange={this.dateInputValueChange}></input>
      </label>
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
    })

    return (
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
              {/*description*/}
              {(this.state.descriptionEditMode) ? descriptionEdit : descriptionCustom}
              {/*date*/}
              {datePicker}
              {/*platform*/}
              {platformPicker}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-secondary" onClick={this.props.onDeleteBlock}>Delete</button>
              <button type="button" className="btn btn-primary" onClick={this.modalSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BlockModalWindow;
