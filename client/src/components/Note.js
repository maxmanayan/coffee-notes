

const Note = (props) => {
  const { id, title, body } = props

  const dragStart = (e) => {
    console.log('drag start')
    const target = e.target

    e.dataTransfer.setData('note_id', target.id)

    setTimeout(() => {
      target.style.display = "none"
    },0)
  
  }
  
  const dragOver = (e) => {
    console.log('note - dragOver')
    e.stopPropagation()
  }


  return(
    <div
      id={id}
      className="note"
      draggable="true"
      onDragStart={dragStart}
      onDragOver={dragOver}
    >
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  )
}

export default Note