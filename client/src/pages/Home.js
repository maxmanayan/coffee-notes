import axios from "axios";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import DragAndDrop from "../components/DragAndDrop";
import TodoList from "../components/TodoList";

const Home = () => {
  const [note, setNote] = useState(null)

  const displayNote = async (noteID) => {
    try {
      let res = await axios.get(`/api/notes/${noteID}`)
      setNote(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <div className='home'>
      <Row>
        <Col style={{background: 'aliceblue'}}>
          {note && <TodoList note={note}/>}
        </Col>
        <Col md={5}>
          <DragAndDrop displayNote={displayNote} />
        </Col>
      </Row>
    </div>
  )
}


export default Home