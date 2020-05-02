import React from 'react';
import './BlockModalWindow.css';
import FoundGame from "./FoundGame";

class NameSearchResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        const searchResults = this.props.results.map((elem, index) => {
            return <FoundGame gameData={elem} key={index} passIdBack={(gameId) => this.props.passIdBack(gameId)}/>
        })

        return (
            <div className="search-results-wrapper">
                <div className="lt-col">
                    {searchResults}
                </div>
            </div>
        )
    }
}

export default NameSearchResults;
