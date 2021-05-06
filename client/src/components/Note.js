

const Note = (props) => {

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
      id={props.id}
      className="note"
      draggable="true"
      onDragStart={dragStart}
      onDragOver={dragOver}
    >
      <p>This is a Note!</p>
    </div>
  )
}

export default Note