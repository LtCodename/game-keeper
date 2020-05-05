import React from 'react';
import UserBlock from '../user-block/UserBlock.js';
import './UserSection.css';
import { connect } from 'react-redux'
import { SectionOptionsButton } from "../../IconsLibrary";
import AddGameTool from "../add-game-tool/AddGameTool";
import SectionSettingsMenu from "../section-settings-menu/SectionSettingsMenu";

class UserSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSectionSettingsMenu: false
    };
  }
  showSectionSettingsMenu = () => {
    this.setState({
      showSectionSettingsMenu: !this.state.showSectionSettingsMenu
    });
  };

  render() {
    const gamesToRender = this.props.userBlocks.filter((elem) => elem.sectionId === this.props.id).map((elem) => {
      return <UserBlock
        key={elem.id}
        color={this.props.color}
        gameData={elem}
        sectionId={this.props.id}/>;
    }).sort((a, b) => {
      const releaseDateA = a.props.gameData.releaseDate || "";
      const releaseDateB = b.props.gameData.releaseDate || "";

      if (releaseDateA < releaseDateB) {
        return -1;
      }
      if (releaseDateA > releaseDateB) {
        return 1;
      }
      return 0;
    });

    const editSectionButton = (
        <div className="section-options-holder">
          <button className="section-options-button" onClick={this.showSectionSettingsMenu} >
            {SectionOptionsButton}
          </button>
          {this.state.showSectionSettingsMenu ?
              <SectionSettingsMenu
                  sectionName={this.props.name}
                  userSections={this.props.userSections}
                  sectionId={this.props.id}
                  userData={this.props.userData}
                  userBlocks={this.props.userBlocks}
                  color={this.props.color}
                  sectionIndex={this.props.sectionIndex}
                  sectionsArray={this.props.sectionsArray}
              /> : ""}
          {this.state.showSectionSettingsMenu ? <span className='section-settings-overlay' onClick={this.showSectionSettingsMenu}/> : ""}
        </div>
    );

    const nameAndButtonsBlock = (
      <div className="nameAndButtonsWrapper">
        <span className="sectionName">{this.props.name}</span>
        {this.props.userData.email === 'fake@email.com' ? '' : editSectionButton}
      </div>
    );

    return (
      <div className="section">
        {nameAndButtonsBlock}
        <div className="inner-section">
          {gamesToRender}
          <AddGameTool sectionId={this.props.id}/>
        </div>
      </div>
    );
  }
}

const stateToProps = (state = {}) => {
  return {
    userSections: state.userSections,
    userBlocks: state.userBlocks,
    userData: state.userData
  }
};

const ConnectedUserSection = connect(stateToProps, null)(UserSection);

export default ConnectedUserSection;
