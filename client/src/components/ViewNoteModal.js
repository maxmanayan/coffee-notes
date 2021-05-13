import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';

const ViewNoteModal = (props) => {
  const { closeViewNoteModal, viewNoteID } = props
  const [ title, setTitle ] = useState('')
  const [ info, setInfo ] = useState('')

  return(
    <>
    <Modal show={true}>
      <Modal.Header >
        <Modal.Title>Create New Note</Modal.Title>
        <div style={{cursor: 'pointer'}}>
          <Icon.X onClick={closeViewNoteModal} size={20} />
        </div>
      </Modal.Header>
      <Modal.Body>
        <p>nice</p>
      </Modal.Body>

    </Modal>
    </>
  )
}

export default ViewNoteModal