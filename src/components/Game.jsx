import { useState } from "react";
import Board from "./Board";

const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [mode, setMode] = useState("twoPlayers");
    const [winner, setWinner] = useState(null);
    const [winningLine, setWinningLine] = useState(null);
    const [scores, setScores] = useState({
        playerXTwoPlayers: 0,
        playerOTwoPlayers: 0,
        playerXSinglePlayer: 0,
        aiOSinglePlayer: 0,
        drawsTwoPlayers: 0,
        drawsSinglePlayer: 0
    });

    const handleSquareClick = (index) => {
        if (squares[index] || winner) return;

        const newSquares = squares.slice();
        newSquares[index] = isXNext ? "X" : "O";
        setSquares(newSquares);

        const currentWinner = calculateWinner(newSquares);
        if (currentWinner) {
            setWinner(currentWinner.winner);
            setWinningLine(currentWinner.winningLine);
            updateScores(currentWinner.winner);
            return;
        }

        if (newSquares.every(Boolean) && !currentWinner) {
            setWinner("draw");
            updateScores("draw");
        }

        setIsXNext(!isXNext);

        if (mode === "singlePlayer" && isXNext) {
            makeAiMove(newSquares);
        }
    };

    const makeAiMove = (currentSquares) => {
        const emptyIndexes = currentSquares
            .map((square, i) => (square === null ? i : null))
            .filter((i) => i !== null);

        if (emptyIndexes.length > 0) {
            const bestMove = minimax(currentSquares, "O");
            const newSquares = currentSquares.slice();
            newSquares[bestMove.index] = "O";

            setTimeout(() => {
                setSquares(newSquares);

                const aiWinner = calculateWinner(newSquares);
                if (aiWinner) {
                    setWinner(aiWinner.winner);
                    setWinningLine(aiWinner.winningLine);
                    updateScores(aiWinner.winner);
                } else {
                    setIsXNext(true);
                }
            }, 500);
        }
    };

    const updateScores = (result) => {
        setScores((prevScores) => {
            if (result === "X") {
                if (mode === "twoPlayers") {
                    return { ...prevScores, playerXTwoPlayers: prevScores.playerXTwoPlayers + 1 };
                } else {
                    return { ...prevScores, playerXSinglePlayer: prevScores.playerXSinglePlayer + 1 };
                }
            } else if (result === "O") {
                if (mode === "twoPlayers") {
                    return { ...prevScores, playerOTwoPlayers: prevScores.playerOTwoPlayers + 1 };
                } else {
                    return { ...prevScores, aiOSinglePlayer: prevScores.aiOSinglePlayer + 1 };
                }
            } else if (result === "draw") {
                if (mode === "twoPlayers") {
                    return { ...prevScores, drawsTwoPlayers: prevScores.drawsTwoPlayers + 1 };
                } else {
                    return { ...prevScores, drawsSinglePlayer: prevScores.drawsSinglePlayer + 1 };
                }
            }
            return prevScores;
        });
    };

    const restartGame = () => {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setWinningLine(null);
    };

    const handleModeSelection = (selectedMode) => {
        setMode(selectedMode);
        restartGame();
    };

    const resetAll = () => {
        setScores({ playerXTwoPlayers: 0, playerOTwoPlayers: 0, playerXSinglePlayer: 0, aiOSinglePlayer: 0, drawsTwoPlayers: 0, drawsSinglePlayer: 0 });
        restartGame();
    };

    return (
        <div className="container has-text-centered">
            <h1 className="title is-1 mt-5">Tic Tac Toe</h1>

            <div className="buttons is-centered">
                <button
                    onClick={() => handleModeSelection("twoPlayers")}
                    className={`button is-medium ${mode === "twoPlayers" ? "is-primary" : "is-light"}`}
                >
                    2 Players
                </button>
                <button
                    onClick={() => handleModeSelection("singlePlayer")}
                    className={`button is-medium ${mode === "singlePlayer" ? "is-primary" : "is-light"}`}
                >
                    1 Player (vs Computer)
                </button>
            </div>

            <Board squares={squares} onSquareClick={handleSquareClick} winningLine={winningLine} />

            <div className="info is-size-4">
                {winner
                    ? <p className="has-text-weight-bold has-text-success">Winner: {winner}</p>
                    : squares.every(Boolean) && !winner
                        ? <p className="has-text-weight-bold has-text-danger">It&apos;s a draw!</p>
                        : <p className="has-text-weight-bold">Next player: {isXNext ? "X" : "O"}</p>}
            </div>

            <div className="scores my-4">
                <h2 className="subtitle is-4">Scores:</h2>
                <div className="columns is-centered is-size-4">
                    <div className="column is-2">
                        <div className="score-card has-background-primary">
                            <h3 className="player-name">Player (X)</h3>
                            <p className="score">{mode === "twoPlayers" ? scores.playerXTwoPlayers : scores.playerXSinglePlayer}</p>
                        </div>
                    </div>

                    <div className="column is-2">
                        <div className="score-card has-background-warning">
                            <h3 className="player-name">Tie</h3>
                            <p className="score">
                                {mode === "twoPlayers" ? scores.drawsTwoPlayers : scores.drawsSinglePlayer}
                            </p>
                        </div>
                    </div>

                    {mode === "twoPlayers" ? (
                        <div className="column is-2">
                            <div className="score-card has-background-link">
                                <h3 className="player-name">Player (O)</h3>
                                <p className="score">{scores.playerOTwoPlayers}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="column is-2">
                            <div className="score-card has-background-link">
                                <h3 className="player-name">Computer (O)</h3>
                                <p className="score">{scores.aiOSinglePlayer}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <button className="button is-danger is-medium" onClick={restartGame}>Restart Game</button>
            <button className="button is-warning is-medium ml-4" onClick={resetAll}>Reset All</button>
        </div>
    );
};

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let line of lines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], winningLine: line };
        }
    }
    return null;
};

const minimax = (squares, player) => {
    const opponent = player === "X" ? "O" : "X";

    const availableMoves = squares
        .map((square, index) => (square === null ? index : null))
        .filter((index) => index !== null);

    const winner = calculateWinner(squares);
    if (winner) {
        if (winner.winner === "X") return { score: -10 };
        if (winner.winner === "O") return { score: 10 };
    }

    if (availableMoves.length === 0) return { score: 0 };

    let bestMove;
    let bestScore = player === "O" ? -Infinity : Infinity;

    for (let i = 0; i < availableMoves.length; i++) {
        const move = availableMoves[i];
        const newSquares = squares.slice();
        newSquares[move] = player;

        const result = minimax(newSquares, opponent);

        const score = result.score;

        if ((player === "O" && score > bestScore) || (player === "X" && score < bestScore)) {
            bestScore = score;
            bestMove = { index: move, score: score };
        }
    }

    return bestMove;
};

export default Game;
