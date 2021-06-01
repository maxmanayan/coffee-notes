import axios from 'axios'
import React, { useEffect, useState } from 'react'

const TodoList = () => {
  const [items, setItems] = useState(null)

  useEffect(()=>{
    getItems()
  },[])

  const getItems = async () => {
    try {
      let res = await axios.get('/api/items')
      setItems(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderItems = () => {
    return items.map(item => {
      return(
        <p className='todo-item'>{item.todo}</p>
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