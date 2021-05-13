import { Draggable } from "react-beautiful-dnd"


const Note = (props) => {
  const {key, id, title, body, index } = props

  return(
    <Draggable key={key} draggableId={id.toString()} index={index}>
      {(provided) => (
        <div className='note' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
          {/* <p>{id}</p> */}
          <h1>{title}</h1>
          <p>{body}</p>
        </div>
      )}
    </Draggable>
    // <div className='note'>
    //   {/* <p>{id}</p> */}
    //   <h1>{title}</h1>
    //   <p>{body}</p>
    // </div>
  )
}

export default Note