import React, {useState, useEffect, useContext, useRef } from "react";
import { boardToFen, fenToBoard, generateLegalMoves, getPieceColor, reverseFen } from "./fenBoardLogic";
import "./board.css";
import socket from "../Socket/socket";
import { ChessContext, ChessUtilsContext } from "../Context/context";
import { PiPhoneCallFill } from "react-icons/pi";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { ChessLeftMessage, ChessRightMessage } from "./chessMessage";
import ChessAnimation from "../Register/chessAnimation";
import { motion, AnimatePresence } from 'framer-motion';
import VideoCall from "../VideoCall/videoCall";

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

    const {chessUtils} = useContext(ChessUtilsContext);


    const [isCollapsed, setIsCollapsed] = useState(true);
    const [chatMessage, setChatMessage] = useState("");
    const [chatMessageArray, setChatMessageArray] = useState([]); // [ {senderId: "randomId", message: "message"}, {senderId: "randomId", message: "message"} ]

    const sendMessage = () => {
        if(chatMessage.trim() === "") return;
        socket.send(`/app/chat/${roomId}`, {
            code: 600,
            messageId : "randomId",
            roomId: roomId,
            senderId: playerId,
            message: {
                message: chatMessage
            },
            timestamp: new Date().getTime()
        })
        setChatMessage("");    
    };

    const handleMessageChange = (e) => {
        setChatMessage(e.target.value);
    }

    const handleKeyPressMessage = (e) => {
        if(e.key === "Enter"){
            sendMessage();
        }
    }

    const chatContainerRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [chatMessageArray]);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

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
        else if(message?.code === 600){
            setChatMessageArray([...chatMessageArray, {senderId: message?.senderId, message: message?.message}])
            if(isCollapsed){
                setIsCollapsed(false);
            }
        }
    }, [message]);

    return (
        <div className="flex flex-col justify-center items-center h-screen font-[Athiti]  bg-white overflow-clip">

                <ChessAnimation />

                <h1 className={`text-[60px] font-[Monoton] font-medium absolute z-10 top-5 bg-white h-max ${chessUtils.text}`}>8 X 8</h1>

                {/* <input className="w-1/4" type="text" value={fen} onChange={(e) => setFen(e.target.value)} /> */}


                {/* Chat and video call UI start here */}

                <div className="flex flex-row items-start absolute top-2 right-10 justify-between self-end h-[27%] w-[25%] gap-5 bg-black">
                    <VideoCall/>
                </div>

                <AnimatePresence>
                {
                    isCollapsed && <motion.div
                    key="collapsed"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: '6%' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 1, ease: 'easeInOut', type: "tween" }}
                    className="flex flex-row items-start fixed bottom-0 right-10 justify-between self-end h-[6%] w-[25%] gap-5 bg-black select-none"
                  >
                    <div className="flex flex-row items-center justify-between h-full w-full px-4">
                        <IoMdArrowDropupCircle onClick={()=>setIsCollapsed(false)} className="rounded-full h-8 w-8 absolute bg-black text-white -top-[10px] left-[50%] cursor-pointer"/>
            
                            <div className="flex flex-row items-center justify-start gap-4">
                                <IoPersonSharp className={`text-[23px] text-white`} />
                                <h1 className="text-white font-[Poppins] font-semibold text-lg">Hrishabh Tiwari</h1>
                            </div>
                            <PiPhoneCallFill className={`text-[23px] text-white`} />
                        </div>
                    </motion.div>
                }

                {
                    !isCollapsed && <motion.div
                        key="expanded"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '70%' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 1, ease: 'easeInOut', type: "tween" }}
                        className="flex flex-row items-start fixed bottom-0 right-10 justify-between self-end h-[70%] w-[25%] gap-5 bg-black select-none"
                    >
                        <div className="flex flex-col items-center justify-start h-full w-[95%] mx-auto">
                            
                                <div className="flex flex-row items-center justify-between h-[8%] w-full px-4">
                            
                                <IoMdArrowDropupCircle onClick={()=>setIsCollapsed(true)} className="rotate-180 rounded-full h-8 w-8 absolute bg-black text-white -top-[10px] left-[50%] cursor-pointer"/>

                                    <div className="flex flex-row items-center justify-start gap-4">
                                        <IoPersonSharp className={`text-[23px] text-white`} />
                                        <h1 className="text-white font-[Poppins] font-semibold text-lg">Hrishabh Tiwari</h1>
                                    </div>
                                    <PiPhoneCallFill className={`text-[23px] text-white cursor-pointer`} />
                                </div>

                                <div ref={chatContainerRef} className="flex flex-col items-center h-[82%] bg-white w-full mb-4 py-2 overflow-y-scroll">
                                    {
                                        chatMessageArray.map((msg, index)=>(
                                            msg.senderId === playerId ? 
                                            <ChessRightMessage key={index} message={msg.message} />
                                             : 
                                            <ChessLeftMessage key={index} message={msg.message} />

                                        ))
                                    }
                                </div>

                                <div className="flex flex-row items-center justify-between w-full h-[8%] bg-white mb-4 px-4">
                                    <input onKeyDown={handleKeyPressMessage} onChange={handleMessageChange} name="chatMessage" value={chatMessage} placeholder={"Type a message..."} className="placeholder:text-slate-400 font-semibold text-lg h-full bg-white w-full outline-none" autoComplete={"off"}></input>
                                    <RiSendPlaneFill onClick={sendMessage} size={35} className="text-black cursor-pointer"/>
                                </div>
                            </div>
                        </motion.div>
                }
                </AnimatePresence>

                {/* Chat and video call UI end here */}

                {/* Chess Board UI start here */}


                <div className={`grid grid-cols-8 h-[800px] w-[800px] ring-8 ${chessUtils.ring} scale-[80%] font-semibold bg-white`}>
                    {board.map((row, rowIndex) =>
                        row.map((piece, colIndex) => (
                          
                            <div
                                onClick={handlePieceClick}
                                id={`${letters[colIndex]}${numbers[rowIndex]}`}
                                key={`${letters[colIndex]}${numbers[rowIndex]}`}
                                className={`flex flex-col items-start justify-center w-[100px] h-[100px]  ${
                                    (rowIndex + colIndex) % 2 === 0
                                        ? ` ${chessUtils.text}`
                                        : `${chessUtils.bg} text-white`
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

                {/* Chess Board UI end here */}
        </div>
    );
}

export default Board;