const Board = ({ squares, onSquareClick, winningLine }) => {
    const renderSquare = (index) => {
        const isWinningSquare = winningLine && winningLine.includes(index);
        return (
            <button
                key={index}
                className={`button is-large square has-text-black ${squares[index] ? "has-background-light" : "is-white"} ${isWinningSquare ? "winning" : ""}`}
                onClick={() => onSquareClick(index)}
            >
                {squares[index]}
            </button>
        );
    };

    return (
        <div className="board">
            {squares.map((_, index) => renderSquare(index))}
        </div>
    );
};

export default Board;
