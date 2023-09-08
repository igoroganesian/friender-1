import React from 'react';
import './UserDetail.css';

function UserDetail({ currSeenUser }) {
  const { name, images, bio, hobbies, interests } = currSeenUser;
  console.log('in User Deatil', currSeenUser);
  return (
    <div className="UserDetail">
      <div className="UserDetail-card">
        <img src={images} alt={name} />
        <div className="UserDetail-container">
          <h4><b>{name}</b></h4>
          <p>Bio: {bio}</p>
          <p>Hobbies: {hobbies}</p>
          <p>Interests: {interests}</p>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;;