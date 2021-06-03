import React, { useState } from 'react';
import EditTodoInput from './EditTodoInput';

const ShowTodoItem = (props) => {
  const { item, note, getItems } = props

  const [showItemEdit, setShowItemEdit] = useState(false)


  const showItemEditInput = () => {
    setShowItemEdit(true)
  }

  const hideItemEditInput = () => {
    setShowItemEdit(false)
  }

  return(
    <>
      {!showItemEdit && 
        <p onClick={showItemEditInput} className='todo-item'>{item.content}</p>
      }

      {showItemEdit &&
        <EditTodoInput key={item.id} hideItemEditInput={hideItemEditInput} defaultItem={item} note={note} getItems={getItems} />
      }
    </>
  )
}


export default ShowTodoItem