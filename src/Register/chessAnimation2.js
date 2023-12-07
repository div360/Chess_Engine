import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ChessAnimation2 = () => {
    const chessPieces = ['king_white', 'queen_white', 'bishop_white', 
    'knight_white', 'rook_white', 'pawn_white', 'pawn_black', 
    'rook_black', 'knight_black', 'bishop_black', 'queen_black', 
    'king_black', 'king_white', 'queen_white', 'bishop_white', 
    'knight_white', 'rook_white', 'pawn_white', 'pawn_black', 
    'rook_black', 'knight_black', 'bishop_black', 'queen_black', 
    'king_black','king_white', 'queen_white', 'bishop_white', 
    'knight_white', 'rook_white', 'pawn_white', 'pawn_black', 
    'rook_black', 'knight_black', 'bishop_black', 'queen_black', 
    'king_black', 'king_white', 'queen_white', 'bishop_white', 
    'knight_white', 'rook_white', 'pawn_white', 'pawn_black', 
    'rook_black', 'knight_black', 'bishop_black', 'queen_black', 
    'king_black', 'queen_white', 'bishop_white', 
    'knight_white', 'rook_white', 'pawn_white', 'pawn_black', 
    'rook_black', 'knight_black', 'bishop_black', 'queen_black', 
    'king_black', 'king_white', 'queen_white', 'bishop_white', 
    'knight_white', 'rook_white', 'pawn_white', 'pawn_black', 
    'rook_black', 'knight_black', 'bishop_black', 'queen_black', 
    'king_black','king_white', 'queen_white', 'bishop_white', 
    'knight_white', 'rook_white', 'pawn_white', 'pawn_black', 
    'rook_black', 'knight_black', 'bishop_black', 'queen_black', 
    'king_black', 'king_white', 'queen_white', 'bishop_white', 
    'knight_white', 'rook_white', 'pawn_white', 'pawn_black', 
    'rook_black', 'knight_black', 'bishop_black', 'queen_black', 
    'king_black'];

    const [piecePositions, setPiecePositions] = useState([]);

    useEffect(() => {
        const rotates = [0, 1 ,3, 6, 12, 45, 90, 180];
        const randomPositions = chessPieces.map((piece) => {
            const randomX = Math.floor(Math.random() * window.innerWidth)-100;
            const randomY = Math.floor(Math.random() * window.innerHeight)-100;
            const rotate = `rotate-${rotates[Math.floor(Math.random() * rotates.length)]}`;
            return { piece, x: randomX, y: randomY, rotate: rotate };
        });
        setPiecePositions(randomPositions);
    }, []);

    return (
        <div className='absolute z-auto h-full w-full cursor-grab'>
            {piecePositions.map((position) => (
                <motion.img
                    className={`h-3 w-3  ${position.rotate}`}
                    drag
                    dragConstraints={{
                        left: -100,
                        right: 100,
                        top: -100,
                        bottom: 100,
                    }}
                    initial={{scale: 0}}
                    animate={{
                        scale: 1.2,
                        transition: {
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                            delay: Math.random() * 20,
                            repeatDelay: 3.5,
                            repeatType: 'loop',
                            repeat: Infinity,
                            
                        },
                    }}
                    key={position.piece}
                    src={`${process.env.PUBLIC_URL}/assets/chess_pieces/${position.piece}.png`}
                    alt={position.piece}
                    style={{ position: 'absolute', top: position.y, left: position.x }}
                />
            ))}
        </div>
    );
};

export default ChessAnimation2;
