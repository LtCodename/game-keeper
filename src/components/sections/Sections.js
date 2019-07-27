import React from 'react';
import Section from '../section/Section.js';

class Sections extends React.Component {
  render() {
    return (
      <div class="all-content">
        <h1>2019</h1>

        <Section name={"Roster"} />

        <div class="section">
          <h2>Completed</h2>
          <div class="inner-section">
            <div class="game-block" id="completed">
              <p>Metro Exodus</p>
            </div>
            <div class="game-block" id="completed">
              <p>Pokémon: Let's Go Eevee!</p>
            </div>
            <div class="game-block" id="completed">
              <p>Thronebreaker: The Witcher Tales</p>
            </div>
            <div class="game-block" id="completed">
              <p>Assassin’s Creed Odyssey</p>
            </div>
            <div class="game-block" id="completed">
              <p>The Walking Dead: The Final Season</p>
            </div>
            <div class="game-block" id="completed">
              <p>Celeste</p>
            </div>
            <div class="game-block" id="completed">
              <p>Assassin’s Creed Origins</p>
            </div>
            <div class="game-block" id="completed">
              <p>What Remains Of Edith Finch</p>
            </div>
            <div class="game-block" id="completed">
              <p>Quantum Break</p>
            </div>
            <div class="game-block" id="completed">
              <p>Bulletstorm</p>
            </div>
            <div class="game-block" id="completed">
              <p>Heavy Rain</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Put Aside</h2>
          <div class="inner-section">
            <div class="game-block" id="put-aside">
              <p>The Binding of Isaac: Afterbirth +</p>
            </div>
            <div class="game-block" id="put-aside">
              <p>Prime World: Defenders</p>
            </div>
            <div class="game-block" id="put-aside">
              <p>Just Dance 2019</p>
            </div>
            <div class="game-block" id="put-aside">
              <p>DiRT Rally 2.0</p>
            </div>
            <div class="game-block" id="put-aside">
              <p>The Elder Scrolls Online</p>
            </div>
            <div class="game-block" id="put-aside">
              <p>American Truck Simulator</p>
            </div>
            <div class="game-block" id="put-aside">
              <p>Kerbal Space Program</p>
            </div>
            <div class="game-block" id="put-aside">
              <p>Stardew Valley</p>
            </div>
            <div class="game-block" id="put-aside">
              <p>Apex Legends</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Dropped</h2>
          <div class="inner-section">
            <div class="game-block" id="dropped">
              <p>SOMA</p>
            </div>
            <div class="game-block" id="dropped">
              <p>Dishonored 2</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Shit Game</h2>
          <div class="inner-section">
            <div class="game-block" id="shit">
              <p>Borderlands: The Pre-Sequel</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Sections;
