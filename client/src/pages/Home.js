import axios from "axios";
import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DragAndDrop from "../components/DragAndDrop";
import TodoList from "../components/TodoList";
import { AuthContext } from "../providers/AuthProvider";
import * as Icon from 'react-bootstrap-icons';
import YoutubeEmbed from "../components/YoutubeEmbed";
import SideBar from "../components/SideBar";
import MotivationalQuote from "../components/MotivationalQuote";

const Home = () => {
  const { user } = useContext(AuthContext)
  const [note, setNote] = useState(null)
  const [ selectedNoteID, setSelectedNoteID ] = useState(0)
  const [ todoNotes, setTodoNotes ] = useState([])
  const [ completedNotes, setCompletedNotes ] = useState([])
  const [ showCreateNoteModal, setShowCreateNoteModal ] = useState(false)

  const openCreateNoteModal = () => {
    setShowCreateNoteModal(true)
  }
  
  const closeCreateNoteModal = () => {
    setShowCreateNoteModal(false)
  }

  const displayNote = async (noteID) => {
    try {
      if (noteID === null) {
        setNote(null)
        return
      } else {
        let res = await axios.get(`/api/users/${user.id}/notes/${noteID}`)
        setNote(res.data)
        setSelectedNoteID(res.data.id)
        openTodoList(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getTodoNotes = async () => {
    try {
      let res = await axios.get(`/api/users/${user.id}/get_todo_notes`)
      setTodoNotes(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  const getCompletedNotes = async () => {
    try {
      let res = await axios.get(`/api/users/${user.id}/get_completed_notes`)
      setCompletedNotes(res.data)
    } catch (error) {
      console.log(error)
    }
  }


  const openTodoList = (note) => {
    return(
      <TodoList key={note.id} note={note} displayNote={displayNote} getTodoNotes={getTodoNotes} getCompletedNotes={getCompletedNotes}/>
    )
  }

  return(
    <div className='home'>
      <div>
        <SideBar />
      </div>
      <Row id='home-notes'>
        <Col xs={12} sm={12} md={7}>
          <div className='todo-list-container'>
            {!note && 
              <>
                <div>
                  <h1 className='todo-list-default-text'>create or select an existing note...</h1>
                </div>
                <div onClick={openCreateNoteModal} className='todo-create-note' >
                  <h3>Create Note</h3>
                  <div style={{display: 'flex', justifyContent: 'flex-start', marginLeft: '5px', paddingBottom: '5px'}}>
                    <Icon.PlusSquare
                      size={20} 
                    />
                  </div>
                </div>
              </>
            }
            {note && openTodoList(note)}
          </div>
        </Col>
        <Col xs={12} sm={12} md={5}>
          <DragAndDrop 
          displayNote={displayNote} getTodoNotes={getTodoNotes} 
          getCompletedNotes={getCompletedNotes} todoNotes={todoNotes} 
          completedNotes={completedNotes} setTodoNotes={setTodoNotes}
          setCompletedNotes={setCompletedNotes} note={note}
          openCreateNoteModal={openCreateNoteModal} closeCreateNoteModal={closeCreateNoteModal}
          showCreateNoteModal={showCreateNoteModal} selectedNoteID={selectedNoteID}
          />
        </Col>
      </Row>
      {/* <Row id='home-music'>
        <Col md={4}>
            <MotivationalQuote/>
        </Col>
        <Col md={8}>
            <YoutubeEmbed />
        </Col>
      </Row> */}
      <Row id='home-music'>
        <Col>
            <YoutubeEmbed />
        </Col>
      </Row>
      <Row id='home-quote'>
        <Col>
            <MotivationalQuote/>
        </Col>
      </Row>
    </div>
  )
}


export default Home