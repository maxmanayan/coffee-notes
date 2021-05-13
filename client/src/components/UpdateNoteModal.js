import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';

const UpdateNoteModal = (props) => {
  const { closeUpdateNoteModal, updateNote, getTodoNotes, getCompletedNotes } = props
  const [ id, setId ] = useState(updateNote.id)
  const [ title, setTitle ] = useState(updateNote.title)
  const [ info, setInfo ] = useState(updateNote.body)
  const [ completed, setCompleted ] = useState(updateNote.completed)

  
  const editNote = async () => {
    try {
      let res = await axios.put(`/api/notes/ ${id}`, {
        title: title,
        body: info,
        completed: completed
      })
      getTodoNotes()
      getCompletedNotes()
    } catch (error) {
      console.log(error)
    } finally {
      closeUpdateNoteModal()
    }
  }

  return(
    <>
    <Modal show={true}>
      <Modal.Header >
        <Modal.Title>Update Note</Modal.Title>
        <div style={{cursor: 'pointer'}}>
          <Icon.X onClick={closeUpdateNoteModal} size={20} />
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
      <Button onClick={editNote} >
        Submit
      </Button>
    </Modal>
    </>
  )
}

export default UpdateNoteModal