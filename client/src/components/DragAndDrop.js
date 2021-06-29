import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";
import CreateNoteModal from "../components/CreateNoteModal";
import { Col } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";

const DragAndDrop = (props) => {
  const { user } = useContext(AuthContext);
  const {
    displayNote,
    getTodoNotes,
    getCompletedNotes,
    todoNotes,
    completedNotes,
    setTodoNotes,
    setCompletedNotes,
    showCreateNoteModal,
    openCreateNoteModal,
    closeCreateNoteModal,
    selectedNoteID,
  } = props;

  // const [ viewNote, setViewNote ] = useState(null)

  useEffect(() => {
    getTodoNotes();
    getCompletedNotes();
  }, []);

  const deleteNote = async (id) => {
    try {
      let res = await axios.delete(`/api/users/${user.id}/notes/${id}`);
      getTodoNotes();
      getCompletedNotes();
      displayNote(null);
    } catch (error) {
      console.log(error);
    }
  };

  const moveToCompleted = async (note) => {
    try {
      await axios.put(`/api/users/${user.id}/notes/${note.id}`, {
        title: note.title,
        body: note.body,
        completed: true,
      });
      // getTodoNotes();
      getCompletedNotes();
      // displayNote(note.id);
    } catch (error) {
      console.log(error);
    }
  };

  const moveToTodo = async (note) => {
    try {
      await axios.put(`/api/users/${user.id}/notes/${note.id}`, {
        title: note.title,
        body: note.body,
        completed: false,
      });
      getTodoNotes();
      // getCompletedNotes();
      // displayNote(note.id);
    } catch (error) {
      console.log(error);
    }
  };

  // const closeViewNoteModal = () => {
  //   setViewNote(null)
  // }

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // if note is dropped outside droppable zone
    if (!result.destination) return;

    // reordering notes within todo list
    if (source.droppableId === "todo" && destination.droppableId === "todo") {
      const todos = Array.from(todoNotes);
      const [reorderedTodo] = todos.splice(result.source.index, 1);
      todos.splice(result.destination.index, 0, reorderedTodo);
      setTodoNotes(todos);
    }

    // reordering notes within completed list
    if (
      source.droppableId === "completed" &&
      destination.droppableId === "completed"
    ) {
      const completes = Array.from(completedNotes);
      const [reorderedCompleted] = completes.splice(result.source.index, 1);
      completes.splice(result.destination.index, 0, reorderedCompleted);
      setCompletedNotes(completes);
    }

    // moving note from todo list to completed list
    if (
      source.droppableId === "todo" &&
      destination.droppableId === "completed"
    ) {
      const todos = Array.from(todoNotes);
      const completes = Array.from(completedNotes);
      const [newCompleted] = todos.splice(result.source.index, 1);

      // completes.splice(result.destination.index, 0, newCompleted);

      // const ending = {};
      // ending[result.source.droppableId] = todos;
      // ending[result.destination.droppableId] = completes;

      moveToCompleted(newCompleted);
      // return ending;
    }

    // moving note from todo list to completed list
    if (
      source.droppableId === "completed" &&
      destination.droppableId === "todo"
    ) {
      const completes = Array.from(completedNotes);
      const [newTodo] = completes.splice(result.source.index, 1);
      moveToTodo(newTodo);
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div style={{ display: "flex" }}>
          <Col xs={6} md={6}>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#090804",
                }}
              >
                <h1>Todo</h1>
                <div
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "flex-start",
                    marginLeft: "1em",
                  }}
                >
                  <Icon.PlusSquare onClick={openCreateNoteModal} size={30} />
                </div>
              </div>
              <Droppable droppableId="todo">
                {(provided) => (
                  <div
                    className="todo-board"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {todoNotes &&
                      todoNotes.map((note, index) => {
                        return (
                          <Draggable
                            key={note.id}
                            draggableId={note.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className={`${
                                  note.id === selectedNoteID
                                    ? "todo-note-active"
                                    : "todo-note"
                                }`}
                                onClick={() => displayNote(note.id)}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <div className="delete-note">
                                  <div style={{ cursor: "pointer" }}>
                                    <Icon.X
                                      onClick={() => deleteNote(note.id)}
                                    />
                                  </div>
                                </div>
                                <div style={{ cursor: "pointer" }}>
                                  <h4>{note.title}</h4>
                                </div>
                                <div className="note-view-edit">
                                  <div style={{ cursor: "pointer" }}>
                                    <Icon.ArrowRightSquare
                                      onClick={() => moveToCompleted(note)}
                                    />
                                  </div>
                                </div>
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
          </Col>
          <Col xs={6} md={6}>
            <div>
              <h1 style={{ color: "#090804" }}>Completed</h1>
              <Droppable droppableId="completed">
                {(provided) => (
                  <div
                    className="completed-board"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {completedNotes &&
                      completedNotes.map((note, index) => {
                        return (
                          <Draggable
                            key={note.id}
                            draggableId={note.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className={`${
                                  note.id === selectedNoteID
                                    ? "completed-note-active"
                                    : "completed-note"
                                }`}
                                onClick={() => displayNote(note.id)}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <div className="delete-note">
                                  <div style={{ cursor: "pointer" }}>
                                    <Icon.X
                                      onClick={() => deleteNote(note.id)}
                                    />
                                  </div>
                                </div>
                                <div style={{ cursor: "pointer" }}>
                                  <h4>{note.title}</h4>
                                </div>
                                <div className="note-view-edit">
                                  <div style={{ cursor: "pointer" }}>
                                    <Icon.ArrowLeftSquare
                                      onClick={() => moveToTodo(note)}
                                    />
                                  </div>
                                </div>
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
          </Col>
        </div>
      </DragDropContext>
      {showCreateNoteModal && (
        <CreateNoteModal
          closeCreateNoteModal={closeCreateNoteModal}
          getTodoNotes={getTodoNotes}
        />
      )}
      {/* {viewNote && 
        <ViewNoteModal 
          closeViewNoteModal={closeViewNoteModal} viewNote={viewNote}
      />} */}
    </div>
  );
};

export default DragAndDrop;
