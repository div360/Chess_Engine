import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChessInfo2 from './ChessInfo2/chessInfo2';
import ChessInfo3 from './ChessInfo3/chessInfo3';
import ChessInfo1 from './ChessInfo_1/chessInfo1';
import Footer from './Footer/footer';
import Header from './Header/header';
import Hero from './Hero/hero';
import Playground from './Playground/playground';
import Invite from './Invite/invite';
import RegisterFirstUser from './Register/registerFirstUser';
import WaitingArea from './Register/waitingArea';
import socket from './Socket/socket';
import Lobby from './Register/lobby';
import RegisterSecondUser from './Register/registerSecondUser';
import {ChessContext} from './Context/context';

function HomePage(){

  return(
      <div className='h-full'>
        <Header/>
        <Hero/>
        <ChessInfo1/>
        <ChessInfo2/>
        <ChessInfo3/>
        <Footer/>
      </div>
  )
}

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    socket.connect();
  }, [])
  
  return (
    <ChessContext.Provider value={{message, setMessage}}>
    <div className="h-[100vh] bg-black">
      <Router>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/register" element={<RegisterFirstUser/>} />
            <Route path='/invite' element={<Invite/>} />
            <Route path='/join/:roomId/:playerId' element={<RegisterSecondUser/>} />
            <Route path='/lobby' element={<Lobby/>} />
            <Route path="/playground/:roomid" element={<Playground/>} />
            <Route path="/waitingarea/:roomid" element={<WaitingArea/>} />
          </Routes>
      </Router>
    </div>
    </ChessContext.Provider>

  );
}

export default App;