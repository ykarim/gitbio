import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faEye, faCodeBranch } from '@fortawesome/free-solid-svg-icons'

library.add(faStar);
library.add(faEye);
library.add(faCodeBranch);

class Repos extends React.Component {

    constructor(props) {
        super(props);

        const repoStates = [];
        for (let i = 0; i < props.repos.length; i++) {
            repoStates.push(false);
        }

        this.state = {
            repoDetailsShown: repoStates,
        }

        this.toggleRepoDetails = this.toggleRepoDetails.bind(this);
    }

    toggleRepoDetails(repoKey) {
        var currentRepoStates = this.state.repoDetailsShown;
        currentRepoStates[repoKey] = !currentRepoStates[repoKey];

        this.setState({
            repoDetailsShown: currentRepoStates,
        });
    }

    render () {
        const RepoDivs = this.props.repos.map((element, key) =>
            <div className="repoElement" key={key} onClick={() => this.toggleRepoDetails(key)}>
                <div className="row">
                    <div className="col-sm-12">
                        <a href={element.url}>{element.name}</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <p>{element.description}</p>
                    </div>
                </div>
                <div className="row repoStats">
                    <div className="col-sm-4">
                        <h6>Stars: {element.stars} <FontAwesomeIcon icon="star"/></h6>
                    </div>
                    <div className="col-sm-4">
                        <h6>Watchers: {element.watchers} <FontAwesomeIcon icon="eye"/></h6>
                    </div>
                    <div className="col-sm-4">
                        <h6>Forks: {element.forks} <FontAwesomeIcon icon="code-branch"/></h6>
                    </div>
                </div>

                { this.state.repoDetailsShown[key] &&
                    <div>
                        <div className="row repoStats">
                            <div className="col-sm-6">
                                <h4>{element.created}</h4>
                                <p>Created On</p>
                            </div>
                            <div className="col-sm-6">
                                <h4>{element.pushed}</h4>
                                <p>Last Updated On</p>
                            </div>
                        </div>
                        <div className="row">

                        </div>
                    </div>
                }
            </div>
        );

        return (
            <div>{RepoDivs}</div>
        );
    }
}

export default Repos;