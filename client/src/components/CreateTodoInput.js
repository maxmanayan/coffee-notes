
import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const CreateTodoInput = (props) => {
  const { note, getItems } = props
  const [todo, setTodo] = useState(null)

  const createTodo = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`/api/notes/${note.id}/items`, {
        content: todo,
        completed: false
      })

      setTodo('')
      getItems()
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <>
      <Form className='create-todo-form' onSubmit={createTodo}>
          <Form.Group>
            <Form.Control style={{width: '255%', border: 'none'}} placeholder='Add Todo Item...' name='todo' value={todo} onChange={(e) => setTodo(e.target.value)} />
          </Form.Group> 
          <Button type='submit' style={{background: '#090804', border: 'none'}} >Add</Button>
      </Form>
    </>
  )
}

export default CreateTodoInput