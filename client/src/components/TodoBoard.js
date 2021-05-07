import React, { useEffect, useState } from "react";
import axios from "axios";
import Note from "./Note";
import { Droppable } from "react-beautiful-dnd";


const TodoBoard = (props) => {

  const [ notes, setNotes ] = useState()

  useEffect(() => {
    getTodoNotes()
  },[])

  const getTodoNotes = async () => {
    try {
      let res = await axios.get('/api/get_todo_notes')
      setNotes(res.data)
      console.log('got todo notes')
    } catch (error) {
      console.log(error)
    }
  }

  const renderNotes = () => {
    return notes.map( (note, index) => {
      return (
        <Note index={index} key={note.id} id={note.id} title={note.title} body={note.body} />
      )
    })
  }

  return(
    // <Droppable droppableId="notes">
    //   {(provided) => {
    //     <div {...provided.droppableProps} ref={provided.innerRef} >
    //       { notes && renderNotes() }
    //     </div>
    //   }}
    // </Droppable>
    <div>
      { notes && renderNotes() }
    </div>
  )
}

export default TodoBoard