import React from 'react';
import BlockModalWindow from '../block-modal-window/BlockModalWindow.js';
import './UserBlock.css';
import * as moment from 'moment';
import { connect } from 'react-redux'
import {iOSIcon, MacIcon, PCIcon, PS4Icon, SwitchIcon, XboxOneIcon} from "../../IconsLibrary";
import { DemoUser } from "../../App";

class UserBlockMini extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalWindow: false
        };
    }

    resetState = () => {
        this.setState({
            showModalWindow: false
        })
    };

    openModalWindow = () => {
        if (this.props.userData.email === DemoUser) {
            return;
        }

        this.setState({
            showModalWindow: true
        });
    };

    render() {
        let className = 'game-block gameBlock_';
        let color = this.props.color;

        if (color) {
            className += color;
        }

        const platformsIcons = {
            ios: iOSIcon,
            mac: MacIcon,
            pc: PCIcon,
            ps4: PS4Icon,
            switch: SwitchIcon,
            xboxone: XboxOneIcon
        }

        const platformsToShow = (this.props.gameData.hasOwnProperty('platforms')) ? (
            this.props.gameData.platforms.map((elem, index) => {
                return (<span className={'mini-block-icon'} key={index}>{platformsIcons[elem.iconName]}</span>)
            })) : [];

        const platfotmsOnBlock = (
            <div className="platformsBlock">
                {platformsToShow}
            </div>
        );

        const dateToShow = (
            this.props.gameData.releaseDate ? <span
                className="releaseDate">
          {moment(this.props.gameData.releaseDate).format('DD-MM-YYYY')}
        </span> : ""
        );

        const modalWindow = (
            <BlockModalWindow
                modalId={"blockModalWindow"}
                gameData={this.props.gameData}
                fullMode={true}
                show={this.state.showModalWindow}
                sectionId={this.props.sectionId}
                listId={this.props.listId}
                hideWindow={this.resetState}/>
        );

        return (
            <>
                <button className={className} data-toggle="modal" onClick={this.openModalWindow}>
                    <div className="game-block-mini">
                        <span className="game-name">{this.props.gameData.name}</span>
                        {platfotmsOnBlock}
                    </div>
                </button>
                {this.state.showModalWindow ? modalWindow : ''}
            </>
        )
    }
}

const stateToProps = (state = {}) => {
    return {
        userBlocks: state.userBlocks,
        userData: state.userData
    }
};

const UserBlockMiniConnected = connect(stateToProps, null)(UserBlockMini);

export default UserBlockMiniConnected;
