import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import * as Icon from 'react-bootstrap-icons';
import CreateNoteModal from "../components/CreateNoteModal";
import ViewNoteModal from './ViewNoteModal';
import UpdateNoteModal from './UpdateNoteModal';
import { Col } from 'react-bootstrap';


const DragAndDrop = (props) => {
  const { displayNote } = props

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

  const moveToCompleted = async (note) => {
    try {
      await axios.put(`/api/notes/${note.id}`, {
        title: note.title,
        body: note.body,
        completed: true
      })
      getTodoNotes()
      getCompletedNotes()
    } catch (error) {
      console.log(error)
    }
  }
  
  const moveToTodo = async (note) => {
    try {
      await axios.put(`/api/notes/${note.id}`, {
        title: note.title,
        body: note.body,
        completed: false
      })
      getTodoNotes()
      getCompletedNotes()
    } catch (error) {
      console.log(error)
    }
  }
  
  const openCreateNoteModal = () => {
    setShowCreateNoteModal(true)
  }
  
  const closeCreateNoteModal = () => {
    setShowCreateNoteModal(false)
  }

  const openUpdateNoteModal = (note) => {
    setUpdateNote(note)
  }
  
  const closeUpdateNoteModal = () => {
    setUpdateNote(null)
  }
    
  const openViewNoteModal = (id) => {
    getNote(id)
  }
  
  const closeViewNoteModal = () => {
    setViewNote(null)
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
      // const completes = Array.from(completedNotes);
      const [newCompleted] = todos.splice(result.source.index, 1);
      // completes.splice(result.destination.index, 0, newCompleted)

      // const newResult = {}
      // newResult[source.droppableId] = todos
      // newResult[destination.droppableId] = completes

      moveToCompleted(newCompleted)
      // getCompletedNotes()
      // return newResult
    }

    // moving note from todo list to completed list
    if (source.droppableId === 'completed' && destination.droppableId === 'todo') {
      const completes = Array.from(completedNotes);
      // const todos = Array.from(todoNotes);
      const [newTodo] = completes.splice(result.source.index, 1);
      // todos.splice(result.destination.index, 0, newTodo)

      moveToTodo(newTodo)
    }


  }

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Col>
            <div>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#090804'}}>
                <h1>Todo</h1>
                <div style={{cursor: 'pointer', display: 'flex', justifyContent: 'flex-start', marginLeft: '1em'}}>
                  <Icon.PlusSquare 
                    onClick={openCreateNoteModal}
                    size={30} 
                  />
                </div>
              </div>
              <Droppable droppableId="todo">
                {(provided) => (
                  <div className='todo-board' {...provided.droppableProps} ref={provided.innerRef}>
                    {todoNotes && todoNotes.map((note, index) => {
                      return (
                        <Draggable key={note.id} draggableId={note.id.toString()} index={index}>
                          {(provided) => (
                            <div className='note' onClick={() => displayNote(note.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                              <div className='delete-note'>
                                <div  style={{cursor: 'pointer'}}>
                                  <Icon.X onClick={() => deleteNote(note.id)} />
                                </div>
                              </div>
                              {/* <p>{note.id}</p> */}
                              <div style={{cursor: 'pointer'}} onClick={() => openUpdateNoteModal(note)}>
                                <h4>{note.title}</h4>
                              </div>
                              {/* <p>{note.body}</p> */}
                              <div className='note-view-edit'>
                                {/* <div style={{cursor: 'pointer'}} >
                                  <Icon.List onClick={() => openViewNoteModal(note.id)} />
                                </div>
                                <div style={{cursor: 'pointer'}} >
                                  <Icon.PencilSquare onClick={() => openUpdateNoteModal(note)} />
                                </div> */}
                                <div style={{cursor: 'pointer'}} >
                                  <Icon.ArrowRightSquare onClick={() => moveToCompleted(note)} />
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
          </Col>
          <Col >
            <div>
              <h1 style={{color: '#090804'}}>Completed</h1>
              <Droppable droppableId="completed">
                {(provided) => (
                  <div className='completed-board' {...provided.droppableProps} ref={provided.innerRef}>
                    {completedNotes && completedNotes.map((note, index) => {
                      return (
                        <Draggable key={note.id} draggableId={note.id.toString()} index={index}>
                          {(provided) => (
                            <div className='note' onClick={() => displayNote(note.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                              <div className='delete-note'>
                                <div  style={{cursor: 'pointer'}}>
                                  <Icon.X onClick={() => deleteNote(note.id)} />
                                </div>
                              </div>
                              {/* <p>{note.id}</p> */}
                              <div style={{cursor: 'pointer'}} onClick={() => openUpdateNoteModal(note)}>
                                <h4>{note.title}</h4>
                              </div>
                              <div className='note-view-edit'>
                                {/* <div style={{cursor: 'pointer'}} >
                                  <Icon.List onClick={() => openViewNoteModal(note.id)} />
                                </div>
                                <div style={{cursor: 'pointer'}} >
                                  <Icon.PencilSquare onClick={() => openUpdateNoteModal(note)} />
                                </div> */}
                                <div style={{cursor: 'pointer'}} >
                                  <Icon.ArrowLeftSquare onClick={() => moveToTodo(note)} />
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
          </Col>
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