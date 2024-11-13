import { useState } from "react";
import Board from "./Board";

const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [mode, setMode] = useState("twoPlayers"); // Domyślny tryb: 2 graczy
    const [winner, setWinner] = useState(null);

    // Liczniki wygranych
    const [scores, setScores] = useState({
        playerX: 0,
        playerO: 0,
        ai: 0,
    });

    const handleSquareClick = (index) => {
        if (squares[index] || winner) return;

        const newSquares = squares.slice();
        newSquares[index] = isXNext ? "X" : "O";

        setSquares(newSquares);

        const currentWinner = calculateWinner(newSquares);
        if (currentWinner) {
            setWinner(currentWinner);
            updateScores(currentWinner);
            return;
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
            const aiMove = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
            const newSquares = currentSquares.slice();
            newSquares[aiMove] = "O";

            setTimeout(() => {
                setSquares(newSquares);

                const aiWinner = calculateWinner(newSquares);
                if (aiWinner) {
                    setWinner(aiWinner);
                    updateScores(aiWinner);
                } else {
                    setIsXNext(true);
                }
            }, 500);
        }
    };

    const updateScores = (winner) => {
        setScores((prevScores) => {
            if (winner === "X") {
                return { ...prevScores, playerX: prevScores.playerX + 1 };
            } else if (winner === "O" && mode === "twoPlayers") {
                return { ...prevScores, playerO: prevScores.playerO + 1 };
            } else if (winner === "O" && mode === "singlePlayer") {
                return { ...prevScores, ai: prevScores.ai + 1 };
            }
            return prevScores;
        });
    };

    const restartGame = () => {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };

    const handleModeSelection = (selectedMode) => {
        setMode(selectedMode);
        restartGame();
        setScores({ playerX: 0, playerO: 0, ai: 0 }); // Resetujemy wyniki przy zmianie trybu
    };

    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <div className="mode-selection">
                <button
                    onClick={() => handleModeSelection("twoPlayers")}
                    className={mode === "twoPlayers" ? "active" : ""}
                >
                    2 Players
                </button>
                <button
                    onClick={() => handleModeSelection("singlePlayer")}
                    className={mode === "singlePlayer" ? "active" : ""}
                >
                    1 Player (vs AI)
                </button>
            </div>
            <Board squares={squares} onSquareClick={handleSquareClick} />
            <div className="info">
                {winner
                    ? `Winner: ${winner}`
                    : squares.every(Boolean) && !winner
                        ? "It's a draw!"
                        : `Next player: ${isXNext ? "X" : "O"}`}
            </div>
            <div className="scores">
                <h2>Scores:</h2>
                {mode === "twoPlayers" ? (
                    <p>
                        Player X: {scores.playerX} | Player O: {scores.playerO}
                    </p>
                ) : (
                    <p>
                        Player X: {scores.playerX} | AI O: {scores.ai}
                    </p>
                )}
            </div>
            <button className="restart-button" onClick={restartGame}>
                Restart Game
            </button>
        </div>
    );
};

// Funkcja do sprawdzania zwycięzcy
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
            return squares[a];
        }
    }
    return null;
};

export default Game;
