import ChessInfo2 from './ChessInfo2/chessInfo2';
import ChessInfo3 from './ChessInfo3/chessInfo3';
import ChessInfo1 from './ChessInfo_1/chessInfo1';
import Footer from './Footer/footer';
import Header from './Header/header';
import Hero from './Hero/hero';

function App() {
  return (
    <div className="h-[100vh] bg-black">
      <Header/>
      <Hero/>
      <ChessInfo1/>
      <ChessInfo2/>
      <ChessInfo3/>
      <Footer/>
    </div>
  );
}

export default App;