import React from 'react';
import platforms from './platforms.js';
declare var  $;

class Block extends React.Component {

  constructor(props) {
    super(props);

    this.modalSave = this.modalSave.bind(this);
    this.changeGameName = this.changeGameName.bind(this);
    this.doOnCancel = this.doOnCancel.bind(this);
    this.nameInputValueChange = this.nameInputValueChange.bind(this);
    this.doOnNameChange = this.doOnNameChange.bind(this);
    this.onDeleteBlock = this.onDeleteBlock.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.resetState = this.resetState.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.descriptionInputValueChange = this.descriptionInputValueChange.bind(this);
    this.doOnDescriptionChange = this.doOnDescriptionChange.bind(this);
    this.dateInputValueChange = this.dateInputValueChange.bind(this);
    this.handleCheckboxInputChange = this.handleCheckboxInputChange.bind(this);
    this.deepCopy = this.deepCopy.bind(this);
    this.rewriteLists = this.rewriteLists.bind(this);

    this.state = {
      localGameData: {...this.props.gameData, releaseDate: this.props.gameData.releaseDate || ""},
      nameEditMode: false,
      descriptionEditMode: false,
      nameInputValue: this.props.gameData.name,
      descriptionInputValue: "",
      platforms: this.preparePlatformsForState()
    };
  }

  preparePlatformsForState(){
    const selectedPlatforms = this.props.gameData.platforms || [];

    return platforms.map((elem, index) => {
      return {
        id: index,
        name: elem.name,
        checked: selectedPlatforms.indexOf(elem.name) > -1
      };
    });
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

  dateInputValueChange(event) {
    this.setState({
      localGameData: {...this.state.localGameData, releaseDate:event.target.value}
    });
  }

  nameInputValueChange(event) {
    this.setState({
      nameInputValue: event.target.value
    });
  }

  descriptionInputValueChange(event) {
    this.setState({
      descriptionInputValue: event.target.value
    });
  }

  changeGameName() {
    this.setState({
      nameEditMode: true
    });
  }

  changeDescription() {
    this.setState({
      descriptionEditMode: true
    });
  }

  doOnNameChange() {
    this.setState({
      nameEditMode: false,
      localGameData: {...this.state.localGameData, name:this.state.nameInputValue}
    });
  }

  doOnDescriptionChange() {
    this.setState({
      descriptionEditMode: false,
      localGameData: {...this.state.localGameData, description:this.state.descriptionInputValue}
    });
  }

  doOnCancel() {
    this.setState({
      nameEditMode: false,
      descriptionEditMode: false,
      descriptionInputValue: ""
    });
  }

  modalSave(event) {
    //console.log("new name is " + this.state.localGameData.name);
    //console.log("description is " + this.state.localGameData.description);
    //console.log("release date is " + this.state.localGameData.releaseDate);
    //console.log("platforms are " + this.state.platforms);

    let mappedPlatforms = this.state.platforms.filter((elem) => elem.checked)
                                              .map((elem) =>  elem.name);
    let dataToSend = {
      name: this.state.localGameData.name,
      description: this.state.localGameData.description,
      releaseDate: this.state.localGameData.releaseDate,
      platforms: mappedPlatforms
    };

    this.props.saveBlock(dataToSend);

    this.closeModal();
  }

  onDeleteBlock() {
    this.props.onBlockDelete();
    this.closeModal();
  }

  componentWillUnmount() {
    $("#bModal" + this.state.localGameData.id + this.props.sectionId).unbind('hidden.bs.modal');
  }

  componentDidMount() {
    $("#bModal" + this.state.localGameData.id + this.props.sectionId).on('hidden.bs.modal', this.resetState);
  }

  resetState() {
    this.setState({
      localGameData: {...this.props.gameData, releaseDate: this.props.gameData.releaseDate || ""},
      nameInputValue: this.props.gameData.name,
      descriptionInputValue: "",
      platforms: this.preparePlatformsForState()
    })
  }

  closeModal() {
    $("#bModal" + this.state.localGameData.id + this.props.sectionId).modal('hide');
  }

  render() {
    let className = 'game-block game-block_';

    if (this.props.color) {
      className += this.props.color;
    }

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

    const descriptionCustom = (
      <p onClick={this.changeDescription}>{(this.state.localGameData.description) ? this.state.localGameData.description : "Click here to enter description."}</p>
    );

    const descriptionEdit = (
      <div>
        <textarea row="3" type="text" placeholder="Add your text" value={this.state.descriptionInputValue} onChange={this.descriptionInputValueChange}></textarea>
        <button className="submitButtons" onClick={this.doOnDescriptionChange}>OK</button>
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

    const platformsToShow = (this.state.localGameData.hasOwnProperty('platforms')) ? this.state.localGameData.platforms.map((elem, index) => <p className="platforms" key={index} >{elem}</p>) : [];

    const platfotmsOnBlock = (
      <div className="platformsBlock">
        {platformsToShow}
      </div>
    );

    const dateToShow = (this.state.localGameData.hasOwnProperty('releaseDate') ? <p className="releaseDate">{this.state.localGameData.releaseDate}</p> : <p></p>);

    return (
      <div>
        <button className={className} data-toggle="modal" data-target={"#bModal" + this.state.localGameData.id + this.props.sectionId}>
          <p>{this.props.gameData.name}</p>
          {dateToShow}
          {platfotmsOnBlock}
        </button>

        <div className="modal fade" id={"bModal" + this.state.localGameData.id + this.props.sectionId} tabIndex="-1" role="dialog"> {/* Modal Window Start*/}
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                {/*title*/}
                {(this.state.nameEditMode) ? gameNameEdit :  gameName}
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/*description*/}
                {(this.state.descriptionEditMode) ? descriptionEdit :  descriptionCustom}
                {/*date*/}
                {datePicker}
                {/*platform*/}
                {platformPicker}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-secondary" onClick={this.onDeleteBlock}>Delete</button>
                <button type="button" className="btn btn-primary" onClick={this.modalSave}>Save</button>
              </div>
            </div>
          </div>
        </div>{/* Modal Window End*/}
      </div>
    )
  }
}

export default Block;
