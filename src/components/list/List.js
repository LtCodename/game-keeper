import React from 'react';
import Section from '../section/Section.js';
import Colors from '../colors/Colors.js';
import './List.css';
import WarningModalWindow from '../warning-modal-window/WarningModalWindow.js';
import reducers from '../../redux/reducers';
import { connect } from 'react-redux'
declare var $;

class List extends React.Component {
  constructor(props) {
    super(props);

    this.doOnEdit = this.doOnEdit.bind(this);
    this.doOnCancel = this.doOnCancel.bind(this);
    this.doOnSubmitListName = this.doOnSubmitListName.bind(this);
    this.doOnAddSection = this.doOnAddSection.bind(this);
    this.listNameInputValueChange = this.listNameInputValueChange.bind(this);
    this.sectionNameInputValueChange = this.sectionNameInputValueChange.bind(this);
    this.holdColorForNewSection = this.holdColorForNewSection.bind(this);
    this.openModalWarningWindow = this.openModalWarningWindow.bind(this);
    this.resetState = this.resetState.bind(this);
    this.listPositionChangeHandler = this.listPositionChangeHandler.bind(this);
    this.beforeAddingNewSection = this.beforeAddingNewSection.bind(this);
    
    this.state = {
      renameListMode: false,
      addSectionMode: false,
      listNameInputValue: this.props.allLists[this.props.listIndex].name,
      sectionNameInputValue: "",
      colorFofNewSection: "",
      showModalWindow: false
    };
  }

  static defaultProps = {
    content: [],
    newListName: ""
  }

  beforeAddingNewSection() {
    if (!this.state.sectionNameInputValue) {
      this.doOnCancel();
      return;
    }

    this.props.addSection(this.state.sectionNameInputValue, this.state.colorForNewSection, this.props.listIndex);
  }

  listPositionChangeHandler(event) {
    this.props.changeListPosition(event.target.value, this.props.listIndex, this.props.allLists.length);
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
        listNameInputValue: this.props.allLists[this.props.listIndex].name
      });
    }
  }

  doOnCancel() {
    this.setState({
      renameListMode: false,
      addSectionMode: false,
      listNameInputValue: this.props.allLists[this.props.listIndex].name,
      sectionNameInputValue: ""
    });
  }

  doOnSubmitListName() {
    this.props.rename(this.props.listIndex, this.state.listNameInputValue);

    this.setState({
      renameListMode: false,
      listNameInputValue: ""
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

  render() {
    const sectionsToRender = this.props.allLists[this.props.listIndex].content.map((elem, index) => {

      return (
        <Section
          key={elem.id}
          id={elem.id}
          sectionIndex={index}/>);
    })

    const modalWarningWindow = (
      <WarningModalWindow
        onProceed={() => this.props.deleteList(this.props.listIndex, this.props.allLists.length)}
        message={`Are you sure you want to delete list ${this.props.allLists[this.props.listIndex].name}?`} />
    );

    const positionOptions = this.props.allLists.map((elem, index) => {
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
        <h1 className="listName">{this.props.allLists[this.props.listIndex].name}</h1>
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
        <button className="btn btn-dark" onClick={this.beforeAddingNewSection}>OK</button>
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
    rename: (listIndex, name) => {
      dispatch({ type: reducers.actions.listsActions.LIST_RENAME, listIndex: listIndex, name: name });
    },
    changeListPosition: (newListPosition, oldListPosition, listsLength) => {
      dispatch({ type: reducers.actions.listsActions.LIST_CHANGE_POSITION, newListPosition: newListPosition, oldListPosition: oldListPosition });
      dispatch({ type: reducers.actions.selectedListIndexActions.SLI_CHANGE, index: newListPosition, listsLength: listsLength });
    },
    deleteList: (index, listsLength) => {
      dispatch({ type: reducers.actions.listsActions.LIST_DELETE, index: index });
      dispatch({ type: reducers.actions.selectedListIndexActions.SLI_CHANGE_ON_DELETE, listsLength: listsLength });
    },
    addSection: (sectionName, sectionColor, listIndex) => {
      dispatch({ type: reducers.actions.listsActions.LIST_ADD_SECTION, sectionName: sectionName, sectionColor: sectionColor, listIndex: listIndex });
    }
  }
};

const stateToProps = (state = {}) => {
  return {
    allLists: state.lists,
    listIndex: state.selectedListIndex
  }
};

const ListConnected = connect(stateToProps, listDispatchToProps)(List);

export default ListConnected;
