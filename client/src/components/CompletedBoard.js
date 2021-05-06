

const CompletedBoard = (props) => {

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
      className={props.className}
      onDrop={drop}
      onDragOver={dragOver}
    >
      { props.children }
    </div>
  )
}

export default CompletedBoard