const Board = ({ squares, onSquareClick }) => {
    return (
        <div className="board">
            {squares.map((square, i) => (
                <button key={i} className="square" onClick={() => onSquareClick(i)}>
                    {square}
                </button>
            ))}
        </div>
    );
};

export default Board;
