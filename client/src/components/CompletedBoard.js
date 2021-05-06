import React, { useEffect, useState } from "react";
import axios from "axios";
import Note from "./Note";

const CompletedBoard = (props) => {

  const [ notes, setNotes ] = useState()

  useEffect(() => {
    getCompletedNotes()
  },[])

  const getCompletedNotes = async () => {
    try {
      let res = await axios.get('/api/get_completed_notes')
      setNotes(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderNotes = () => {
    return notes.map( note => {
      return (
        <Note key={note.id} id={note.id} title={note.title} body={note.body} />
      )
    })
  }

  const drop = (e) => {
    console.log('completed - dropped')
    e.preventDefault()
    const note_id = e.dataTransfer.getData('note_id')

    const note = document.getElementById(note_id)
    note.style.display = 'block'

    e.target.appendChild(note)
  }

  const dragOver = (e) => {
    console.log('completed - dragOver')
    e.preventDefault()
  }

  return(
    <div 
      id={props.id}
      className="completed-board"
      onDrop={drop}
      onDragOver={dragOver}
    >
      {notes && renderNotes()}
    </div>
  )
}

export default CompletedBoard