import React from 'react';
import availableColors from '../../mocks/availableColors.js';
import './Colors.css';

class Colors extends React.Component {

  constructor(props) {
    super(props);

    this.colorMagic = this.colorMagic.bind(this);

    this.state = {
      currentColor: this.props.currentColor
    };
  }

  colorMagic(color) {
    this.props.passColorToSection(color);

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
          {(this.state.currentColor === elem.name) ? "V" : ""}
        </span>
      );
    })

    return (
      <div >
        <p>Pick a color</p>
        <div className="colorsContainer">
          {colorsToRender}
        </div>
      </div>
    );
  }
}

export default Colors;
