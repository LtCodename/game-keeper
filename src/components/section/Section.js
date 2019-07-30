import React from 'react';
import Block from '../block/Block.js';

class Section extends React.Component {
  static defaultProps = {
    games: []
  }

  constructor(props) {
    super(props);

    this.doOnDelete = this.doOnDelete.bind(this);
    this.doOnEdit = this.doOnEdit.bind(this);
    this.inputValueChange = this.inputValueChange.bind(this);
    this.doOnSubmit = this.doOnSubmit.bind(this);
    this.doOnCancel = this.doOnCancel.bind(this);

    this.state = {
      editMode: false,
      inputValue: this.props.sectionName,
      id: this.props.id
    };
  }

  doOnDelete() {
    console.log("On Delete");
    this.props.doOnSectionDelete(this.state.id);
  }

  doOnEdit() {
    console.log("On Edit");

    if (!this.state.editMode) {
      this.setState({
        editMode: true
      });
    }
  }

  inputValueChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  doOnSubmit() {
    console.log("On Submit");

    this.props.doOnSectionRename(this.state.inputValue, this.state.id);
    this.setState({
      editMode: false
    });
  }

  doOnCancel() {
    console.log("On Cancel");

    this.setState({
      editMode: false,
      inputValue: this.props.sectionName
    });
  }

  render() {
    let gamesToRender = this.props.games.map(elem => {
      return <Block key={elem.id} color={this.props.color} gameName={elem.name}/>;
    })

    const nameBlock = (
      <div>
        <h2>{this.props.sectionName}</h2>
        <div className="actionButtons">
          <button onClick={this.doOnEdit}>Edit name</button>
          <button onClick={this.doOnDelete}>Delete section</button>
        </div>
      </div>
    );

    const editForm = (
        <div>
          <input type="text" placeholder="Enter new name" value={this.state.inputValue} onChange={this.inputValueChange}></input>
          <button className="submitButtons" onClick={this.doOnSubmit}>Submit name</button>
          <button className="submitButtons" onClick={this.doOnCancel}>Cancel</button>
        </div>

    );

    return (
      <div className="section">
        {(this.state.editMode) ? editForm : nameBlock}
        <div className="inner-section">
          {gamesToRender}
        </div>
      </div>
    );
  }
}

export default Section;
