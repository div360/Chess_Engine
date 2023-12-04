import React, {useState, useEffect, useContext} from "react";
import { boardToFen, fenToBoard, generateLegalMoves, getPieceColor, reverseFen } from "./fenBoardLogic";
import "./board.css";
import socket from "../Socket/socket";
import { ChessContext } from "../Context/context";

function Board({isBlackBoardSet, roomId, playerId}) {
    const fenString = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

    const {message, setMessage} = useContext(ChessContext)
    
    const piece_color = isBlackBoardSet ? "black" : "white";

    const [isBlackBoard, setIsBlackBoard] = useState(isBlackBoardSet); // [false, true] = [white, black]
    const [moveCount, setMoveCount] = useState(0);

    const [board, setBoard] = useState([]);
    const [fen, setFen] = useState(fenString);
    
    const [letters, setLetters] = useState(["a", "b", "c", "d", "e", "f", "g", "h"]);
    const [numbers, setNumbers] = useState([8, 7, 6, 5, 4, 3, 2, 1]);

    const [fromSquare, setFromSquare] = useState(null);
    const [toSquare, setToSquare] = useState(null);

    const [moves, setMoves] = useState([]);

    const [kingPosition, setKingPosition] = useState({white: "e1", black: "e8"});

    useEffect(() => {
        if(isBlackBoard === false){
            setFen(fenString);
            setBoard(fenToBoard(fenString));
        }
        else{
            setNumbers([1, 2, 3, 4, 5, 6, 7, 8]);
            const reversedFenString = reverseFen(fenString);
            setFen(reversedFenString);
            setBoard(fenToBoard(reversedFenString));
        }
    }, [isBlackBoard]);

    useEffect(() => {

        console.log(fromSquare, toSquare)
        if(fromSquare === null) return;

        if(fromSquare !== null){
            const moves = generateLegalMoves(board, fromSquare, numbers, letters, kingPosition, piece_color)

            console.log(moves);
            if(moves !== undefined){
                setMoves(moves);
            }
        }

        if(toSquare === null) return;
        if(moves.includes(toSquare) === false) return;
        if(fromSquare === toSquare) return;

        const piece = getPieceAtSquare(fromSquare);

        if(piece?.toLowerCase() === "k"){
            setKingPosition({...kingPosition, [getPieceColor(piece)]: toSquare});
        }

        movePiece(fromSquare, toSquare)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fromSquare, toSquare]);


    const getPieceImage = (piece) => {
        const color = piece === piece.toUpperCase() ? "white" : "black";
        const type = piece.toLowerCase();
        if (type === "p") return `${process.env.PUBLIC_URL}/assets/chess_pieces/pawn_${color}.png`;
        if (type === "r") return `${process.env.PUBLIC_URL}/assets/chess_pieces/rook_${color}.png`;
        if (type === "n") return `${process.env.PUBLIC_URL}/assets/chess_pieces/knight_${color}.png`;
        if (type === "b") return `${process.env.PUBLIC_URL}/assets/chess_pieces/bishop_${color}.png`;
        if (type === "q") return `${process.env.PUBLIC_URL}/assets/chess_pieces/queen_${color}.png`;
        if (type === "k") return `${process.env.PUBLIC_URL}/assets/chess_pieces/king_${color}.png`;
    };

    const handlePieceClick = (e) => {
        const square_id = e.target.id;

        console.log("moveCount", moveCount)

        if(getPieceAtSquare(square_id) !== null){
            if(getPieceColor(getPieceAtSquare(square_id)) === piece_color){
                if(piece_color === "white" && moveCount % 2 !== 0) return;
                if(piece_color === "black" && moveCount % 2 === 0) return;
            }
        }

        if(fromSquare === square_id) {
            setFromSquare(null);
            setMoves([]);
        }
        else{
            if(fromSquare === null){
                if(getPieceAtSquare(square_id) === null) return;
                if(isBlackBoard && getPieceColor(getPieceAtSquare(square_id)) === "white") return;
                if(isBlackBoard === false && getPieceColor(getPieceAtSquare(square_id)) === "black") return;
                setFromSquare(square_id);
            }
            else{
                if(getPieceAtSquare(square_id) !== null && getPieceColor(getPieceAtSquare(square_id)) === getPieceColor(getPieceAtSquare(fromSquare))){
                    setFromSquare(square_id);
                    return;
                }
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
        
        setMoveCount(moveCount + 1);
        
        var fenToSend = boardToFen(board)
        var messageToSend = {
            code: 200,
            messageId : "randomId",
            roomId: roomId,
            senderId: playerId,
            message: {
                fen_string: fenToSend, 
                to: to,
                from: from
            },
            timestamp: new Date().getTime()
        }
        socket.send(`/app/move/${roomId}`, messageToSend);

        setFromSquare(null);
        setToSquare(null);
        setMoves([]);
    }

    const movePieceFromOpponent = (from, to, senderId) => {
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
        if(senderId !== playerId){
            setMoveCount(moveCount + 1);
        }
    }

    useEffect(() => {
        if(message?.code === 200){
            console.log("message from socket in board", message)
            movePieceFromOpponent(message?.from, message?.to, message?.senderId)
        }
    }, [message]);

    return (
        <div className="flex flex-col justify-center items-center h-screen font-[Athiti] font-semibold bg-[#212121]">

                {/* <input className="w-1/4" type="text" value={fen} onChange={(e) => setFen(e.target.value)} /> */}

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
                                ${fromSquare === `${letters[colIndex]}${numbers[rowIndex]}` ? " border-4 border-[#494949] bg-yellow-400" : ""}
                                ${moves.includes(`${letters[colIndex]}${numbers[rowIndex]}`) ? `${(rowIndex + colIndex) % 2 === 0 ? "bg-[#f0d860]" : "bg-[#d4b727]"}   border-1 border-[#494949] cursor-pointer` : ""}                                `}
                            >
                                {piece && 
                                    
                                    <img onMouseDown={(e) => {e.preventDefault()}}
                                        id={`${letters[colIndex]}${numbers[rowIndex]}`}
                                        key={`${letters[colIndex]}${numbers[rowIndex]}`}
                                        src={getPieceImage(piece)}
                                        className={`
                                            h-17 w-17
                                            ${isBlackBoard && getPieceColor(piece) === "black" ? "cursor-pointer" : ""}
                                            ${!isBlackBoard && getPieceColor(piece) === "white" ? "cursor-pointer" : ""}
                                        `}
                                        alt={`${letters[colIndex]}${numbers[rowIndex]}_piece`}
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