
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const CreateTodoInput = (props) => {
  const { note } = props
  const [todo, setTodo] = useState(null)

  const createTodo = async (e) => {
    e.preventDefault()
    try {
      console.log('note', note)
      console.log('todo', todo)
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <>
      <Form className='create-todo-form' onSubmit={createTodo}>
        <Form.Group>
          <Form.Control placeholder='Add Todo Item...' name='todo' value={todo} onChange={(e) => setTodo(e.target.value)} />
        </Form.Group>
        <Button type='submit'>Add</Button>
      </Form>
    </>
  )
}

export default CreateTodoInput