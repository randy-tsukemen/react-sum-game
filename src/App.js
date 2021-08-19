// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import PropTypes from "prop-types";

const testData = [
    {
        name: "Dan Abramov",
        avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4",
        company: "@facebook",
    },
    {
        name: "Sophie Alpert",
        avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
        company: "Humu",
    },
    {
        name: "Sebastian Markbåge",
        avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4",
        company: "Facebook",
    },
];

const CardList = () => (
    <div>
        {testData.map((profile) => (
            <Card key={profile.name} {...profile} />
        ))}
    </div>
);

class Card extends React.Component {
    static get propTypes() {
        return {
            avatar_url: PropTypes.string,
            name: PropTypes.string,
            company: PropTypes.string,
        };
    }
    render() {
        const profile = this.props;
        return (
            <div className="github-profile">
                <img src={profile.avatar_url} />
                <div className="info">
                    <div className="name">{profile.name}</div>
                    <div className="company">{profile.company}</div>
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.title = "The Github Cards App";
    }

    render() {
        return (
            <div>
                <div className="header">{this.title}</div>
                <CardList />
            </div>
        );
    }
}

export default App;
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
