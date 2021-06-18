import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import * as Icon from 'react-bootstrap-icons';
import { AuthContext } from '../providers/AuthProvider';
import CreateTodoInput from './CreateTodoInput';
import ShowTodoItem from './ShowTodoItem';
import UpdateNoteModal from './UpdateNoteModal';

const TodoList = (props) => {
  const { user } = useContext(AuthContext)
  const { note, displayNote, getTodoNotes, getCompletedNotes } = props
  const [items, setItems] = useState(null)
  const [hideTrash, setHideTrash] = useState(false)
  const [ updateNote, setUpdateNote ] = useState(null)



  useEffect(()=>{
    getItems()
  },[])

  
  const openUpdateNoteModal = (note) => {
    setUpdateNote(note)
  }

  const closeUpdateNoteModal = () => {
    setUpdateNote(null)
  }

  const getItems = async () => {
    try {
      let res = await axios.get(`/api/users/${user.id}/notes/${note.id}/items`)
      setItems(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const editComplete = async (item) => {
    try {
      if (!item.completed) {
        await axios.put(`/api/users/${user.id}/notes/${note.id}/items/${item.id}`, {
          content: note.content,
          completed: true
        })
        getItems()
      }
      if (item.completed) {
        await axios.put(`/api/users/${user.id}/notes/${note.id}/items/${item.id}`, {
          content: note.content,
          completed: false
        })
        getItems()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteItem = async (item) => {
    try {
      await axios.delete(`/api/users/${user.id}/notes/${note.id}/items/${item.id}`)
      getItems()
    } catch (error) {
      console.log(error)
    }
  }

  const renderTodoItems = () => {
    return items.map(item => {
      if (!item.completed) {
        return(
          <div className='todo-item-container'>
            <div>
              <Icon.CheckSquare className='todo-check' onClick={() => editComplete(item)} size={25} />
            </div>
            <div>
              <ShowTodoItem key={item.id} item={item} note={note} getItems={getItems} deleteItem={deleteItem}/>
            </div>
          </div>
        )
      }
    })
  }

  const renderCompletedItems = () => {
    return items.map(item => {
      if (item.completed) {
        return(
          <div className='todo-item-container'>
            <div>
              <Icon.CheckSquare className='todo-check-completed' onClick={() => editComplete(item)} size={25} />
            </div>
            <div>
              <ShowTodoItem key={item.id} item={item} note={note} getItems={getItems} deleteItem={deleteItem}/>
            </div>
          </div>
        )
      }
    })
  }

  return(
    <>
      <div>
        <div>
          <h1>{note.title}</h1>
          <h5>{note.body}</h5>
        </div>
        <div style={{cursor: 'pointer'}} onClick={() => openUpdateNoteModal(note)}>
          <Icon.PencilSquare />
        </div>
      </div>
      <div className='todo-list'>
        <div className='todo-list-title'>
          <h6>Todo</h6>
        </div>
        <div>
          <CreateTodoInput key={note.id} note={note} getItems={getItems} />
        </div>
        {items && renderTodoItems()}
      </div>
      <div className='todo-list-completed'>
        <h6>Completed</h6>
        {items && renderCompletedItems()}
      </div>

      {updateNote && 
        <UpdateNoteModal
          closeUpdateNoteModal={closeUpdateNoteModal} updateNote={updateNote} 
          getTodoNotes={getTodoNotes} getCompletedNotes={getCompletedNotes}
          displayNote={displayNote} note={note} getItems={getItems}
      />}
    </>
  )
}


export default TodoList