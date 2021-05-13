import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';

const CreateNoteModal = (props) => {
  const { closeCreateNoteModal, getTodoNotes } = props
  const [ title, setTitle ] = useState('')
  const [ info, setInfo ] = useState('')

  const createNote = async () => {
    try {
      await axios.post('/api/notes', {
        title: title,
        body: info,
        completed: false
      })
      getTodoNotes()
    } catch (error) {
      console.log(error)
    } finally {
      closeCreateNoteModal()
    }
  }

  return(
    <>
    <Modal show={true}>
      <Modal.Header >
        <Modal.Title>Create New Note</Modal.Title>
        <div style={{cursor: 'pointer'}}>
          <Icon.X onClick={closeCreateNoteModal} size={20} />
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            {/* <Form.Label>Title</Form.Label> */}
            <Form.Control name='title' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group>
            {/* <Form.Label>Info</Form.Label> */}
            <Form.Control as='textarea' name='info' placeholder='Info' value={info} onChange={(e) => setInfo(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Button onClick={createNote} >
        Submit
      </Button>
    </Modal>
    </>
  )
}

export default CreateNoteModal