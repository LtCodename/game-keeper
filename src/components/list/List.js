import React from 'react';
import Section from '../section/Section.js';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.doOnDelete = this.doOnDelete.bind(this);
    this.doOnEdit = this.doOnEdit.bind(this);
    this.doOnCancel = this.doOnCancel.bind(this);
    this.doOnAccept = this.doOnAccept.bind(this);
    this.inputValueChange = this.inputValueChange.bind(this);

    this.state = {
      editMode: false,
      inputValue: this.props.listName
    };
  }

  static defaultProps = {
    content: [],
    newListName: ""
  }

  doOnDelete() {
    console.log("On Delete");
    this.props.doOnDelete();
  }

  doOnEdit() {
    console.log("On Edit");

    if (!this.state.editMode) {
      this.setState({
        editMode: true
      });
    }
  }

  doOnCancel() {
    console.log("On Cancel");

    this.setState({
      editMode: false,
      inputValue: this.props.listName
    });
  }

  doOnAccept() {
    console.log("On Accept");

    this.props.doOnRename(this.state.inputValue);
    this.setState({
      editMode: false
    });
  }

  inputValueChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  render() {

    let sectionsToRender = this.props.content.map(elem => {
      return <Section key={elem.id} sectionName={elem.name} color={elem.color} games={elem.games} />;
    })

    const nameBlock = (
      <div>
        <h1>{this.props.listName}</h1>
        <div className="actionButtons">
          <button onClick={this.doOnEdit}>Edit name</button>
          <button onClick={this.doOnDelete}>Delete list</button>
        </div>
      </div>
    );

    const editForm = (
      <div>
        <input type="text" placeholder="Enter new name" value={this.state.inputValue} onChange={this.inputValueChange}></input>
        <button className="submitButtons" onClick={this.doOnAccept}>Submit name</button>
        <button className="submitButtons" onClick={this.doOnCancel}>Cancel</button>
      </div>
    );

    return (
      <div className="all-content">
        {(this.state.editMode) ? editForm : nameBlock}
        {sectionsToRender}
      </div>
    );
  }
}

export default List;
