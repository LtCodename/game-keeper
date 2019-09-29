import React from 'react';
import availableColors from '../../mocks/availableColors.js';
import './Colors.css';
import { connect } from 'react-redux'
declare var firebase;

class Colors extends React.Component {

  constructor(props) {
    super(props);

    this.colorMagic = this.colorMagic.bind(this);

    this.state = {
      currentColor: this.props.color
    };
  }

  colorMagic(color) {
    if (typeof this.props.passColorToSection === "function") {
      this.props.passColorToSection(color);
    }else {
      const copy = [...this.props.userSections];

      let targetSection = copy.find((elem) => {
        return elem.id === this.props.sectionId;
      })

      if (targetSection) {
        targetSection.color = color;
      }

      firebase.firestore().collection('users').doc(this.props.userData.uid).update({
        sections: copy
      }).then((data) => {
      }).catch(error => {
        console.log(error.message);
      });
    }

    this.setState({
      currentColor: color
    })
  }

  render() {
    let colorsToRender = availableColors.map((elem, index) => {
      let classNameReal = "colorsSpan color_";
      classNameReal += elem.name;

      return (
        <span
          key={elem.id}
          className={classNameReal}
          onClick={() => this.colorMagic(elem.name)}>
          {(this.state.currentColor === elem.name) ? "X" : ""}
        </span>
      );
    })

    return (
      <div >
        <div className="colorsContainer">
          {colorsToRender}
        </div>
      </div>
    );
  }
}

const stateToProps = (state = {}) => {
  return {
    userData: state.userData,
    userSections: state.userSections
  }
};

const ConnectedColors = connect(stateToProps, null)(Colors);

export default ConnectedColors;
