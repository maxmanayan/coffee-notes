

const Card = (props) => {

  const dragStart = (e) => {
    console.log('drag start')
    const target = e.target

    e.dataTransfer.setData('card_id', target.id)

    setTimeout(() => {
      target.style.display = "none"
    },0)
  
  }
  
  const dragOver = (e) => {
    console.log('card - dragOver')
    e.stopPropagation()
  }

  return(
    <div
      id={props.id}
      className={props.className}
      draggable="true"
      onDragStart={dragStart}
      onDragOver={dragOver}
    >
      {props.children}
    </div>
  )
}


export default Card