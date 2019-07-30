import React from 'react';
import Block from '../block/Block.js';
import Colors from '../colors/Colors.js';

class Section extends React.Component {
  static defaultProps = {
    games: []
  }

  constructor(props) {
    super(props);

    this.doOnEdit = this.doOnEdit.bind(this);
    this.inputValueChange = this.inputValueChange.bind(this);
    this.doOnSubmit = this.doOnSubmit.bind(this);
    this.doOnCancel = this.doOnCancel.bind(this);

    this.state = {
      editMode: false,
      inputValue: this.props.sectionName
    };
  }

  doOnEdit() {
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
    this.props.doOnSectionRename(this.state.inputValue);
    this.setState({
      editMode: false
    });
  }

  doOnCancel() {
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
          <button onClick={this.doOnEdit}>Edit</button>
          <button onClick={this.props.doOnSectionDelete}>Delete section</button>
        </div>
      </div>
    );

    const editForm = (
        <div>
          <input type="text" placeholder="Enter new name" value={this.state.inputValue} onChange={this.inputValueChange}></input>
          <button className="submitButtons" onClick={this.doOnSubmit}>Submit name</button>
          <button className="submitButtons" onClick={this.doOnCancel}>Cancel</button>
          <Colors currentColor={this.props.color}/>
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
