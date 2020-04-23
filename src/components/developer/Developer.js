import React from 'react';
import './Developer.css';
import fire from "../../Firebase";
import WarningModalWindow from "../warning-modal-window/WarningModalWindow";
import EditNameModalWindow from "../edit-name-modal-window/EditNameModalWindow";
import {DeleteDeveloperIcon, EditDeveloperIcon} from "../../IconsLibrary";

class Developer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            idToDelete: "",
            idToEdit: "",
            oldName: this.props.devData.name,
            showWarningWindow: false,
            showEditWindow: false
        };
    }

    onDeleteItem = (id) => {
        this.setState({
                idToDelete: id
            },() => {
                this.openModalWarningWindow();
            }
        );
    };

    deleteItem = () => {
        fire.firestore().collection('developers').doc(this.state.idToDelete).delete();
        this.setState({
            idToDelete: ""
        });
    };

    editItem = (newName, id) => {
        fire.firestore().collection('developers').doc(id).update({
            name: newName
        }).then(() => {
            this.resetState();
        }).catch(error => {
            console.log(error.message);
        });
    };

    onEditItem = (id, oldName) => {
        this.setState({
                idToEdit: id,
                oldName: oldName
            },() => {
                this.openEditWindow();
            }
        );
    };

    openEditWindow() {
        this.setState({
            showEditWindow: true
        });
    }

    openModalWarningWindow = () => {
        this.setState({
            showWarningWindow: true
        });
    };

    resetState = () => {
        this.setState({
            showWarningWindow: false,
            showEditWindow: false,
            idToEdit: "",
            oldName: "",
            idToDelete: ""
        });
    };

    closeWarningModal = () => {
        this.setState({
            showWarningWindow: false
        });
    };

    closeEditModal = () => {
        this.setState({
            showEditWindow: false
        });
    };

    render() {
        const modalWarningWindow = (
            <WarningModalWindow
                onProceed={this.deleteItem}
                message={`Are you sure you want to delete this item?`}
                show={this.state.showWarningWindow}
                hideWindow={this.closeWarningModal.bind(this)}/>
        )

        const modalEditWindow = (
            <EditNameModalWindow
                onProceed={(newName) => this.editItem(newName, this.state.idToEdit)}
                oldName={this.state.oldName}
                show={this.state.showEditWindow}
                hideWindow={this.closeEditModal.bind(this)}/>
        );

        return (
            <>
                <div className="developers-block">
                    {this.props.devData.name}
                    <button
                        className="developer-action-button"
                        onClick={() => this.onDeleteItem(this.props.devData.id)}>
                        {DeleteDeveloperIcon}
                    </button>
                    <button
                        className="developer-action-button"
                        onClick={() => this.onEditItem(this.props.devData.id, this.props.devData.name)}>
                        {EditDeveloperIcon}
                    </button>
                </div>
                {modalWarningWindow}
                {modalEditWindow}
            </>
        )
    }
}
export default Developer;
