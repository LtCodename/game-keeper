import React from 'react';
import './SuggestedDeveloper.css';
import WarningModalWindow from "../warning-modal-window/WarningModalWindow";
import EditNameModalWindow from "../edit-name-modal-window/EditNameModalWindow";
import fire from "../../Firebase";
import { AddDeveloperIcon, DeleteDeveloperIcon, EditDeveloperIcon } from "../../IconsLibrary";

class SuggestedDeveloper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            idToDelete: "",
            nameToAdd: "",
            idToEdit: "",
            oldName: this.props.devData.name,
            showDeleteModalWindow: false,
            showAddModalWindow: false,
            showEditWindow: false
        };
    }

    openEditWindow = () => {
        this.setState({
            showEditWindow: true
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

    editItem = (newName, id) => {
        fire.firestore().collection('suggestedDevelopers').doc(id).update({
            name: newName
        }).then(() => {
            this.resetState();
        }).catch(error => {
            console.log(error.message);
        });
    };

    openModalDeleteWindow = () => {
        this.setState({
            showDeleteModalWindow: true
        });
    };

    onDeleteItem = (id) => {
        this.setState({
                idToDelete: id
            },() => {
                this.openModalDeleteWindow();
            }
        );
    };

    deleteItem = () => {
        fire.firestore().collection('suggestedDevelopers').doc(this.state.idToDelete).delete().then(() => {
            this.setState({
                idToDelete: ""
            });
        });
    };

    resetState = () => {
        this.setState({
            showDeleteModalWindow: false,
            showAddModalWindow: false,
            showEditWindow: false,
            idToEdit: "",
            oldName: ""
        });
    };

    openModalAddWindow = () => {
        this.setState({
            showAddModalWindow: true
        });
    };

    onAddItem = (name, id) => {
        this.setState({
                idToDelete: id,
                nameToAdd: name
            },() => {
                this.openModalAddWindow();
            }
        );
    };

    addItem = () => {
        fire.firestore().collection('developers').add({
            name: this.state.nameToAdd
        }).then(() => {
            fire.firestore().collection('developers').get().then(snapshot => {
                fire.firestore().collection('suggestedDevelopers').doc(this.state.idToDelete).delete().then(() => {
                    this.setState({
                        idToDelete: "",
                        nameToAdd: ""
                    });
                });
            }).catch(error => {
                console.log(error.message);
            });
        });
    };

    render() {
        const modalDeleteWindow = (
            <WarningModalWindow
                onProceed={this.deleteItem}
                message={`Are you sure you want to delete this item?`}
                show={this.state.showDeleteModalWindow}
                hideWindow={this.resetState.bind(this)}/>
        );

        const modalAddWindow = (
            <WarningModalWindow
                onProceed={this.addItem}
                message={`Are you sure you want to add this item?`}
                show={this.state.showAddModalWindow}
                hideWindow={this.resetState.bind(this)}/>
        );

        const modalEditWindow = (
            <EditNameModalWindow
                onProceed={(newName) => this.editItem(newName, this.state.idToEdit)}
                oldName={this.state.oldName}
                show={this.state.showEditWindow}
                hideWindow={this.resetState.bind(this)}/>
        );

        return (
            <>
                <div className="developers-block">
                    {this.props.devData.name}
                    <button className="developer-action-button" onClick={() => this.onDeleteItem(this.props.devData.id)}>
                        {DeleteDeveloperIcon}
                    </button>
                    <button className="developer-action-button" onClick={() => this.onAddItem(this.props.devData.name, this.props.devData.id)}>
                        {AddDeveloperIcon}
                    </button>
                    <button className="developer-action-button" onClick={() => this.onEditItem(this.props.devData.id, this.props.devData.name)}>
                        {EditDeveloperIcon}
                    </button>
                </div>
                {modalDeleteWindow}
                {modalAddWindow}
                {modalEditWindow}
            </>
        )
    }
}
export default SuggestedDeveloper;
