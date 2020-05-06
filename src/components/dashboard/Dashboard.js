import React from 'react';
import ListBlock from '../list-block/ListBlock.js';
import './Dashboard.css'
import AddListModalWindow from '../add-list-modal-window/AddListModalWindow.js';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddListWindow: false
        };
    }

    openAddListWindow = () => {
        this.setState({
            showAddListWindow: true
        });
    };

    hideAddListWindow = () => {
        this.setState({
            showAddListWindow: false
        });
    };

    render() {
        const listsToRender = this.props.userLists.map((elem, index) => {
            return <NavLink key={elem.id} to={"/lists/" + elem.id}><ListBlock listBlockIndex={index}/></NavLink>;
        });

        const addListButton = (
            <button className='btnAddListFromDashboard' onClick={this.openAddListWindow}>New Collection</button>
        );

        const modalAddListWindow = (
            <AddListModalWindow show={this.state.showAddListWindow} hideWindow={this.hideAddListWindow.bind(this)}/>
        );

        const authorized = (
            <div className='lists-dashboard-wrapper lt-row'>
                {listsToRender}
                {addListButton}
            </div>
        );

        return (
            <div className="contentWrapper">
                <div className="dashboardWrapper">
                    {this.props.userData ? authorized : ""}
                </div>
                {modalAddListWindow}
            </div>
        )
    }
}

const stateToProps = (state = {}) => {
    return {
        userLists: state.userLists,
        userData: state.userData
    }
};

const DashboardConnected = connect(stateToProps, null)(Dashboard);

export default DashboardConnected;
