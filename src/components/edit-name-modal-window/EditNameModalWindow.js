import React from 'react';
import { Modal } from "react-bootstrap";
import './EditNameModalWindow.css';

class EditNameModalWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      developerNameValue: this.props.oldName
    };
  }

  nameInputValueChange = (event) => {
    this.setState({
      developerNameValue: event.target.value
    });
  };

  onProceed = () => {
    this.props.onProceed(this.state.developerNameValue);
  };

  render() {
    const nameEditNode = (
        <textarea
            className="edit-dev-textarea"
            placeholder="Enter new name"
            rows={1}
            value={this.state.developerNameValue}
            onChange={this.nameInputValueChange}/>
    );

    return (
        <Modal show={this.props.show} onHide={this.props.hideWindow} dialogClassName={'edit-name-modal'}>
          <Modal.Body>
            <div className="lt-col">
              {nameEditNode}
              <div className="lt-row">
                <button type="button" className="edit-dev-button" onClick={this.props.hideWindow}>Cancel</button>
                <button type="button" className="edit-dev-button" onClick={this.onProceed}>Submit</button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
    )
  }
}

export default EditNameModalWindow;
