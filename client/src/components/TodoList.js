import axios from 'axios'
import React, { useEffect, useState } from 'react'
import * as Icon from 'react-bootstrap-icons';

const TodoList = (props) => {
  const { note } = props
  const [items, setItems] = useState(null)

  useEffect(()=>{
    getItems()
  },[])

  const getItems = async () => {
    console.log('note', note)
    try {
      let res = await axios.get(`/api/notes/${note.id}/items`)
      console.log('in getItems', res.data)
      setItems(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderItems = () => {
    return items.map(item => {
      return(
        <div className='todo-item-container'>
          <div>
            <Icon.CheckSquare className='todo-check' size={25} />
          </div>
          <div>
            <p className='todo-item'>{item.content}</p>
          </div>
        </div>
      )
    })
  }

  return(
    <>
      <h1>TodoList</h1>
      <div className='todo-list'>
        {items && renderItems()}
      </div>
    </>
  )
}


export default TodoList