import React from 'react'
import './Chat.css'
import LeftSideBar from '../../components/left-side-bar/LeftSideBar'
import RightSideBar from '../../components/right-side-bar/RightSideBar'
import ChatBox from '../../components/chat-box/ChatBox'

const Chat = () => {
  return (
    <div className='chat'>
         <div className="chat-container">
          <LeftSideBar/>
          <RightSideBar/>
          <ChatBox/>
         </div>
    </div>
  )
}

export default Chat
