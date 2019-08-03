import React from 'react';
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

    this.state = {
      localGameData: this.props.gameData,
      nameEditMode: false,
      descriptionEditMode: false,
      nameInputValue: this.props.gameData.name,
      descriptionInputValue: ""
    };
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
    console.log("save changes");
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
      localGameData: this.props.gameData,
      nameInputValue: this.props.gameData.name,
      descriptionInputValue: ""
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
        <input type="text" placeholder="Add your text" value={this.state.descriptionInputValue} onChange={this.descriptionInputValueChange}></input>
        <button className="submitButtons" onClick={this.doOnDescriptionChange}>OK</button>
        <button className="submitButtons" onClick={this.doOnCancel}>Cancel</button>
      </div>
    );

    return (
      <div>
        <button className={className} data-toggle="modal" data-target={"#bModal" + this.state.localGameData.id + this.props.sectionId}>
          <p>{this.props.gameData.name}</p>
        </button>

        <div className="modal fade" id={"bModal" + this.state.localGameData.id + this.props.sectionId} tabIndex="-1" role="dialog"> {/* Modal Window Start*/}
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                {/*Title*/}
                {(this.state.nameEditMode) ? gameNameEdit :  gameName}
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/*description*/}
                {(this.state.descriptionEditMode) ? descriptionEdit :  descriptionCustom}
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
