import React, { Component } from 'react';
import './App.css';
import Titles from "./components/Titles";
import Form from "./components/Form";
import Profile from "./components/Profile";

class App extends Component {
    state = {
        user: undefined,
        repos: undefined,
        error: undefined
    }

    getUserData = async (e) => {
        e.preventDefault();

        const username = e.target.elements.username.value;
        if (username) {
            const userBioData = await this.getUserBioInfo(username);
            const userRepoData = await this.getUserRepoInfo(username);

            if (userBioData.id) {
                this.setState({
                    user: userBioData,
                    repos: userRepoData,
                    error: ""
                });
            } else {
                //User doesn't exist
                this.setState({
                    user: undefined,
                    repos: undefined,
                    error: "User not found"
                });
            }
        } else {
            this.setState({
                user: undefined,
                repos: undefined,
                error: "Please enter username"
            });
        }
    }

    getUserBioInfo = async (username) => {
        const api_call = await fetch(`https://api.github.com/users/${username}`);
        const data = await api_call.json();

        return {
            username: data.login,
            avatar: data.avatar_url,
            url: data.html_url,
            name: data.name,
            bio: data.bio,
            type: data.type,
            repo_count: data.public_repos,
            followers: data.followers,
            following: data.following,
            created: data.created_at,
            updated: data.updated_at,
        };
    }

    getUserRepoInfo = async (username) => {
        const api_call = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await api_call.json();

        const repos = [];

        data.forEach(function(element) {
            repos.push({
                name: element.name,
                url: element.html_url,
                description: element.description,
                created: element.created_at,
                pushed: element.pushed_at,
                language: element.language,
                forks: element.forks_count,
                open_issues: element.open_issues_count,
                watchers: element.watchers
            });
        });

        return repos;
    }

    render() {
        return (
            <div>
                <Titles />
                <Form getUserData={this.getUserData}/>
                <Profile user={this.state.user} repos={this.state.repos}/>
            </div>
        );
    }
}

export default App;
