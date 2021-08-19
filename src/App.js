// import logo from "./logo.svg";
import "./App.css";
import React from "react";

class Card extends React.Component {
    render() {
        return (
            <div className="github-profile">
                <img src="https://via.placeholder.com/75" />
                <div className="info">
                    <div className="name">Name here...</div>
                    <div className="company">Company here...</div>
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
                <Card />
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
