// import logo from './logo.svg';
import "./App.css";
import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";

const StarsDisplay = (props) => (
    <>
        {utils.range(1, props.count).map((starId) => (
            <div key={starId} className="star" />
        ))}
    </>
);

const PlayNumber = (props) => (
    <button
        className="number"
        style={{ backgroundColor: colors[props.status] }}
        onClick={() => props.onClick(props.number, props.status)}
    >
        {props.number}
    </button>
);

const PlayAgain = (props) => (
    <div className="game-done">
        <div
            className="message"
            style={{ color: props.gameStatus === "won" ? "green" : "red" }}
        >
            {props.gameStatus === "won" ? "You win!" : "You lose!"}
        </div>
        <button onClick={props.onClick}>Play Again</button>
    </div>
);

const useGameState = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        if (secondsLeft > 0 && availableNums.length > 0) {
            const timeId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);

            return () => clearTimeout(timeId);
        }
    });

    const setGameState = (newCandidateNums) => {
        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums);
        } else {
            const newAvailableNums = availableNums.filter(
                (n) => !newCandidateNums.includes(n)
            );
            setStars(utils.randomSumIn(newAvailableNums, 9));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    };

    return { stars, availableNums, candidateNums, secondsLeft, setGameState };
};

const StarMatch = (props) => {
    const { stars, availableNums, candidateNums, secondsLeft, setGameState } =
        useGameState();
    // const [stars, setStars] = useState(utils.random(1, 9));
    // const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    // const [candidateNums, setCandidateNums] = useState([]);
    // const [secondsLeft, setSecondsLeft] = useState(10);

    // useEffect(() => {
    //     if (secondsLeft > 0 && availableNums.length > 0) {
    //         const timeId = setTimeout(() => {
    //             setSecondsLeft(secondsLeft - 1);
    //         }, 1000);

    //         return () => clearTimeout(timeId);
    //     }
    // });

    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameIsWon = availableNums.length === 0;
    const gameIsLost = secondsLeft === 0;
    const gameStatus = gameIsWon ? "won" : gameIsLost ? "lost" : "playing";

    const numberStatus = (number) => {
        if (!availableNums.includes(number)) {
            return "used";
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? "wrong" : "candidate";
        }
        return "available";
    };

    const onNumberClick = (number, currentStatus) => {
        if (currentStatus === "used" || gameStatus !== "playing") {
            return;
        }
        const newCandidateNums =
            currentStatus === "available"
                ? candidateNums.concat(number)
                : candidateNums.filter((cn) => cn !== number);
        setGameState(newCandidateNums);

        // if (utils.sum(newCandidateNums) !== stars) {
        //     setCandidateNums(newCandidateNums);
        // } else {
        //     const newAvailableNums = availableNums.filter(
        //         (n) => !newCandidateNums.includes(n)
        //     );
        //     setStars(utils.randomSumIn(newAvailableNums, 9));
        //     setAvailableNums(newAvailableNums);
        //     setCandidateNums([]);
        // }
    };

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {gameStatus !== "playing" ? (
                        <PlayAgain
                            onClick={props.startNewGame}
                            gameStatus={gameStatus}
                        />
                    ) : (
                        <StarsDisplay count={stars} />
                    )}
                </div>
                <div className="right">
                    {utils.range(1, 9).map((numberId) => (
                        <PlayNumber
                            key={numberId}
                            number={numberId}
                            status={numberStatus(numberId)}
                            onClick={onNumberClick}
                        />
                    ))}
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
};

const App = () => {
    const [gameId, setGameId] = useState(1);
    return (
        <StarMatch key={gameId} startNewGame={() => setGameId(gameId + 1)} />
    );
};

// Color Theme
const colors = {
    available: "lightgray",
    used: "lightgreen",
    wrong: "lightcoral",
    candidate: "deepskyblue",
};

// Math science
const utils = {
    // Sum an array
    sum: (arr) => arr.reduce((acc, curr) => acc + curr, 0),

    // create an array of numbers between min and max (edges included)
    range: (min, max) =>
        Array.from({ length: max - min + 1 }, (_, i) => min + i),

    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr, max) => {
        const sets = [[]];
        const sums = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0, len = sets.length; j < len; j++) {
                const candidateSet = sets[j].concat(arr[i]);
                const candidateSum = utils.sum(candidateSet);
                if (candidateSum <= max) {
                    sets.push(candidateSet);
                    sums.push(candidateSum);
                }
            }
        }
        return sums[utils.random(0, sums.length - 1)];
    },
};

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

export default App;
