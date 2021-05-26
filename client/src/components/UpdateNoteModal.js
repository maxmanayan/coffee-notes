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
      <Modal.Header  className='modal-header'>
        <Modal.Title>Update Note</Modal.Title>
        <div style={{cursor: 'pointer'}}>
          <Icon.X onClick={closeUpdateNoteModal} size={20} />
        </div>
      </Modal.Header>
      <Modal.Body className='modal-body'>
        <Form>
          <Form.Group className='modal-body'>
            {/* <Form.Label>Title</Form.Label> */}
            <Form.Control className='modal-body' name='title' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className='modal-body'>
            {/* <Form.Label>Info</Form.Label> */}
            <Form.Control className='modal-body' as='textarea' name='info' placeholder='Info' value={info} onChange={(e) => setInfo(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Button className='modal-button' style={{background: '#FFF9BD', borderColor: '#FFF9BD', color: 'black'}} onClick={editNote} >
        Submit
      </Button>
    </Modal>
    </>
  )
}

export default UpdateNoteModal