import React, { useState } from "react";
import DragAndDrop from "../components/DragAndDrop";
import * as Icon from 'react-bootstrap-icons';
import CreateNoteModal from "../components/CreateNoteModal";

const Home = () => {
  const [showNoteModal, setShowNoteModal] = useState(false)
  

  const openNoteModal = () => {
    console.log('open modal')
    setShowNoteModal(true)
  }
  
  const closeNoteModal = () => {
    setShowNoteModal(false)
  }

  return(
    <div className='home'>
      <h1>Home</h1>
      <div style={{cursor: 'pointer'}}>
        <Icon.PlusSquare 
          onClick={openNoteModal}
          size={50} 
        />
      </div>
      <DragAndDrop />
      {showNoteModal && 
      <CreateNoteModal 
        closeNoteModal={closeNoteModal}
      />}
    </div>
  )
}


export default Home