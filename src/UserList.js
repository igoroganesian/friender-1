import React, { useState, useEffect } from "react";
import FrienderApi from "./api/api";
import LoadingSpinner from "./common/LoadingSpinner";
import UserDetail from "./UserDetail";

/**
 *
 * UserList -> UserDeatil(one at a time)
*/

function UserList() {
  console.debug("UserList");

  const [users, setUsers] = useState(null);
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(function getUsersOnMount() {
    console.debug("UserList useEffect getUsersOnMount");
    fetchUsers();
  }, []);

  useEffect(function showUserWhenIndexChanges() {
    console.debug("UserList useEffect showUserWhenIndexChanges");
  }, [currIndex]);

  // haven't tested yet
  // async function sendLike(id) {
  //   await FrienderApi.sendLike(id);
  //   setCurrIndex(currIndex + 1);
  // }


  async function fetchUsers() {
    let users = await FrienderApi.getUsers();
    console.log('in UserList users', users);
    setUsers(users);
  }

  if (!users) return <LoadingSpinner />;
  let currSeenUser = users[currIndex];
  return (
    <div className="CompanyList col-md-8 offset-md-2">

      <UserDetail currSeenUser={currSeenUser} />
      {/* <button className="UserList-btn" onClick={() => sendLike(users[currIndex].id)}> V </button> */}
    </div>
  );
}

export default UserList;
