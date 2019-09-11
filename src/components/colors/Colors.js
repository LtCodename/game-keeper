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
      currentColor: this.props.allLists
        && this.props.allLists[this.props.listIndex]
        && this.props.allLists[this.props.listIndex].content
        && this.props.allLists[this.props.listIndex].content[this.props.sectionIndex]
        && this.props.allLists[this.props.listIndex].content[this.props.sectionIndex].color
    };
  }

  colorMagic(color) {
    if (typeof this.props.passColorToSection === "function") {
      this.props.passColorToSection(color);
    }else {
      this.props.changeSectionColor(this.props.listIndex, this.props.sectionIndex, color);
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

const colorsDispatchToProps = (dispatch) => {
  return {
    changeSectionColor: (listIndex, sectionIndex, color) => {
      dispatch({ type: reducers.actions.listsActions.SECTION_CHANGE_COLOR, listIndex: listIndex, sectionIndex: sectionIndex, color: color });
    }
  }
};

const stateToProps = (state = {}) => {
  return {
    allLists: state.lists,
    listIndex: state.selectedListIndex
  }
};

const ConnectedColors = connect(stateToProps, colorsDispatchToProps)(Colors);

export default ConnectedColors;
