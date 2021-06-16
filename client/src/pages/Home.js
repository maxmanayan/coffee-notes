import axios from "axios";
import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DragAndDrop from "../components/DragAndDrop";
import TodoList from "../components/TodoList";
import { AuthContext } from "../providers/AuthProvider";

const Home = () => {
  const { user } = useContext(AuthContext)
  const [note, setNote] = useState(null)

  const displayNote = async (noteID) => {
    try {
      let res = await axios.get(`/api/users/${user.id}/notes/${noteID}`)
      setNote(res.data)
      openTodoList(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const openTodoList = (note) => {
    return(
      <TodoList key={note.id} note={note}/>
    )
  }

  return(
    <div className='home'>
      <Row>
        <Col xs={12} sm={12} md={7}>
          <div className='todo-list-container'>
            {!note && 
              <h1 className='todo-list-default-text'>create or select a note...</h1>
            }
            {note && openTodoList(note)}
          </div>
        </Col>
        <Col xs={12} sm={12} md={5}>
          <DragAndDrop displayNote={displayNote} />
        </Col>
      </Row>
    </div>
  )
}


export default Home