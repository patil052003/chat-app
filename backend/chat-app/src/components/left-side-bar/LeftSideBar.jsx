import React, { useEffect, useCallback, useState } from 'react';
import './LeftSideBar.css';
import assets from '../../assets/assets';
import useConversation from '../../statemanage/useConversation.js';
import userGetAllUsers from '../../context/userGetAllUsers';

const UserComponent = React.memo(({ user, isSelected, handleClick }) => (
  <div
    key={user._id}
    className={`friends hover:bg-slate-600 duration-300 ${isSelected ? "bg-slate-700" : ""}`}
    onClick={() => handleClick(user)}
  >
    <img src={assets.profile_img} alt="Profile" />
    <div>
      <p>{user.Username}</p>
      <span>{user.email}</span>
      <span>Hello, how are you...</span>
    </div>
  </div>
));

const LeftSideBar = () => {
  const { allUsers, loading } = userGetAllUsers();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log('All users in component:', allUsers);
  }, [allUsers]);

  const handleClick = useCallback(
    (user) => {
      setSelectedConversation(user);
    },
    [setSelectedConversation]
  );

  if (loading) return <p>Loading...</p>;

  // Filter users based on the search input
  const filteredUsers = allUsers.filter(user => 
    user.Username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} className="logo" alt="Logo" />
          <div className="menu">
            <img src={assets.menu_icon} alt="Menu" />
            <div className="sub-menu">
              <p>Edit Profile</p>
              <hr />
              <p>Log Out</p>
            </div>
          </div>
        </div>
        <div className="le-search">
          <img src={assets.search_icon} alt="Search" />
          <input
            type="text"
            placeholder="Search here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="ls-list">
        {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserComponent
              key={user._id}
              user={user}
              isSelected={selectedConversation?._id === user._id}
              handleClick={handleClick}
            />
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default LeftSideBar;
