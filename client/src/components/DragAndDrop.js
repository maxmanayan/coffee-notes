import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';


const DragAndDrop = () => {
  const [ todoNotes, setTodoNotes ] = useState([])
  const [ completedNotes, setCompletedNotes ] = useState([])

  useEffect(() => {
    getTodoNotes()
  },[])

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // if note is dropped outside droppable zone
    if (!result.destination) return;

    // reordering notes within todo list
    if (source.droppableId === 'todo' && destination.droppableId === 'todo') {
      const todos = Array.from(todoNotes);
      const [reorderedTodo] = todos.splice(result.source.index, 1);
      todos.splice(result.destination.index, 0, reorderedTodo);

      setTodoNotes(todos);
    }

    // reordering notes within completed list
    if (source.droppableId === 'completed' && destination.droppableId === 'completed') {
      const completes = Array.from(completedNotes);
      const [reorderedCompleted] = completes.splice(result.source.index, 1);
      completes.splice(result.destination.index, 0, reorderedCompleted);

      setCompletedNotes(completes);
    }

    // moving note from todo list to completed list
    if (source.droppableId === 'todo' && destination.droppableId === 'completed') {
    const todos = Array.from(todoNotes);
    const [newCompleted] = todos.splice(result.source.index, 1);

    setTodoNotes(todos);
    setCompletedNotes([...completedNotes, newCompleted])
    }

    // moving note from todo list to completed list
    if (source.droppableId === 'completed' && destination.droppableId === 'todo') {
    const completes = Array.from(completedNotes);
    const [newTodo] = completes.splice(result.source.index, 1);

    setCompletedNotes(completes);
    setTodoNotes([...todoNotes, newTodo])
    }


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
          <div style={{background: 'red', width: '45%'}}>
            <h1>Todo</h1>
            <Droppable droppableId="todo">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {todoNotes && todoNotes.map((note, index) => {
                    return (
                      <Draggable key={note.id} draggableId={note.id.toString()} index={index}>
                        {(provided) => (
                          <div className='note' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                            <p>{note.id}</p>
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
          <div style={{background: 'blue', width: '45%'}}>
            <h1>Completed</h1>
            <Droppable droppableId="completed">
              {(provided) => (
                <div style={{background: 'white', minHeight: '200px'}} {...provided.droppableProps} ref={provided.innerRef}>
                  {completedNotes && completedNotes.map((note, index) => {
                    return (
                      <Draggable key={note.id} draggableId={note.id.toString()} index={index}>
                        {(provided) => (
                          <div className='note' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                            <p>{note.id}</p>
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