import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import './App.css';
import logo from "../images/port-logo.png"

const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
    thumb: '/images/gary.png'
  },
  {
    id: 'cato',
    name: 'Little Cato',
    thumb: '/images/cato.png'
  },
  {
    id: 'kvn',
    name: 'KVN',
    thumb: '/images/kvn.png'
  },
  {
    id: 'mooncake',
    name: 'Mooncake',
    thumb: '/images/mooncake.png'
  },
  {
    id: 'quinn',
    name: 'Quinn Ergon',
    thumb: '/images/quinn.png'
  }
]

const DnDTutorial = () => {
  // const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNotes(items);
  }


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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div style={{display: 'flex'}}>
            {/* <div style={{width: '50vw'}}>
              <Droppable droppableId="characters">
                {(provided) => (
                  <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                    {characters.map(({id, name, thumb}, index) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <div className="characters-thumb">
                                <img src={logo} alt={`${name} Thumb`} />
                              </div>
                              <p>
                                { name }
                              </p>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div> */}
            <div style={{width: '50vw'}}>
              <Droppable droppableId="characters">
                {(provided) => (
                  <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                    {notes && notes.map((note, index) => {
                      return (
                        <Draggable key={note.id} draggableId={note.id.toString()} index={index}>
                          {(provided) => (
                            <div className='note' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                              <h1>{note.title}</h1>
                              <p>{note.body}</p>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </header>
      <p>
        Images from <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">Final Space Wiki</a>
      </p>
    </div>
  );
}

export default DnDTutorial;