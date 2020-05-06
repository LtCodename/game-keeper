import React from 'react';
import ListBlock from '../list-block/ListBlock.js';
import './Dashboard.css'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import AddListTool from "../add-list-tool/AddListTool";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddListTool: false
        };
    }

    showAddListTool = () => {
        this.setState({
            showAddListTool: !this.state.showAddListTool
        });
    };

    render() {
        const listsToRender = this.props.userLists.map((elem, index) => {
            return <NavLink key={elem.id} to={"/lists/" + elem.id}><ListBlock listBlockIndex={index}/></NavLink>;
        });

        const addListButton = (
            <button
                className='dashboard-add-list-button'
                onClick={this.showAddListTool}>
                Add
            </button>
        );

        const addListNode = this.state.showAddListTool ? <AddListTool
            changeMode={this.showAddListTool}
            userLists={this.props.userLists}
            userData={this.props.userData}
        /> : addListButton;

        const authorized = (
            <div className="lt-col dashboard-elements">
                <div className='lists-dashboard-wrapper lt-row'>
                    {listsToRender}
                </div>
                {addListNode}
            </div>
        );

        return (
            <div className="contentWrapper">
                <div className="dashboardWrapper">
                    {this.props.userData ? authorized : ""}
                </div>
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
