import React from "react";
import { Col, Row } from "react-bootstrap";
import DragAndDrop from "../components/DragAndDrop";
import TodoList from "../components/TodoList";

const Home = () => {
  return(
    <div className='home'>
      <Row>
        <Col style={{background: 'aliceblue'}}>
          <TodoList />
        </Col>
        <Col md={5}>
          <DragAndDrop />
        </Col>
      </Row>
    </div>
  )
}


export default Home