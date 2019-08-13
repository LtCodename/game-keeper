import React from 'react';
import './Statistics.css';

class Statistics extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const oneGame = "game";
    const games = "games";

    let sectionsNumber = 0;
    let gamesNumber = 0;
    let years = [];
    let year = ``;
    let allGamesTogether = 0;

    let onPC = 0;
    let onSwitch = 0;
    let onPS4 = 0;
    let onXbox = 0;
    let oniOS = 0;

     this.props.data.forEach(section => {
       //How many sections
       sectionsNumber += section.content.length;

       section.content.forEach(prop => {
         //How many games
         gamesNumber += prop.games.length;

         prop.games.forEach(game => {
           //Unique years
           year = game.releaseDate.substring(0,4);

           if (years.indexOf(year) === -1) {
             years.push(year);
           }

           years.sort((a, b) => {

             if (a < b) {
               return -1;
             }
             if (a > b) {
               return 1;
             }
             return 0;
           });

           //How many platforms
           game.platforms.forEach(platform => {
             switch (platform.name) {
               case "PC":
                 onPC++;
                 break;
               case "Nintendo Switch":
                 onSwitch++;
                 break;
               case "PlayStation 4":
                 onPS4++;
                 break;
               case "iOS":
                 oniOS++;
                 break;
               case "Xbox":
                 onXbox++;
                 break;
               default:
             }
           });

           allGamesTogether = onPC + onSwitch + onPS4 + oniOS + onXbox;
         });
       });
     });

    const listSectionsGames = (
      <p className="dashboardText">{`This Game Keeper contains ${this.props.data.length} ${(this.props.data.length === 1) ? `list` : `lists`}
        with ${sectionsNumber} ${(sectionsNumber === 1) ? `section` : `sections`} and ${gamesNumber} ${(gamesNumber === 1) ? `game` : `games`} inside
        ${(sectionsNumber === 1) ? `it` : `them`}.`}</p>
    );

    const platforms = (
      <p className="dashboardText">{`You have added
        ${(!allGamesTogether) ? `0 games` : ``}
        ${onPC ? `${onPC} PC ${(onPC === 1) ? oneGame : games} *` : ``}
        ${onSwitch ? `${onSwitch} Nintendo Switch ${(onSwitch === 1) ? oneGame : games} *` : ``}
        ${onPS4 ? `${onPS4} ${(onPS4 === 1) ? oneGame : games} for PlayStation 4 *` : ``}
        ${oniOS ? `${oniOS} ${(oniOS === 1) ? oneGame : games} for iOS *` : ``}
        ${onXbox ? `${onXbox} Xbox ${(onXbox === 1) ? oneGame : games} *` : ``}
         in your Game Keeper.`}</p>
    );

    const gamesInYears = (
      <p className="dashboardText">{`Your Game Keeper represents games released in ${years.length} different years! From ${years[1]} to ${years[years.length - 1]}`}</p>
    );

    return (
      <div className="statistics">
        {listSectionsGames}
        {platforms}
        {(years.length > 1) ? gamesInYears : ``}
      </div>
    )
  }
}

export default Statistics;
