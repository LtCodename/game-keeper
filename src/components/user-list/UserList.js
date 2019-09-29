import React from 'react';
import UserSection from '../user-section/UserSection.js';
import Colors from '../colors/Colors.js';
import './UserList.css';
import WarningModalWindow from '../warning-modal-window/WarningModalWindow.js';
import reducers from '../../redux/reducers';
import { connect } from 'react-redux'
declare var $;
declare var firebase;

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.doOnEdit = this.doOnEdit.bind(this);
    this.onDeleteList = this.onDeleteList.bind(this);
    this.doOnCancel = this.doOnCancel.bind(this);
    this.doOnSubmitListName = this.doOnSubmitListName.bind(this);
    this.doOnAddSection = this.doOnAddSection.bind(this);
    this.listNameInputValueChange = this.listNameInputValueChange.bind(this);
    this.sectionNameInputValueChange = this.sectionNameInputValueChange.bind(this);
    this.holdColorForNewSection = this.holdColorForNewSection.bind(this);
    this.openModalWarningWindow = this.openModalWarningWindow.bind(this);
    this.resetState = this.resetState.bind(this);
    this.listPositionChangeHandler = this.listPositionChangeHandler.bind(this);
    this.addNewSection = this.addNewSection.bind(this);

    this.state = {
      renameListMode: false,
      addSectionMode: false,
      listNameInputValue: this.props.userLists[this.props.listIndex].name,
      sectionNameInputValue: "",
      colorFofNewSection: "",
      showModalWindow: false
    };
  }

  static defaultProps = {
    content: [],
    newListName: ""
  }

  addNewSection() {
    if (!this.state.sectionNameInputValue) {
      this.doOnCancel();
      return;
    }

    const newSection = {
      id: `id${new Date().getTime()}`,
      name: this.state.sectionNameInputValue,
      color: this.state.colorForNewSection || "ce-soir",
      listId: this.props.userLists[this.props.listIndex].id
    }

    const allSections = [...this.props.userSections, newSection];

    firebase.firestore().collection('users').doc(this.props.userData.uid).update({
      sections: allSections
    }).then((data) => {
    }).catch(error => {
      console.log(error.message);
    });

    this.setState({
      colorForNewSection: ""
    });
  }

  listPositionChangeHandler(event) {
    const copy = [...this.props.userLists];
    if (this.props.listIndex === event.target.value) {
      return;
    }
    let spliced = copy.splice(this.props.listIndex, 1);
    copy.splice(event.target.value, 0, spliced[0]);

    this.props.changeListIndex(event.target.value, this.props.userLists.length);
    firebase.firestore().collection('users').doc(this.props.userData.uid).update({
      lists: copy
    }).then((data) => {
    }).catch(error => {
      console.log(error.message);
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

  resetState() {
    this.setState({
      showModalWindow: false
    })
  }

  holdColorForNewSection(color) {
    this.setState({
      colorForNewSection: color
    });
  }

  componentWillReceiveProps(newProps){
    this.setState({
      renameListMode: false,
      addSectionMode: false,
      listNameInputValue: newProps.listName,
      sectionNameInputValue: ""
    });
  }

  doOnAddSection() {
    if (!this.state.addSectionMode) {
      this.setState({
        addSectionMode: true,
        listNameInputValue: ""
      });
    }
  }

  doOnEdit() {
    if (!this.state.renameListMode) {
      this.setState({
        renameListMode: true,
        listNameInputValue: this.props.userLists[this.props.listIndex].name
      });
    }
  }

  doOnCancel() {
    this.setState({
      renameListMode: false,
      addSectionMode: false,
      listNameInputValue: this.props.userLists[this.props.listIndex].name,
      sectionNameInputValue: ""
    });
  }

  doOnSubmitListName() {
    const copy = [...this.props.userLists];

    copy[this.props.listIndex] = {
      ...copy[this.props.listIndex],
      name: this.state.listNameInputValue
    };

    firebase.firestore().collection('users').doc(this.props.userData.uid).update({
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
  }

  listNameInputValueChange(event) {
    this.setState({
      listNameInputValue: event.target.value
    });
  }

  sectionNameInputValueChange(event) {
    this.setState({
      sectionNameInputValue: event.target.value
    });
  }

  onDeleteList() {
    const copy = [...this.props.userLists];
    copy.splice(this.props.listIndex, 1);

    this.props.changeListIndexOnDelete(this.props.userLists.length);
    firebase.firestore().collection('users').doc(this.props.userData.uid).update({
      lists: copy
    }).then((data) => {
    }).catch(error => {
      console.log(error.message);
    });
  }

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
    })

    const listPositionPicker = (
      <div>
        <select value={this.props.listIndex} className="custom-select listPositionPicker" onChange={this.listPositionChangeHandler}>
          {positionOptions}
        </select>
      </div>
    );

    const nameAndButtonsBlock = (
      <div className="listWrapper">
        <h1 className="listName">{this.props.userLists[this.props.listIndex].name}</h1>
        <div className="actionButtons">
          <button className="btn" onClick={this.doOnEdit}><img className="editIcon" alt="" src={process.env.PUBLIC_URL + '/icons/action-edit-list.svg'}></img></button>
          <button className="btn" onClick={this.doOnAddSection}><img className="editIcon" alt="" src={process.env.PUBLIC_URL + '/icons/action-add-list.svg'}></img></button>
          <button className="btn" onClick={this.openModalWarningWindow}><img className="editIcon" alt="" src={process.env.PUBLIC_URL + '/icons/action-delete-list.svg'}></img></button>
          {listPositionPicker}
        </div>

      </div>
    );

    const editListNameForm = (
      <div className="editListDiv">
        <input className="editListInput form-control" type="text" placeholder="Enter new name" value={this.state.listNameInputValue} onChange={this.listNameInputValueChange}></input>
        <button className="btn btn-dark" onClick={this.doOnSubmitListName}>OK</button>
        <button className="btn" onClick={this.doOnCancel}>Cancel</button>
      </div>
    );

    const addNewSectionForm = (
      <div className="addListDiv">
        <input className="addListInput form-control" type="text" placeholder="Enter section name" value={this.state.sectionNameInputValue} onChange={this.sectionNameInputValueChange}></input>
        <button className="btn btn-dark" onClick={this.addNewSection}>OK</button>
        <button className="btn" onClick={this.doOnCancel}>Cancel</button>
        <Colors passColorToSection={this.holdColorForNewSection}/>
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
      dispatch({ type: reducers.actions.selectedListIndexActions.SLI_CHANGE, index: newListPosition, listsLength: listsLength });
    },
    changeListIndexOnDelete: (listsLength) => {
      dispatch({ type: reducers.actions.selectedListIndexActions.SLI_CHANGE_ON_DELETE, listsLength: listsLength });
    }
  }
};

const stateToProps = (state = {}) => {
  return {
    listIndex: state.selectedListIndex,
    userLists: state.userLists,
    userSections: state.userSections,
    userData: state.userData
  }
};

const UserListConnected = connect(stateToProps, listDispatchToProps)(UserList);

export default UserListConnected;
