import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import CompletedBoard from "../components/CompletedBoard";
import TodoBoard from "../components/TodoBoard";

const Home = () => {
  return(
    <div className='home'>
      <h1>Home</h1>
      <DragDropContext>
        <div className='board-container'>
          <TodoBoard />
          <CompletedBoard />
        </div>
      </DragDropContext>
    </div>
  )
}


export default Home