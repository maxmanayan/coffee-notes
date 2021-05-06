import React from "react";
import Board from "../components/Board";
import Card from "../components/Card";

const Home = () => {
  return(
    <div className='flexbox'>
      <Board  className="board">
        <Card id="card-1" className="card">
          <p>Card 1</p>
        </Card>
        <Card id="card-3" className="card">
          <p>Card 3</p>
        </Card>
      </Board>

      <Board  className="board">
        <Card id="card-2" className="card">
          <p>Card 2</p>
        </Card>
      </Board>
    </div>
  )
}


export default Home