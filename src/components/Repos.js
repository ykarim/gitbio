import React from "react";
import '../css/Repos.css'
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

    generateLanguageBreakdownList = (repo) => {
        let languageItems = [];

        languageItems.push(
            <span key="languagelistDesc" className="list-inline-item languageListHeader">Languages: </span>
        );
        repo.language_breakdown.forEach(function(value, key) {
            languageItems.push(<li key={key} className="list-inline-item languageListItem">{key + " " + value}</li>);
        });

        return <ul className="list-inline languageList">{languageItems}</ul>;
    }

    toggleRepoDetails(e) {
        let repoKey = e.target.dataset.repoKey;
        let currentRepoStates = this.state.repoDetailsShown;
        currentRepoStates[repoKey] = !currentRepoStates[repoKey];

        this.setState({
            repoDetailsShown: currentRepoStates,
        });
    }

    render () {
        const RepoDivs = this.props.repos.map((element, key) =>
            <div className="repoElement" key={key} data-repoKey={key} onClick={this.toggleRepoDetails}>
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
                        <h5>Stars: {element.stars} <FontAwesomeIcon icon="star" className="starIcon"/></h5>
                    </div>
                    <div className="col-sm-4">
                        <h5>Watchers: {element.watchers} <FontAwesomeIcon icon="eye" className="eyeIcon"/></h5>
                    </div>
                    <div className="col-sm-4">
                        <h5>Forks: {element.forks} <FontAwesomeIcon icon="code-branch" className="codeBranchIcon"/></h5>
                    </div>
                </div>

                { this.state.repoDetailsShown[key] &&
                    <div>
                        <hr />

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
                        <div className="row repoStats">
                            <div className="col-sm-12">
                                {this.generateLanguageBreakdownList(element)}
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