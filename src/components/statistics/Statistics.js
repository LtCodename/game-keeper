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

    let onPC = 0;
    let onSwitch = 0;
    let onPS4 = 0;
    let onXbox = 0;
    let iOS = 0;
    
    for (const section in this.props.data) {
      //How many sections
      sectionsNumber += this.props.data[section].content.length;

      for (const prop in this.props.data[section].content) {
        //How many games
        gamesNumber += this.props.data[section].content[prop].games.length;

        for (const game in this.props.data[section].content[prop].games) {

          //Unique years
          let year = this.props.data[section].content[prop].games[game].releaseDate.substring(0,4);

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
          for (const platform in this.props.data[section].content[prop].games[game].platforms) {
            switch (this.props.data[section].content[prop].games[game].platforms[platform].name) {
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
                iOS++;
                break;
              case "Xbox":
                onXbox++;
                break;
              default:
            }
          }
        }
      }
    }

    return (
      <div className="statistics">
        <p className="dashboardText">{`There are ${this.props.data.length} lists in your Game Keeper.`}</p>
        <p className="dashboardText">{`There are ${sectionsNumber} sections in those lists.`}</p>
        <p className="dashboardText">{`There are ${gamesNumber} games in those sections.`}</p>
        <p className="dashboardText">{`There are ${onPC} PC ${(onPC === 1) ? oneGame : games}, ${onSwitch} Nintendo Switch ${(onSwitch === 1) ? oneGame : games},
          ${onPS4} ${(onPS4 === 1) ? oneGame : games} for PlayStation 4, ${iOS} ${(iOS === 1) ? oneGame : games} for iOS and ${onXbox} Xbox ${(onXbox === 1) ? oneGame : games}.`}</p>
        <p className="dashboardText">{`Your Game Keeper represents games released in ${years.length} different years! From ${years[0]} to ${years[years.length - 1]}`}</p>
      </div>
    )
  }
}

export default Statistics;
