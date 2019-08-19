import React from 'react';
import './ListBlock.css';

class ListBlock extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {

    return (
      <div className="listBlockWrapper">
        <button className="listBlock" onClick={this.props.listBlockClick}>{this.props.name}</button>
      </div>
    )
  }
}

export default ListBlock;
