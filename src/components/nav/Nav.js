import React from 'react';

class Nav extends React.Component {
  render() {
    return (
      <nav id="navbar">
        <header>Game Keeper</header>
        <ul>
          <li><a class="nav-link" href="#">2019</a></li>
          <li><a class="nav-link" href="#">Queue</a></li>
          <li><a class="nav-link" href="#">Development</a></li>
          <li><a class="nav-link" href="#">Wishlist</a></li>
        </ul>
      </nav>
    )
  }
}

export default Nav;
