import React from 'react';
import './Nav.css';

class Nav extends React.Component {
  render() {

    let buttonsToRender = this.props.content.map((elem, index) => {

      let className = "navButton";

      if (this.props.indexToHighligth === index) {
        className += " navButtonActive";
      }

      return <button className={className} type="button" key={elem.id} onClick={() => this.props.doOnClick(index)}>{elem.name}</button>;
    })

    return (
      <nav id="navbar">
        <header>Game Keeper</header>
        {buttonsToRender}
      </nav>
    )
  }
}

export default Nav;
