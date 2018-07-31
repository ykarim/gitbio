import React from "react";
import Repos from "./Repos";

class Profile extends React.Component {

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        {this.props.error &&
                            <div className="alert alert-danger" role="alert">
                                {this.props.error}
                            </div>
                        }

                        {this.props.user ? (
                            <div>
                                <img src={this.props.user.avatar} alt="User Profile" className="rounded-circle profileImg"/>

                                <h3>
                                    {this.props.user.name} (<a href={this.props.user.url}>{this.props.user.username}</a>)
                                </h3>
                                <p>{this.props.user.bio}</p>

                            </div>
                        ) : (
                            <div>
                                <h1>Welcome to GitBio!</h1>
                            </div>
                        )}
                    </div>
                </div>

                { this.props.user &&
                    <div className="row numericalData">
                        <div className="col-sm-4">
                            <h4>{this.props.user.repo_count}</h4>
                            <p className="caption">Repositories</p>
                        </div>
                        <div className="col-sm-4">
                            <h4>{this.props.user.followers}</h4>
                            <p className="caption">Followers</p>
                        </div>
                        <div className="col-sm-4">
                            <h4>{this.props.user.following}</h4>
                            <p className="caption">Following</p>
                        </div>
                    </div>
                }

                { this.props.user &&
                    <div className="row numericalData">
                        <div className="col-sm-6">
                            <h4>{this.props.user.created}</h4>
                            <p className="caption">Created On</p>
                        </div>
                        <div className="col-sm-6">
                            <h4>{this.props.user.updated}</h4>
                            <p className="caption">Updated On</p>
                        </div>
                    </div>
                }

                { this.props.repos &&
                    <Repos repos={this.props.repos}/>
                }
            </div>
        );
    }
}

export default Profile;