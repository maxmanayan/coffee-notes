import Note from "./Note"


const TodoBoard = (props) => {


  const renderNotes = () => {
    return <Note id={1} className="card" />
  }

  const drop = (e) => {
    console.log('todo - dropped')
    e.preventDefault()
    const note_id = e.dataTransfer.getData('note_id')

    const note = document.getElementById(note_id)
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
      className={props.className}
      onDrop={drop}
      onDragOver={dragOver}
    >
      { renderNotes() }
    </div>
  )
}

export default TodoBoard