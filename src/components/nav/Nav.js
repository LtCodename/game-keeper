import React from 'react';
import './Nav.css';

class Nav extends React.Component {

  constructor(props) {
    super(props);

    this.doOnAdd = this.doOnAdd.bind(this);
    this.doOnCancel = this.doOnCancel.bind(this);
    this.submitNewList = this.submitNewList.bind(this);
    this.inputValueChange = this.inputValueChange.bind(this);

    this.state = {
      addMode: false,
      inputValue: ""
    };
  }

  doOnAdd() {
    this.setState({
      addMode: true
    })
  }

  doOnCancel() {
    this.setState({
      addMode: false
    })
  }

  submitNewList() {
    if (!this.state.inputValue.length) {
      this.setState({
        addMode: false
      })
      return;
    }

    this.props.doOnAdd(this.state.inputValue);

    this.setState({
      addMode: false,
      inputValue: ""
    })
  }

  inputValueChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  render() {

    let buttonsToRender = this.props.content.map((elem, index) => {

      let className = "navButton btn btn-light";

      if (this.props.indexToHighligth === index) {
        className += " navButtonActive";
      }

      return <button className={className} type="button" key={elem.id} onClick={() => this.props.doOnClick(index)}>{elem.name}</button>;
    })

    const inputBit = (
      <div>
        <input type="text" className="form-control" placeholder="Enter new name" value={this.state.inputValue} onChange={this.inputValueChange}></input>
        <button className="btn btn-dark" onClick={this.submitNewList}>Submit list</button>
        <button className="btn " onClick={this.doOnCancel}>Cancel</button>
      </div>
    );

    const buttonBit = (
      <div>
        <button className="btn" onClick={this.doOnAdd}>Add list</button>
      </div>
    );

    return (
      <nav id="navbar">
        <header>Game Keeper</header>
        {buttonsToRender}
        {(this.state.addMode) ? inputBit : buttonBit}
        <a className="btn btn-link downloadData" download="lists.js" href={this.props.fileLink}>DOWNLOAD</a>
      </nav>
    )
  }
}

export default Nav;
