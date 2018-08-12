import React, {Component} from 'react';
import './App.css';
import Form from "./components/Form";
import Profile from "./components/Profile";

class App extends Component {
    state = {
        user: undefined,
        repos: undefined,
        error: undefined
    };

    getUserData = async (e) => {
        e.preventDefault();

        const username = e.target.elements.username.value;
        if (username) {
            const userBioData = await this.getUserBioInfo(username);
            if (userBioData.username) {
                let userRepoData = await this.getUserRepoInfo(username);

                //Add user's language frequency map to user data
                userBioData.userLanguageMap = this.analyzeUserLanguages(userRepoData);

                //Get user's top two languages and add to user data
                let userTopLanguages = this.getUserTopLanguages(userBioData.userLanguageMap);
                userBioData.topLanguage = userTopLanguages[0];
                userBioData.secondTopLanguage = userTopLanguages[1];

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
                    error: userBioData.error
                });
            }
        } else {
            this.setState({
                user: undefined,
                repos: undefined,
                error: "Please enter username"
            });
        }
    };

    getUserBioInfo = async (username) => {
        const api_call = await fetch(`https://api.github.com/users/${username}`);
        const data = await api_call.json();

        if (data.id) {

            return {
                avatar: data.avatar_url,
                name: data.name,
                username: data.login,
                url: data.html_url,
                bio: data.bio,
                type: data.type,
                repo_count: data.public_repos,
                followers: data.followers,
                following: data.following,
                created: new Date(data.created_at).toLocaleString(),
                updated: new Date(data.updated_at).toLocaleString(),
            };
        } else {
            return {
                error: data.message
            }
        }
    };

    getUserRepoInfo = async (username) => {
        const api_call = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await api_call.json();

        const repos = [];

        data.forEach(function(element) {
            repos.push({
                name: element.name,
                url: element.html_url,
                description: element.description,
                created: new Date(element.created_at).toLocaleString(),
                pushed: new Date(element.pushed_at).toLocaleString(),
                language: element.language,
                languages_url: element.languages_url,
                forks: element.forks_count,
                open_issues: element.open_issues_count,
                stars: element.stargazers_count,
                watchers: element.watchers_count
            });
        });

        this.analyzeRepoLanguages(repos);
        return repos;
    };

    analyzeRepoLanguages = (userRepoData) => {
        userRepoData.forEach(async function(repo) {
            const api_call = await fetch(repo.languages_url);
            const languageData = await api_call.json();
            const languageMap = new Map();
            let totalLines = 0;

            //Obtain total number of lines
            for (let language in languageData) {
                if (languageData.hasOwnProperty(language)) {
                    languageMap.set(language, languageData[language]);
                    totalLines += languageData[language];
                }
            }

            //Set value of language in languageMap equal to string containing percentage rounded to two decimals
            languageMap.forEach(function(value, key) {
                languageMap.set(key, (value / totalLines * 100).toFixed(2) + "%");
            });
            repo.language_breakdown = languageMap;
        });

        return userRepoData;
    };

    analyzeUserLanguages = (userRepoData) => {
        let languageFrequencies = new Map();

        userRepoData.forEach(function(repo) {
            if (languageFrequencies.has(repo.language)) {
                const currentFrequency = languageFrequencies.get(repo.language);
                languageFrequencies.set(repo.language, currentFrequency + 1);
            } else {
                languageFrequencies.set(repo.language, 1);
            }
        });

        return languageFrequencies;
    };

    getUserTopLanguages = (languageMap) => {
        let firstMostUsedLanguage = "", secondMostUsedLanguage = "";
        let firstMostUsedFreq = 0, secondMostUsedFreq = 0;

        languageMap.forEach(function (languageFreq, languageElement) {
            if (languageFreq > firstMostUsedFreq && languageFreq > secondMostUsedFreq) {
                firstMostUsedLanguage = languageElement;
                firstMostUsedFreq = languageFreq;
            } else if (languageFreq < firstMostUsedFreq && languageFreq > secondMostUsedFreq) {
                secondMostUsedLanguage = languageElement;
                secondMostUsedFreq = languageFreq;
            }
        });

        return [firstMostUsedLanguage, secondMostUsedLanguage];
    };

    render() {
        return (
            <div className="wrapper">
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <a className="navbar-brand">GitBio</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <Form getUserData={this.getUserData}/>
                        </ul>
                    </div>
                </nav>

                <Profile user={this.state.user} repos={this.state.repos} error={this.state.error}/>
            </div>
        );
    }
}

export default App;
