import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';

const ViewNoteModal = (props) => {
  const { closeViewNoteModal, viewNote } = props
  const [ note, setNote ] = useState(viewNote)

  return(
    <>
    {/* {note && console.log('note in modal', note) && */}
      <Modal show={true}>
        <Modal.Header >
          <Modal.Title>{note.title}</Modal.Title>
          <div style={{cursor: 'pointer'}}>
            <Icon.X onClick={closeViewNoteModal} size={20} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <p>{note.body}</p>
        </Modal.Body>
      </Modal>
    {/* } */}
    </>
  )
}

export default ViewNoteModal