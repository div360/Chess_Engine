import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import './a.css';
import socket from '../Socket/socket';
import { ChessContext } from '../Context/context';
import { message } from 'antd';

const quotes = [
    '"Chess is the gymnasium of the mind."',
    '"In chess, the small one can become the big one."',
    '"Every chess master was once a beginner."',
    '"Chess is life in miniature; a struggle, conquest, and checkmate."',
    '"The pawns are the soul of chess."',
    '"Chess is the art of analysis."',
    '"Strategy requires thought, tactics require observation."',
    '"In chess, as in life, forethought wins."',
    '"Chess, like love, like music, has the power to make men happy."',
    '"The queen is the most powerful piece on the board, but the king is indispensable."'
  ]; // Your array of quotes

const easing = [0.6, 0.7, 0.9, 0.8];

const fadeInDown = {
    initial: {
        y: 20,
        opacity: 0,
        transition: { duration: 0.8, ease: easing }
      },
      animate: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: easing }
      },
      exit: {
        y: 0, // Keep the y position constant
        opacity: 0,
        transition: { duration: 0.8, ease: easing }
      }
};

const AnimatedLoading=()=>{

    const navigate = useNavigate();
    const {message, setMessage} = useContext(ChessContext)
    const location = useLocation();
    const [index, setIndex] = useState(0);
    const roomId = location?.state?.roomId === undefined ? "" : location.state.roomId;
    const playerId = location?.state?.playerId === undefined ? "" : location.state.playerId;
    const color = location?.state?.color === undefined ? "" : location.state.color;

    useEffect(() => {
        socket.send(`/app/checkonline/${roomId}`);
      const timer = setInterval(() => {
        setIndex((current) => (current + 1) % quotes.length);
      }, 3000); // Change quote every 3 seconds
      return () => clearInterval(timer);
    }, []);


    useEffect(() => {
        if(message?.message?.message === "start"){
            navigate("/playground/"+roomId, {state: {isBlackBoard:color==="white"?false:true, roomId: roomId, playerId: playerId}})
        }
    }, [message])

    return(
        <div className="p-5 text-3xl" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="icon-container">
                <div className="chess-icon"></div>
            </div>
            <div className="quote-container">
                <AnimatePresence>
                <motion.div key={index} variants={fadeInDown} initial="initial" animate="animate" exit="exit" style={{ color: 'white', minHeight: '100px' , display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {quotes[index]}
                </motion.div>
                </AnimatePresence>
            </div>
      </div>
    )
}

export default AnimatedLoading;
