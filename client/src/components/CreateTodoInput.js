import axios from "axios";
import React, { useContext, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";

const CreateTodoInput = (props) => {
  const { user } = useContext(AuthContext);
  const { note, getItems } = props;
  const [todo, setTodo] = useState(null);

  const createTodo = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/users/${user.id}/notes/${note.id}/items`, {
        content: todo,
        completed: false,
      });
      setTodo("");
      getItems();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="create-todo-form" onSubmit={createTodo}>
        <Col xs={3} sm={4} md={4}>
          <Form.Group>
            <Form.Control
              style={{ width: "255%", border: "none" }}
              placeholder="Add Todo Item..."
              name="todo"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={12} md={1}>
          <Button
            type="submit"
            style={{ background: "#090804", border: "none" }}
          >
            Add
          </Button>
        </Col>
      </Form>
    </>
  );
};

export default CreateTodoInput;
