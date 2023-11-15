import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChessInfo2 from './ChessInfo2/chessInfo2';
import ChessInfo3 from './ChessInfo3/chessInfo3';
import ChessInfo1 from './ChessInfo_1/chessInfo1';
import Footer from './Footer/footer';
import Header from './Header/header';
import Hero from './Hero/hero';
import Playground from './Playground/playground';

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
  return (
    <div className="h-[100vh] bg-black">
      <Router>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/playground" element={<Playground/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;