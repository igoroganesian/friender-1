import React from 'react';

function UserDetail({ user }) {
  return (
    <div>
      <p>{user.id}</p>
      <p>{user.name}</p>
    </div>
  );
}

export default UserDetail;