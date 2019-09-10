import React from 'react';
import './App.css';
import List from './components/list/List.js';
import Nav from './components/nav/Nav.js';
import Footer from './components/footer/Footer.js';
import Header from './components/header/Header.js';
import Dashboard from './components/dashboard/Dashboard.js';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const dashboard = (
      <Dashboard
        data={this.props.lists}/>
    );

    let listOrDashboard;

    if (this.props.selectedListIndex === null) {
      listOrDashboard = dashboard;
    }else {
      listOrDashboard = <List
        listName={this.props.lists[this.props.selectedListIndex].name}
        content={this.props.lists[this.props.selectedListIndex].content}
        listIndex={this.props.selectedListIndex}/>
    }

    const nav = (
      <Nav
        content={this.props.lists}
        indexToHighligth={this.props.selectedListIndex}/>
    );

    const footer = (
      <Footer/>
    );

    const header = (
      <Header/>
    );

    return (
      <div className="appWrapper">
        <header>
          {header}
        </header>
        <div className="contentWrapper">
            {(this.props.selectedListIndex === null) ? "" : nav}
            {listOrDashboard}
        </div>
        <footer>
          {footer}
        </footer>
      </div>
    );
  }
}

export default App;
