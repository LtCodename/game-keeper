import React from 'react';
import UserBlock from '../user-block/UserBlock.js';
import Colors from '../colors/Colors.js';
import './UserSection.css';
import WarningModalWindow from '../warning-modal-window/WarningModalWindow.js';
import BlockModalWindow from '../block-modal-window/BlockModalWindow.js';
import { connect } from 'react-redux'
declare var $;
declare var firebase;

class UserSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      sectionInputValue: this.props.name,
      showModalWindow: false,
      showAddGameWindow: false,
      buttonsVisible:false
    };
  }

  linkToTextarea;

  toggleButtons = () => {
    this.setState({
      buttonsVisible: !this.state.buttonsVisible
    });
  };

  sectionPositionChangeHandler = (event) => {
    if (this.props.sectionIndex === event.target.value) {
      return;
    }

    const copy = [...this.props.userSections];

    const oldSectionPosition = copy.findIndex((elem) => {
      return elem.id === this.props.sectionsArray[this.props.sectionIndex].id;
    });

    const newSectionPosition = copy.findIndex((elem) => {
      return elem.id === this.props.sectionsArray[event.target.value].id;
    });

    let spliced = copy.splice(oldSectionPosition, 1);
    copy.splice(newSectionPosition, 0, spliced[0]);

    firebase.firestore().collection('users').doc(this.props.userData.uid).update({
      sections: copy
    }).then((data) => {
    }).catch(error => {
      console.log(error.message);
    });
  };

  closeAddGameModal() {
    $("#addGame").modal('hide');
  }

  openModalWarningWindow = () => {
    this.setState({
      showModalWindow: true
    }, () => {
      $("#modalWarning").modal('show');
      $("#modalWarning").on('hidden.bs.modal', this.resetState);
    });
  };

  openAddGameWindow = () => {
    this.setState({
      showAddGameWindow: true
    }, () => {
      $("#addGame").modal('show');
      $("#addGame").on('hidden.bs.modal', this.resetState);
    });
  };

  componentWillUnmount() {
    $("#modalWarning").unbind('hidden.bs.modal');
    $("#addGame").unbind('hidden.bs.modal');
  }

  resetState = () => {
    this.setState({
      showModalWindow: false,
      showAddGameWindow: false
    })
  };

  doOnEdit = () => {
    if (!this.state.editMode) {
      this.setState({
        editMode: true,
        sectionInputValue: this.props.name
      }, () => {
        if (this.linkToTextarea) {
          this.linkToTextarea.focus();
        }
      });
    }
  };

  sectionInputValueChange = (event) => {
    this.setState({
      sectionInputValue: event.target.value
    });
  };

  doOnSubmit = () => {
    const copy = [...this.props.userSections];

    let targetSection = copy.find((elem) => {
      return elem.id === this.props.id;
    });

    if (targetSection) {
      targetSection.name = this.state.sectionInputValue;
    }

    firebase.firestore().collection('users').doc(this.props.userData.uid).update({
      sections: copy
    }).then((data) => {
    }).catch(error => {
      console.log(error.message);
    });

    this.setState({
      editMode: false
    });
  };

  sectionDelete = () => {
    const copy = [...this.props.userSections];
    const blockCopy = [...this.props.userBlocks].filter((elem) => {
      return elem.sectionId !== this.props.id;
    });

    const targetSectionIndex = copy.findIndex((elem) => {
      return elem.id === this.props.id;
    });

    if (targetSectionIndex > -1) {
      copy.splice(targetSectionIndex, 1);
    }

    this.setState({
      editMode: false
    });

    firebase.firestore().collection('users').doc(this.props.userData.uid).update({
      sections: copy,
      blocks: blockCopy
    }).then((data) => {
    }).catch(error => {
      console.log(error.message);
    });
  };

  doOnCancel = () => {
    this.setState({
      editMode: false,
      gameInputValue: "",
      sectionInputValue: this.props.name
    });
  };

  render() {
    const gamesToRender = this.props.userBlocks.filter((elem) => elem.sectionId === this.props.id).map((elem) => {
      return <UserBlock
        key={elem.id}
        color={this.props.color}
        gameData={elem}
        sectionId={this.props.id}/>;
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

    const positionOptions = this.props.sectionsArray.map((elem, index) => {
      return (
        <option key={index} value={index}>{index}</option>
      );
    });

    const positionPicker = (
      <div className="positionPickerWrapper">
        <select value={this.props.sectionIndex} className="custom-select sectionPositionPicker" onChange={this.sectionPositionChangeHandler}>
          {positionOptions}
        </select>
      </div>
    );

    let actionButtonsClassName = `sectionActionButtons ${this.state.buttonsVisible ? 'sectionActionButtonsVisible' : ''}`;

    const nameAndButtonsBlock = (
      <div className="nameAndButtonsWrapper">
        <h2>{this.props.name}</h2>
        <div className="sectionActions">
          <div className={actionButtonsClassName}>
            <button className="btn" onClick={this.toggleButtons}><img className="sectionEditIcon toggleButton" alt="" src={process.env.PUBLIC_URL + '/icons/navbar-arrow-sections.svg'}/></button>
            <button className="btn" onClick={this.openAddGameWindow}><img className="sectionEditIcon" alt="" src={process.env.PUBLIC_URL + '/icons/action-add-section.svg'}/></button>
            <button className="btn" onClick={this.doOnEdit}><img className="sectionEditIcon" alt="" src={process.env.PUBLIC_URL + '/icons/action-edit-section.svg'}/></button>
            <button className="btn" onClick={this.openModalWarningWindow}><img className="sectionEditIcon" alt="" src={process.env.PUBLIC_URL + '/icons/action-delete-section.svg'}/></button>
            {positionPicker}
          </div>
        </div>
      </div>
    );

    const editForm = (
        <div className="editSectionDiv">
          <textarea
              ref={node => {
                this.linkToTextarea = node;
              }} placeholder="Enter Section Name" className="form-control editSectionInput" rows="1" value={this.state.sectionInputValue} onChange={this.sectionInputValueChange}/>
          <Colors sectionId={this.props.id} color={this.props.color}/>
          <div className="sectionEditButtons">
            <button className="btn btn-dark" onClick={this.doOnSubmit}>OK</button>
            <button className="btn" onClick={this.doOnCancel}>Cancel</button>
          </div>
        </div>
    );

    const modalWarningWindow = (
      <WarningModalWindow
        onProceed={this.sectionDelete}
        message={`Are you sure you want to delete section ${this.props.name}?`} />
    );

    const addGameWindow = (
      <BlockModalWindow
        modalId={"addGame"}
        gameData={{name:"New game"}}
        fullMode={false}
        sectionId={this.props.id}
        closeModal={this.closeAddGameModal}/>
    );

    return (
      <div className="section">
        {(this.state.editMode) ? editForm : nameAndButtonsBlock}
        <div className="inner-section">
          {gamesToRender}
        </div>

        {this.state.showModalWindow ? modalWarningWindow : ""}
        {this.state.showAddGameWindow ? addGameWindow : ""}
      </div>
    );
  }
}

const stateToProps = (state = {}) => {
  return {
    userSections: state.userSections,
    userBlocks: state.userBlocks,
    userData: state.userData
  }
};

const ConnectedUserSection = connect(stateToProps, null)(UserSection);

export default ConnectedUserSection;
