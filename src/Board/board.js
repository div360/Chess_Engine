import React, {useState, useEffect} from "react";
import { fenToBoard, generateLegalMoves } from "./fenBoardLogic";
import "./board.css";

function Board() {

    const [board, setBoard] = useState([]);
    const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    
    const [fromSquare, setFromSquare] = useState(null);
    const [toSquare, setToSquare] = useState(null);

    const [moves, setMoves] = useState([]);

    useEffect(() => {
        setBoard(fenToBoard(fen));
    }, [fen]);

    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const numbers = [8, 7, 6, 5, 4, 3, 2, 1];

    const getPieceImage = (piece) => {
        const color = piece === piece.toUpperCase() ? "white" : "black";
        const type = piece.toLowerCase();
        if (type === "p") return `assets/chess_pieces/pawn_${color}.png`;
        if (type === "r") return `assets/chess_pieces/rook_${color}.png`;
        if (type === "n") return `assets/chess_pieces/knight_${color}.png`;
        if (type === "b") return `assets/chess_pieces/bishop_${color}.png`;
        if (type === "q") return `assets/chess_pieces/queen_${color}.png`;
        if (type === "k") return `assets/chess_pieces/king_${color}.png`;
    };

    const handlePieceClick = (e) => {
        const square_id = e.target.id;

        if(fromSquare == square_id) {
            setFromSquare(null);
            setMoves([]);
        }
        else{
            if(fromSquare === null){
                if(getPieceAtSquare(square_id) === null) return;
                setFromSquare(square_id);
            }
            else{
                setToSquare(square_id);
            }
        }
    }

    const getPieceAtSquare = (square_id) => {
        const row = numbers.indexOf(parseInt(square_id[1]));
        const col = letters.indexOf(square_id[0]);
        return board[row][col];
    }

    const movePiece = (from, to) => {
        const from_row = numbers.indexOf(parseInt(from[1]));
        const from_col = letters.indexOf(from[0]);
        const to_row = numbers.indexOf(parseInt(to[1]));
        const to_col = letters.indexOf(to[0]);

        console.log(from_row, from_col, to_row, to_col)

        if (board && board[from_row] && board[from_row][from_col]) {
            const piece = board[from_row][from_col];
            const newBoard = [...board];
            newBoard[from_row][from_col] = null;
            newBoard[to_row][to_col] = piece;
            setBoard(newBoard);
        }

        setFromSquare(null);
        setToSquare(null);
        setMoves([]);
    }

    useEffect(() => {

        console.log(fromSquare, toSquare)
        if(fromSquare === null) return;

        if(fromSquare !== null){
            const moves = generateLegalMoves(board, fromSquare, numbers, letters);
            console.log(moves);
            if(moves != undefined){
                setMoves(moves);
            }
        }

        if(toSquare === null) return;
        if(moves.includes(toSquare) == false) return;
        if(fromSquare == toSquare) return;

        movePiece(fromSquare, toSquare)
    }, [fromSquare, toSquare]);

    return (
        <div className="flex flex-col justify-center items-center h-screen font-[Athiti] font-semibold bg-[#212121]">

                <input className="w-1/4" type="text" value={fen} onChange={(e) => setFen(e.target.value)} />

                <div className="grid grid-cols-8 h-[800px] w-[800px] ring-8 ring-[#78784e] scale-90">
                    {board.map((row, rowIndex) =>
                        row.map((piece, colIndex) => (
                          
                            <div
                                onClick={handlePieceClick}
                                id={`${letters[colIndex]}${numbers[rowIndex]}`}
                                key={`${letters[colIndex]}${numbers[rowIndex]}`}
                                className={`flex flex-col items-start justify-center w-[100px] h-[100px]  ${
                                    (rowIndex + colIndex) % 2 === 0
                                        ? "bg-[#ebecd0] text-[#779556]"
                                        : "bg-[#779556] text-[#ebecd0]"
                                } 
                                ${fromSquare == `${letters[colIndex]}${numbers[rowIndex]}` ? " border-4 border-[#494949] bg-[#deb845]" : ""}
                                ${moves.includes(`${letters[colIndex]}${numbers[rowIndex]}`) ? `${(rowIndex + colIndex) % 2 == 0 ? "bg-[#e3d178]" : "bg-[#c5b253]"}   border-1 border-[#494949] cursor-pointer` : ""}
                                `}
                            >
                                {piece && 
                                    
                                    <img onMouseDown={(e) => {e.preventDefault()}}
                                        id={`${letters[colIndex]}${numbers[rowIndex]}`}
                                        key={`${letters[colIndex]}${numbers[rowIndex]}`}
                                        src={getPieceImage(piece)}
                                        className="h-17 w-17 cursor-pointer"
                                    />
                                        
                                }
                                {colIndex === 0 && <span className="absolute left-1 mb-20 h-3 w-3 font-[Poppins] font-semibold text-sm">{numbers[rowIndex]}</span>}

                                {rowIndex === 7 && <span className="absolute bottom-4 ml-1 h-3 w-3 font-[Poppins] font-semibold text-sm">{letters[colIndex]}</span>}
                            </div>
                        ))    
                    )}
                </div>
        </div>
    );
}

export default Board;