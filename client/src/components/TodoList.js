import axios from 'axios'
import React, { useEffect, useState } from 'react'
import * as Icon from 'react-bootstrap-icons';
import CreateTodoInput from './CreateTodoInput';

const TodoList = (props) => {
  const { note } = props
  const [items, setItems] = useState(null)

  useEffect(()=>{
    getItems()
  },[])

  const getItems = async () => {
    try {
      let res = await axios.get(`/api/notes/${note.id}/items`)
      setItems(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const editComplete = async (item) => {
    try {
      if (!item.completed) {
        await axios.put(`/api/notes/${note.id}/items/${item.id}`, {
          content: note.content,
          completed: true
        })
        getItems()
      }
      if (item.completed) {
        await axios.put(`/api/notes/${note.id}/items/${item.id}`, {
          content: note.content,
          completed: false
        })
        getItems()
      }
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
              <p className='todo-item'>{item.content}</p>
            </div>
            <div>
              <Icon.Trash className='todo-item-trash'/>
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
              <p className='todo-item'>{item.content}</p>
            </div>
            <div>
              <Icon.Trash className='todo-item-trash' />
            </div>
          </div>
        )
      }
    })
  }

  return(
    <>
      <h1>{note.title}</h1>
      <h5>{note.body}</h5>
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
    </>
  )
}


export default TodoList