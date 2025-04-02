import React from 'react'
import './RightSideBar.css'
import assets from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/Authprovider'

const RightSideBar = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { 
    logout(); 
    navigate('/login'); 
    };
  
    const handleProfileClick = () => {
       navigate('/profileupdate');
       };

  return (
    <div className='rs'>
      <div className="rs-profile"onClick={handleProfileClick}>
        <img src={assets.profile_img} alt="" />
        <h3>Samarth Patil</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolore fugit, autem ! </p>
      </div>
      <hr/>
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic5} alt="" />
          <img src={assets.pic6} alt="" />
        </div>
      </div>
      <button onClick={handleLogout}>Log Out</button> {/* Attach handleLogout to button */}    </div>
  )
}

export default RightSideBar
