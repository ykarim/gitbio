import React from "react";

class Form extends React.Component {
    render () {
        return (
            <form className="form-inline" onSubmit={this.props.getUserData}>
                <input className="form-control mr-sm-2" type="search" name="username" placeholder="Username..."
                    aria-label="Search Username" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        );
    }
}

export default Form;