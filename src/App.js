import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Playground from './Playground/playground';
import Invite from './Invite/invite';
import RegisterFirstUser from './Register/registerFirstUser';
import WaitingArea from './Register/waitingArea';
import socket from './Socket/socket';
import Lobby from './Register/lobby';
import RegisterSecondUser from './Register/registerSecondUser';
import {ChessContext, ChessUtilsContext} from './Context/context';
import NewHome from './NewHome/newHome';
import VideoCall from './VideoCall/videoCall';
import NotFound from './404';


function App() {
  const [message, setMessage] = useState(null)

  const [chessUtils, setChessUtils] = useState({bg:"bg-[#303030]", ring:"ring-[#303030]", text:"text-[#303030]", border:"border-[#303030]", bgHover:"hover:bg-[#303030]", hex:"#303030", call:false})


  useEffect(() => {
    socket.connect();

    setTimeout(() => {
      setChessUtils({...chessUtils, bg: "bg-[#006600]", ring: "ring-[#006600]", text: "text-[#006600]", border: "border-[#006600]", bgHover: "hover:bg-[#006600]"})
    }, 5000);

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
                <Route path="*" element={<NotFound/>} />

              </Routes>
          </Router>
        </div>
      </ChessContext.Provider>
    </ChessUtilsContext.Provider>
  );
}

export default App;