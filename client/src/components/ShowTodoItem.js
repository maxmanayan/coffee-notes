import React, { useState } from 'react';
import EditTodoInput from './EditTodoInput';
import * as Icon from 'react-bootstrap-icons';

const ShowTodoItem = (props) => {
  const { item, note, getItems, deleteItem } = props

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
        <div className='todo-item-trash-container'>
          <p onClick={showItemEditInput} className='todo-item'>{item.content}</p>
          <div>
            <Icon.Trash className='todo-item-trash' onClick={() => deleteItem(item)}/>
          </div>
        </div>
      }

      {showItemEdit &&
        <EditTodoInput key={item.id} hideItemEditInput={hideItemEditInput} defaultItem={item} note={note} getItems={getItems} />
      }
    </>
  )
}


export default ShowTodoItem