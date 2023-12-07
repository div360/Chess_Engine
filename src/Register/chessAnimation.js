import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ChessAnimation = () => {
  const whitePieces = ['king_white', 'queen_white', 'bishop_white', 'knight_white', 'rook_white', 'pawn_white'];
  const blackPieces = ['pawn_black', 'rook_black', 'knight_black', 'bishop_black', 'queen_black', 'king_black'];

  const [moveY, setMoveY] = useState(true); // initial direction

  useEffect(() => {
    const interval = setInterval(() => {
      setMoveY(!moveY); // toggle direction
    }, 500);
    return () => clearInterval(interval); // cleanup
}, []); // run once

  return (
    <div className="bottom-0 fixed h-max w-full">
      <motion.div className="flex flex-row items-center justify-start gap-5 h-full w-1/2 absolute left-0">
        {whitePieces.map((piece, index) => {
          const delay = index * 0.1;
          const yOffset = moveY ? 10 : -10; // alternate y position
          const jumpHeight = 5; // adjust jump height here

          return (
            <motion.img
              key={piece}
              src={`assets/chess_pieces/${piece}.png`}
              className="h-20 w-20"
              initial={{ opacity: 1, x: -700 + index * 10, y: yOffset }}
              animate={{
                opacity: 1,
                x: 300 + index * 10,
                y: yOffset + (moveY ? jumpHeight : -jumpHeight), // add jump
              }}
              transition={{
                type: 'tween',
                delay: delay,
                duration: 20,
                repeat: Infinity,
                repeatDelay: 0.5,
                repeatType: 'loop',
              }}
            />
          );
        })}
      </motion.div>

      <motion.div className="flex flex-row items-center justify-end gap-5 h-full w-full relative">
        {blackPieces.map((piece, index) => {
          const delay = index * 0.1;
          const yOffset = moveY ? 10 : -10;
          const jumpHeight = 5;

          return (
            <motion.img
              key={piece}
              src={`assets/chess_pieces/${piece}.png`}
              className="h-20 w-20"
              initial={{ opacity: 1, x: 700 - index * 10, y: yOffset }}
              animate={{
                opacity: 1,
                x: -300 - index * 10,
                y: yOffset + (moveY ? jumpHeight : -jumpHeight), // add jump
              }}
              transition={{
                type: 'tween',
                delay: delay,
                duration: 20,
                repeat: Infinity,
                repeatDelay: 0.5,
                repeatType: 'loop',
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default ChessAnimation;
