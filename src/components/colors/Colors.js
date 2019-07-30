import React from 'react';
import availableColors from '../../mocks/availableColors.js';
import './Colors.css';

class Colors extends React.Component {

  constructor(props) {
    super(props);

    this.onPickColor = this.onPickColor.bind(this);

    this.state = {
      currentColor: this.props.currentColor
    };
  }

  onPickColor(color) {
    console.log("I am color " + color)
  }

  render() {
    let colorsToRender = availableColors.map((elem, index) => {
      let classNameReal = "color_";
      classNameReal += elem.name;

      return (
        <span
          key={elem.id}
          className={classNameReal}
          onClick={() => this.onPickColor(classNameReal)}>
          {(this.state.currentColor === elem.name) ? "X" : ""}
        </span>
      );
    })

    return (
      <div >
        <p>Pick a color</p>
        <div>
          {colorsToRender}
        </div>
      </div>
    );
  }
}

export default Colors;
