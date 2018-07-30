import React from "react";

class Profile extends React.Component {
    render () {
        return (
            <div>
                { this.props.user && this.props.user.avatar && <img src={this.props.user.avatar} alt="User Profile"/> }
                { this.props.user && this.props.user.username && <h3>{this.props.user.username}</h3> }
            </div>
        );
    }
}

export default Profile;