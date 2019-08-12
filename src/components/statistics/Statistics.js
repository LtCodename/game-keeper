import React from 'react';
import './Statistics.css';

class Statistics extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    let sectionsNumber = 0;
    let gamesNumber = 0;
    let years = [];

    let onPC = 0;
    let gameWordPC = "games";
    let onSwitch = 0;
    let gameWordSwitch = "games";
    let onPS4 = 0;
    let gameWordPS4 = "games";
    let onXbox = 0;
    let gameWordXbox = "games";
    let iOS = 0;
    let gameWordiOS = "games";

    for (var section in this.props.data) {
      //How many sections
      sectionsNumber += this.props.data[section].content.length;

      for (var prop in this.props.data[section].content) {
        //How many games
        gamesNumber += this.props.data[section].content[prop].games.length;

        for (var game in this.props.data[section].content[prop].games) {

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
          for (var platform in this.props.data[section].content[prop].games[game].platforms) {
            switch (this.props.data[section].content[prop].games[game].platforms[platform].name) {
              case "PC":
                onPC++;
                (onPC === 1) ? gameWordPC = "game" : gameWordPC = "games";
                break;
              case "Nintendo Switch":
                onSwitch++;
                (onSwitch === 1) ? gameWordSwitch = "game" : gameWordSwitch = "games";
                break;
              case "PlayStation 4":
                onPS4++;
                (onPS4 === 1) ? gameWordPS4 = "game" : gameWordPS4 = "games";
                break;
              case "iOS":
                iOS++;
                (iOS === 1) ? gameWordiOS = "game" : gameWordiOS = "games";
                break;
              case "Xbox":
                onXbox++;
                (onXbox === 1) ? gameWordXbox = "game" : gameWordXbox = "games";
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
        <p className="dashboardText">{`There are ${onPC} PC ${gameWordPC}, ${onSwitch} Nintendo Switch ${gameWordSwitch},
          ${onPS4} ${gameWordPS4} for PlayStation 4, ${iOS} ${gameWordiOS} for iOS and ${onXbox} Xbox ${gameWordXbox}.`}</p>
        <p className="dashboardText">{`Your Game Keeper represents games released in ${years.length} different years! From ${years[0]} to ${years[years.length - 1]}`}</p>
      </div>
    )
  }
}

export default Statistics;
