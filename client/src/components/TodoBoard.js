import React, { useEffect, useState } from "react";
import axios from "axios";
import Note from "./Note";


const TodoBoard = (props) => {

  const [ notes, setNotes ] = useState()

  useEffect(() => {
    getTodoNotes()
  },[])

  const getTodoNotes = async () => {
    try {
      let res = await axios.get('/api/get_todo_notes')
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
    console.log('todo - dropped')
    e.preventDefault()
    const note_id = e.dataTransfer.getData('note_id')

    console.log('note_id', note_id)

    const note = document.getElementById(note_id)

    console.log('note', note)
    note.style.display = 'block'

    e.target.appendChild(note)
  }

  const dragOver = (e) => {
    console.log('todo - dragOver')
    e.preventDefault()
  }

  return(
    <div 
      id={props.id}
      className="todo-board"
      onDrop={drop}
      onDragOver={dragOver}
    >
      { notes && renderNotes() }
    </div>
  )
}

export default TodoBoard