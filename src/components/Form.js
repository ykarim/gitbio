import React from "react";

class Form extends React.Component {
    render () {
        return (
            <div>
                <form onSubmit={this.props.getUserData}>
                    <input type="text" name="username" placeholder="Username..."></input>
                    <button>Get Stats!</button>
                </form>
            </div>
        );
    }
}

export default Form;