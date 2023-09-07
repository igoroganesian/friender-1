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


  async function sendLike(id) {
    await FrienderApi.sendLike(id);
    setCurrIndex(currIndex + 1);
  }



  /** Triggered by search form submit; reloads companies. */
  async function fetchUsers(name) {
    let users = await FrienderApi.getUsers(name);
    setUsers(users);
  }

  if (!users) return <LoadingSpinner />;

  return (
    <div className="CompanyList col-md-8 offset-md-2">

      <UserDetail curUser={users[currIndex]} />
      <button className="UserList-btn" onClick={() => sendLike(users[currIndex].id)}> V </button>
    </div>
  );
}

export default UserList;
