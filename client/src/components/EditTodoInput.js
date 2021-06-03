import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const EditTodoInput = (props) => {
  const { hideItemEditInput, defaultItem, note, getItems } = props

  const [item, setItem] = useState(defaultItem.content)

  const editItem = async (e) => {
    e.preventDefault()
    try {
      console.log('item', item)
      await axios.put(`/api/notes/${note.id}/items/${defaultItem.id}`, {
        content: item,
        completed: defaultItem.completed
      })
      getItems()
      hideItemEditInput()
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <>
      <Form onSubmit={editItem} className='edit-item-input'>
        <Form.Group>
          <Form.Control placeholder='Edit Item...' name='item' value={item} onChange={(e) => setItem(e.target.value)}/>
        </Form.Group>
        <Icon.XCircleFill className='edit-item-input-x' onClick={hideItemEditInput} />
      </Form>
    </>
  )
}


export default EditTodoInput