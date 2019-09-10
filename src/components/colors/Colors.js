import React from 'react';
import availableColors from '../../mocks/availableColors.js';
import './Colors.css';
import reducers from '../../redux/reducers';
import { connect } from 'react-redux'

class Colors extends React.Component {

  constructor(props) {
    super(props);

    this.colorMagic = this.colorMagic.bind(this);

    this.state = {
      currentColor: this.props.currentColor
    };
  }

  colorMagic(color) {
    this.props.changeSectionColor(this.props.listIndex, this.props.sectionIndex, color);

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

const colorsDispatchToProps = (dispatch) => {
  return {
    changeSectionColor: (listIndex, sectionIndex, color) => {
      dispatch({ type: reducers.actions.listsActions.SECTION_CHANGE_COLOR, listIndex: listIndex, sectionIndex: sectionIndex, color: color });
    }
  }
};

const ConnectedColors = connect(null, colorsDispatchToProps)(Colors);

export default ConnectedColors;
