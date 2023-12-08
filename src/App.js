import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChessInfo2 from './ChessInfo2/chessInfo2';
import ChessInfo3 from './ChessInfo3/chessInfo3';
import ChessInfo1 from './ChessInfo_1/chessInfo1';
import Footer from './Footer/footer';
import Hero from './Hero/hero';
import Playground from './Playground/playground';
import Invite from './Invite/invite';
import RegisterFirstUser from './Register/registerFirstUser';
import WaitingArea from './Register/waitingArea';
import socket from './Socket/socket';
import Lobby from './Register/lobby';
import RegisterSecondUser from './Register/registerSecondUser';
import {ChessContext} from './Context/context';
import NewHome from './NewHome/newHome';
import VideoCall from './VideoCall/videoCall';

function HomePage(){

  return(
      <div className='h-full'>
        <Hero/>
        <ChessInfo1/>
        <ChessInfo2/>
        <ChessInfo3/>
        <Footer/>
      </div>
  )
}

function App() {
  const [message, setMessage] = useState('null')

  useEffect(() => {
    socket.connect();
  }, [])
  
  return (
    <ChessUtilsContext.Provider value={{chessUtils, setChessUtils}}>
      <ChessContext.Provider value={{message, setMessage}}>
        <div className="h-[100vh] bg-black">
          <Router>
              <Routes>
                <Route path="/" element={<NewHome/>} />
                <Route path="/register" element={<RegisterFirstUser/>} />
                <Route path='/invite' element={<Invite/>} />
                <Route path='/join/:roomId/:playerId' element={<RegisterSecondUser/>} />
                <Route path='/lobby' element={<Lobby/>} />
                <Route path="/playground/:roomid" element={<Playground/>} />
                <Route path="/waitingarea/:roomid" element={<WaitingArea/>} />
                <Route path="/video" element={<VideoCall/>} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
              </Routes>
          </Router>
        </div>
      </ChessContext.Provider>
    </ChessUtilsContext.Provider>
  );
}

export default App;