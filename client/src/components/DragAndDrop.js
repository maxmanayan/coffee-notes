import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';


const DragAndDrop = () => {
  const [ todoNotes, setTodoNotes ] = useState()
  const [ completedNotes, setCompletedNotes ] = useState()

  useEffect(() => {
    getTodoNotes()
  },[])

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todoNotes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodoNotes(items);
  }

  const getTodoNotes = async () => {
    try {
      let res = await axios.get('/api/get_todo_notes')
      setTodoNotes(res.data)
      console.log('got todo notes')
    } catch (error) {
      console.log(error)
    }
  }

  const getCompletedNotes = async () => {
    try {
      let res = await axios.get('/api/get_completed_notes')
      setCompletedNotes(res.data)
      console.log('got completed notes')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="App">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div style={{display: 'flex'}}>
          <div style={{width: '50vw'}}>
            <Droppable droppableId="characters">
              {(provided) => (
                <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                  {todoNotes && todoNotes.map((note, index) => {
                    return (
                      <Draggable key={note.id} draggableId={note.id.toString()} index={index}>
                        {(provided) => (
                           <div className='note' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                           <h1>{note.title}</h1>
                           <p>{note.body}</p>
                         </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
  </div>
  );
}


export default DragAndDrop;