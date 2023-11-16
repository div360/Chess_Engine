import React, {useState, useEffect} from "react";
import { fenToBoard } from "./fenBoardLogic";

function Board() {

    const [board, setBoard] = useState([]);
    const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");

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

    }

    return (
        <div className="flex flex-col justify-center items-center h-screen font-[Athiti] font-semibold bg-[#212121]">

                <input className="w-1/4" type="text" value={fen} onChange={(e) => setFen(e.target.value)} />

                <div className="grid grid-cols-8 h-[800px] w-[800px] ring-8 ring-[#78784e] scale-90">
                    {board.map((row, rowIndex) =>
                        row.map((piece, colIndex) => (
                          
                            <div
                                id={`${letters[colIndex]}${numbers[rowIndex]}`}
                                key={`${letters[colIndex]}${numbers[rowIndex]}`}
                                className={`flex flex-col items-start justify-center w-[100px] h-[100px]  ${
                                    (rowIndex + colIndex) % 2 === 0
                                        ? "bg-[#ebecd0] text-[#779556]"
                                        : "bg-[#779556] text-[#ebecd0]"
                                } 
                                ${colIndex === 0 && rowIndex !== 7 ? "pl-2 text-left" : ""} 
                                ${rowIndex === 7  && colIndex !== 0 ? "pr-2 text-right" : ""} 
                                ${rowIndex === 7 && colIndex === 0 ? "pl-2 text-left" : ""}
                                `}
                            >
                                {piece && 
                                    
                                    <img onMouseDown={(e) => {e.preventDefault()}}
                                        onClick={handlePieceClick}
                                        id={`${letters[colIndex]}${numbers[rowIndex]}`}
                                        key={`${letters[colIndex]}${numbers[rowIndex]}`}
                                        src={getPieceImage(piece)}
                                        className="h-17 w-17 cursor-pointer"
                                    />
                                        
                                }
                            </div>
                        ))    
                    )}
                </div>
        </div>
    );
}

export default Board;