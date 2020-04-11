import React from 'react';
import UserSection from '../user-section/UserSection.js';
import Colors from '../colors/Colors.js';
import './UserList.css';
import WarningModalWindow from '../warning-modal-window/WarningModalWindow.js';
import indexActions from '../../redux/reducers/selectedListIndexReducer';
import { connect } from 'react-redux'
import fire from "../../Firebase";
declare var $;

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renameListMode: false,
      addSectionMode: false,
      listNameInputValue: this.props.userLists[this.props.listIndex].name,
      sectionNameInputValue: "",
      colorFofNewSection: "",
      showModalWindow: false,
      buttonsVisible: false
    };
  }

  linkToRenameListTextarea;
  linkToAddSectionTextarea;

  addNewSection = () => {
    if (!this.state.sectionNameInputValue) {
      this.doOnCancel();
      return;
    }

    const newSection = {
      id: `id${new Date().getTime()}`,
      name: this.state.sectionNameInputValue,
      color: this.state.colorForNewSection || "witch-haze",
      listId: this.props.userLists[this.props.listIndex].id
    };

    const allSections = [...this.props.userSections, newSection];

    fire.firestore().collection('users').doc(this.props.userData.uid).update({
      sections: allSections
    }).then((data) => {
    }).catch(error => {
      console.log(error.message);
    });

    this.setState({
      colorForNewSection: ""
    });
  };

  listPositionChangeHandler = (event) => {
    const copy = [...this.props.userLists];
    if (this.props.listIndex === event.target.value) {
      return;
    }
    let spliced = copy.splice(this.props.listIndex, 1);
    copy.splice(event.target.value, 0, spliced[0]);

    this.props.changeListIndex(event.target.value, this.props.userLists.length);
    fire.firestore().collection('users').doc(this.props.userData.uid).update({
      lists: copy
    }).then((data) => {
    }).catch(error => {
      console.log(error.message);
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
    });
  };

  holdColorForNewSection = (color) => {
    this.setState({
      colorForNewSection: color
    });
  };

  componentWillReceiveProps(newProps){
    this.setState({
      renameListMode: false,
      addSectionMode: false,
      listNameInputValue: newProps.listName,
      sectionNameInputValue: ""
    });
  }

  doOnAddSection = () => {
    if (!this.state.addSectionMode) {
      this.setState({
        addSectionMode: true,
        listNameInputValue: ""
      }, () => {
        if (this.linkToAddSectionTextarea) {
          this.linkToAddSectionTextarea.focus();
        }
      });
    }
  };

  doOnEdit = () => {
    if (!this.state.renameListMode) {
      this.setState({
        renameListMode: true,
        listNameInputValue: this.props.userLists[this.props.listIndex].name
      }, () => {
        if (this.linkToRenameListTextarea) {
          this.linkToRenameListTextarea.focus();
        }
      });
    }
  };

  doOnCancel = () => {
    this.setState({
      renameListMode: false,
      addSectionMode: false,
      listNameInputValue: this.props.userLists[this.props.listIndex].name,
      sectionNameInputValue: ""
    });
  };

  doOnSubmitListName = () => {
    const copy = [...this.props.userLists];

    copy[this.props.listIndex] = {
      ...copy[this.props.listIndex],
      name: this.state.listNameInputValue
    };

    fire.firestore().collection('users').doc(this.props.userData.uid).update({
      lists: copy
    }).then((data) => {
      this.setState({
        renameListMode: false,
        listNameInputValue: ""
      });
    }).catch(error => {
      this.setState({
        renameListMode: false,
        listNameInputValue: ""
      });
      console.log(error.message);
    });
  };

  listNameInputValueChange = (event) => {
    this.setState({
      listNameInputValue: event.target.value
    });
  };

  sectionNameInputValueChange = (event) => {
    this.setState({
      sectionNameInputValue: event.target.value
    });
  };

  onDeleteList = () => {
    const deletedSectionsIds = [];
    const copy = [...this.props.userLists];

    const sectionCopy = [...this.props.userSections].filter((elem) => {
      if (elem.listId !== copy[this.props.listIndex].id) {
        return true;
      } else {
        deletedSectionsIds.push(elem.id);
        return false;
      }
    });

    const blocksCopy = [...this.props.userBlocks].filter((elem) => {
      return deletedSectionsIds.indexOf(elem.sectionId) === -1;
    });

    copy.splice(this.props.listIndex, 1);

    this.props.changeListIndexOnDelete(this.props.userLists.length);
    fire.firestore().collection('users').doc(this.props.userData.uid).update({
      lists: copy,
      sections: sectionCopy,
      blocks: blocksCopy
    }).then((data) => {
    }).catch(error => {
      console.log(error.message);
    });
  };

  toggleButtons = () => {
    this.setState({
      buttonsVisible: !this.state.buttonsVisible
    });
  };

  render() {
    const sectionsToRender = this.props.userSections.filter((elem) => elem.listId === this.props.userLists[this.props.listIndex].id)
      .map((section, index, array) => {
        return (
          <UserSection
            key={section.id}
            id={section.id}
            name={section.name}
            color={section.color}
            listId={section.listId}
            sectionsArray={array}
            sectionIndex={index}/>);
      });

    const modalWarningWindow = (
      <WarningModalWindow
        onProceed={this.onDeleteList}
        message={`Are you sure you want to delete list ${this.props.userLists[this.props.listIndex].name}?`} />
    );

    const positionOptions = this.props.userLists.map((elem, index) => {
      return (
        <option key={index} value={index}>{index}</option>
      );
    });

    const listPositionPicker = (
      <div>
        <select value={this.props.listIndex} className="custom-select listPositionPicker" onChange={this.listPositionChangeHandler}>
          {positionOptions}
        </select>
      </div>
    );

    let actionButtonsClassName = `listActionButtons ${this.state.buttonsVisible ? 'listActionButtonsVisible' : ''}`;

    const nameAndButtonsBlock = (
      <div className="listWrapper">
        <span className="listName">{this.props.userLists[this.props.listIndex].name}</span>
        <div className={actionButtonsClassName}>
          <button className="btn" onClick={this.toggleButtons}><img className="listsEditIcon toggleButton" alt="" src={process.env.PUBLIC_URL + '/icons/navbar-arrow-lists.svg'}/></button>
          <button className="btn" onClick={this.doOnAddSection}><img className="listsEditIcon" alt="" src={process.env.PUBLIC_URL + '/icons/action-add-list.svg'}/></button>
          <button className="btn" onClick={this.doOnEdit}><img className="listsEditIcon" alt="" src={process.env.PUBLIC_URL + '/icons/action-edit-list.svg'}/></button>
          <button className="btn" onClick={this.openModalWarningWindow}><img className="listsEditIcon" alt="" src={process.env.PUBLIC_URL + '/icons/action-delete-list.svg'}/></button>
          {listPositionPicker}
        </div>
      </div>
    );

    const editListNameForm = (
      <div className="lt-row list-edit-wrapper">
        <textarea
            ref={node => {
              this.linkToRenameListTextarea = node;
            }}
            placeholder="Enter List Name"
            className="edit-list-input"
            rows="1"
            value={this.state.listNameInputValue}
            onChange={this.listNameInputValueChange}/>
        <div className="lt-row">
          <button className="list-edit-button" onClick={this.doOnSubmitListName}>Confirm</button>
          <button className="list-edit-button" onClick={this.doOnCancel}>Cancel</button>
        </div>
      </div>
    );

    const addNewSectionForm = (
      <div className="addSectionWrapper lt-row">
        <textarea
            ref={node => {
              this.linkToAddSectionTextarea = node;
            }}
            placeholder="Enter Section Name"
            className="addSectionInput"
            rows="1"
            value={this.state.sectionNameInputValue}
            onChange={this.sectionNameInputValueChange}/>
        <Colors passColorToSection={this.holdColorForNewSection}/>
        <div>
          <button className="section-edit-button" onClick={this.addNewSection}>OK</button>
          <button className="section-edit-button" onClick={this.doOnCancel}>Cancel</button>
        </div>
      </div>
    );

    return (
      <div className="allContent">
        {this.state.renameListMode ? editListNameForm : this.state.addSectionMode ? addNewSectionForm : nameAndButtonsBlock}
        {sectionsToRender}
        {this.state.showModalWindow ? modalWarningWindow : ""}
      </div>
    );
  }
}

const listDispatchToProps = (dispatch) => {
  return {
    changeListIndex: (newListPosition, listsLength) => {
      dispatch({ type: indexActions.actions.SLI_CHANGE, index: newListPosition, listsLength: listsLength });
    },
    changeListIndexOnDelete: (listsLength) => {
      dispatch({ type: indexActions.actions.SLI_CHANGE_ON_DELETE, listsLength: listsLength });
    }
  }
};

const stateToProps = (state = {}) => {
  return {
    listIndex: state.selectedListIndex,
    userLists: state.userLists,
    userBlocks: state.userBlocks,
    userSections: state.userSections,
    userData: state.userData
  }
};

const UserListConnected = connect(stateToProps, listDispatchToProps)(UserList);

export default UserListConnected;
