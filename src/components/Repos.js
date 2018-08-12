import React from "react";
import '../css/Repos.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCodeBranch, faEye, faStar} from '@fortawesome/free-solid-svg-icons'

library.add(faStar);
library.add(faEye);
library.add(faCodeBranch);

class Repos extends React.Component {

    generateLanguageBreakdownList = (repo) => {
        let languageItems = [];

        languageItems.push(
            <span key="languagelistDesc" className="list-inline-item languageListHeader">Languages: </span>
        );
        repo.language_breakdown.forEach(function (value, key) {
            languageItems.push(<li key={key} className="list-inline-item languageListItem">{key + " " + value}</li>);
        });

        return <ul className="list-inline languageList">{languageItems}</ul>;
    };

    constructor(props) {
        super(props);

        const repoStates = [];
        for (let i = 0; i < props.repos.length; i++) {
            repoStates.push(false);
        }

        this.state = {
            repoDetailsShown: repoStates,
        };

        this.toggleRepoDetails = this.toggleRepoDetails.bind(this);
    }

    toggleRepoDetails(repoKey) {
        let currentRepoStates = this.state.repoDetailsShown;
        currentRepoStates[repoKey] = !currentRepoStates[repoKey];

        this.setState({
            repoDetailsShown: currentRepoStates,
        });
    }

    render () {
        const RepoDivs = this.props.repos.map((repo, repoKey) =>
            <div className="repoElement" key={repoKey} data-repokey={repoKey} onClick={() => this.toggleRepoDetails(repoKey)}>
                <div className="row">
                    <div className="col-sm-12">
                        <a href={repo.url}>{repo.name}</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <p>{repo.description}</p>
                    </div>
                </div>
                <div className="row repoStats">
                    <div className="col-sm-4">
                        <h5>Stars: {repo.stars} <FontAwesomeIcon icon="star" className="starIcon"/></h5>
                    </div>
                    <div className="col-sm-4">
                        <h5>Watchers: {repo.watchers} <FontAwesomeIcon icon="eye" className="eyeIcon"/></h5>
                    </div>
                    <div className="col-sm-4">
                        <h5>Forks: {repo.forks} <FontAwesomeIcon icon="code-branch" className="codeBranchIcon"/></h5>
                    </div>
                </div>

                { this.state.repoDetailsShown[repoKey] &&
                    <div>
                        <hr />

                        <div className="row repoStats">
                            <div className="col-sm-6">
                                <h4>{repo.created}</h4>
                                <p>Created On</p>
                            </div>
                            <div className="col-sm-6">
                                <h4>{repo.pushed}</h4>
                                <p>Last Updated On</p>
                            </div>
                        </div>
                        <div className="row repoStats">
                            <div className="col-sm-12">
                                {this.generateLanguageBreakdownList(repo)}
                            </div>
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