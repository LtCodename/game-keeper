import React from 'react';
import './Nav.css';
import downloadImg from '../../assets/download.png';

class Nav extends React.Component {

  constructor(props) {
    super(props);

    this.doOnAdd = this.doOnAdd.bind(this);
    this.doOnCancel = this.doOnCancel.bind(this);
    this.submitNewList = this.submitNewList.bind(this);
    this.inputValueChange = this.inputValueChange.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.switchBetweenTabs = this.switchBetweenTabs.bind(this);
    this.goToDashboard = this.goToDashboard.bind(this);

    this.state = {
      addMode: false,
      inputValue: "",
      navbarVisible: false
    };
  }

  switchBetweenTabs(index) {
    this.props.doOnClick(index);
    this.setState({
      navbarVisible: false
    });
  }

  goToDashboard() {
    this.props.doOnClick(null)
    this.setState({
      navbarVisible: false
    });
  }

  toggleNavbar() {
    if (!this.state.navbarVisible) {
      this.setState({
        navbarVisible: true
      });
    }else {
      this.setState({
        navbarVisible: false
      });
    }
  }

  doOnAdd() {
    this.setState({
      addMode: true
    })
  }

  doOnCancel() {
    this.setState({
      addMode: false,
      inputValue: ""
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

      return <button className={className} type="button" key={elem.id} onClick={() => this.switchBetweenTabs(index)}>{elem.name}</button>;
    })

    const inputBit = (
      <div>
        <input type="text" className="form-control" placeholder="Enter new name" value={this.state.inputValue} onChange={this.inputValueChange}></input>
        <button className="btn btn-dark" onClick={this.submitNewList}>OK</button>
        <button className="btn" onClick={this.doOnCancel}>Cancel</button>
      </div>
    );

    const buttonBit = (
      <div>
        <button className="btn btn-warning" onClick={this.doOnAdd}>Add List</button>
      </div>
    );

    const hideButton = (
      <button className="btn hideNavButton" onClick={this.toggleNavbar}>Menu</button>
    );

    let navClassName = "navBar";

    if (this.state.navbarVisible) {
        navClassName += " navBarVisible";
    }

    return (
      <nav id="navbar">
        <div className="nameAndButton">
           <button className="logoButton btn" onClick={this.goToDashboard}>Game Keeper</button>
          {hideButton}
        </div>
        <div className={navClassName}>
          {/*}<button type="button" className="navButton btn btn-danger" onClick={this.goToDashboard}>Dashboard</button>*/}
          {buttonsToRender}
          {(this.state.addMode) ? inputBit : buttonBit}
          <a className="downloadData" download="lists.js" href={this.props.fileLink}><img className="downloadImg" src={downloadImg} alt=""></img></a>
        </div>
      </nav>
    )
  }
}

export default Nav;
