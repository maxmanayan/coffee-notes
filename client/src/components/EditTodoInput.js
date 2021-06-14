import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { AuthContext } from '../providers/AuthProvider';

const EditTodoInput = (props) => {
  const { user } = useContext(AuthContext)
  const { hideItemEditInput, defaultItem, note, getItems } = props

  const [item, setItem] = useState(defaultItem.content)

  const editItem = async (e) => {
    e.preventDefault()
    try {
      console.log('item', item)
      await axios.put(`/api/users/${user.id}/notes/${note.id}/items/${defaultItem.id}`, {
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
          <Form.Control style={{width: '255%', border: 'none'}} placeholder='Edit Item...' name='item' value={item} onChange={(e) => setItem(e.target.value)}/>
        </Form.Group>
        <Icon.XCircleFill className='edit-item-input-x' onClick={hideItemEditInput} />
      </Form>
    </>
  )
}


export default EditTodoInput