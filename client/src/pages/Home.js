import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import CompletedBoard from "../components/CompletedBoard";
import DnDTutorial from "../components/DnDTutorial";
import DragAndDrop from "../components/DragAndDrop";
import TodoBoard from "../components/TodoBoard";

const Home = () => {
  const [characters, updateCharacters] = useState('');

  const handleOnDragEnd = () => {

  }

  // function handleOnDragEnd(result) {
  //   if (!result.destination) return;

  //   const items = Array.from(characters);
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);

  //   updateCharacters(items);
  // }

  return(
    <div className='home'>
      <h1>Home</h1>
      <DragAndDrop />
      {/* <DnDTutorial /> */}
      {/* <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className='board-container'>
          <TodoBoard />
          <CompletedBoard />
        </div>
      </DragDropContext> */}
    </div>
  )
}


export default Home