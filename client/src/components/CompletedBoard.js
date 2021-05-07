import React, { useEffect, useState } from "react";
import axios from "axios";
import Note from "./Note";
import { Droppable } from "react-beautiful-dnd";

const CompletedBoard = (props) => {

  const [ notes, setNotes ] = useState()

  useEffect(() => {
    getCompletedNotes()
  },[])

  const getCompletedNotes = async () => {
    try {
      let res = await axios.get('/api/get_completed_notes')
      setNotes(res.data)
      console.log('got completed notes')
    } catch (error) {
      console.log(error)
    }
  }

  const renderNotes = () => {
    return notes.map( (note, index) => {
      return (
        <div>
          <Note index={index} key={note.id} id={note.id} title={note.title} body={note.body} />
        </div>
      )
    })
  }

  //Droppable breaks app ... give error > `Invariant failed: provided.innerRef has not been provided with a HTMLElement.`
  return(
    <Droppable droppableId="notes">
      {(provided) => {
        <div {...provided.droppableProps} ref={provided.innerRef} >
          <div>
            { notes && renderNotes() }
          </div>
        </div>
      }}
    </Droppable>
  )
}

export default CompletedBoard