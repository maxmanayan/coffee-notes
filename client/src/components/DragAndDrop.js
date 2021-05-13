import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import * as Icon from 'react-bootstrap-icons';
import CreateNoteModal from "../components/CreateNoteModal";
import ViewNoteModal from './ViewNoteModal';
import UpdateNoteModal from './UpdateNoteModal';


const DragAndDrop = () => {
  const [ todoNotes, setTodoNotes ] = useState([])
  const [ completedNotes, setCompletedNotes ] = useState([])

  const [ viewNote, setViewNote ] = useState(null)
  const [ updateNote, setUpdateNote ] = useState(null)

  const [ showViewNoteModal, setShowViewNoteModal ] = useState(false)
  const [ showCreateNoteModal, setShowCreateNoteModal ] = useState(false)
  const [ showUpdateNoteModal, setShowUpdateNoteModal ] = useState(false)

  
   
  useEffect(() => {
    getTodoNotes()
    getCompletedNotes()
  },[])
  
  
  const getTodoNotes = async () => {
    try {
      let res = await axios.get('/api/get_todo_notes')
      setTodoNotes(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  const getCompletedNotes = async () => {
    try {
      let res = await axios.get('/api/get_completed_notes')
      setCompletedNotes(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteNote = async (id) => {
    try {
      let res = await axios.delete(`/api/notes/${id}`)
      getTodoNotes()
      getCompletedNotes()
    } catch (error) {
      console.log(error)
    }
  }

  const getNote = async (noteID) => {
    try {
      let res = await axios.get(`/api/notes/${noteID}`)
      setViewNote(res.data)
    } catch (error) {
      console.log(error)
    }
  } 

  // const editNote = async (id, title, info, completed) => {
  //   try {
  //     let res = await axios.put(`/api/notes/ ${id}`, {
  //       title: title,
  //       body: info,
  //       completed: completed
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  
  const openCreateNoteModal = () => {
    setShowCreateNoteModal(true)
  }
  
  const closeCreateNoteModal = () => {
    setShowCreateNoteModal(false)
  }

  const openUpdateNoteModal = (note) => {
    setUpdateNote(note)
    // setShowUpdateNoteModal(true)
  }
  
  const closeUpdateNoteModal = () => {
    setUpdateNote(null)
    // setShowUpdateNoteModal(false)
  }
    
  const openViewNoteModal = (id) => {
    getNote(id)
    // setShowViewNoteModal(true)
  }
  
  const closeViewNoteModal = () => {
    setViewNote(null)
    // setShowViewNoteModal(false)
  }
    
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

  return (
    <div>
      <div style={{cursor: 'pointer'}}>
        <Icon.PlusSquare 
          onClick={openCreateNoteModal}
          size={50} 
        />
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{background: 'red', width: '45%'}}>
            <h1>Todo</h1>
            <Droppable droppableId="todo">
              {(provided) => (
                <div className='todo-board' {...provided.droppableProps} ref={provided.innerRef}>
                  {todoNotes && todoNotes.map((note, index) => {
                    return (
                      <Draggable key={note.id} draggableId={note.id.toString()} index={index}>
                        {(provided) => (
                          <div className='note' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                            <div className='delete-note'>
                              <div  style={{cursor: 'pointer'}}>
                                <Icon.X onClick={() => deleteNote(note.id)} />
                              </div>
                            </div>
                            {/* <p>{note.id}</p> */}
                            <h4>{note.title}</h4>
                            {/* <p>{note.body}</p> */}
                            <div className='note-view-edit'>
                              <div style={{cursor: 'pointer'}} >
                                <Icon.List onClick={() => openViewNoteModal(note.id)} />
                              </div>
                              <div style={{cursor: 'pointer'}} >
                                <Icon.PencilSquare onClick={() => openUpdateNoteModal(note)} />
                              </div>
                            </div>
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
                <div className='completed-board' {...provided.droppableProps} ref={provided.innerRef}>
                  {completedNotes && completedNotes.map((note, index) => {
                    return (
                      <Draggable key={note.id} draggableId={note.id.toString()} index={index}>
                        {(provided) => (
                          <div className='note' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                            <div className='delete-note'>
                              <div  style={{cursor: 'pointer'}}>
                                <Icon.X onClick={() => deleteNote(note.id)} />
                              </div>
                            </div>
                            {/* <p>{note.id}</p> */}
                            <h4>{note.title}</h4>
                            <div className='note-view-edit'>
                              <div style={{cursor: 'pointer'}} >
                                <Icon.List onClick={() => openViewNoteModal(note.id)} />
                              </div>
                              <div style={{cursor: 'pointer'}} >
                                <Icon.PencilSquare onClick={() => openUpdateNoteModal(note)} />
                              </div>
                            </div>
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
      {showCreateNoteModal && 
        <CreateNoteModal 
          closeCreateNoteModal={closeCreateNoteModal} getTodoNotes={getTodoNotes}
      />}
      {viewNote && 
        <ViewNoteModal 
          closeViewNoteModal={closeViewNoteModal} viewNote={viewNote}
      />}
      {updateNote && 
        <UpdateNoteModal 
          closeUpdateNoteModal={closeUpdateNoteModal} updateNote={updateNote} 
          getTodoNotes={getTodoNotes} getCompletedNotes={getCompletedNotes}
      />}
  </div>
  );
}


export default DragAndDrop;