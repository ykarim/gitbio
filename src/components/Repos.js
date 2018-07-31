import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faEye, faCodeBranch } from '@fortawesome/free-solid-svg-icons'

library.add(faStar);
library.add(faEye);
library.add(faCodeBranch);

class Repos extends React.Component {

    render () {
        const RepoDivs = this.props.repos.map((element, key) =>
            <div className="repoElement">
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
            </div>
        );

        return (
            <div>{RepoDivs}</div>
        );
    }
}

export default Repos;