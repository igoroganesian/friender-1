import React, { useState, useEffect } from "react";
import FrienderApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";

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

  // check
  function saveUserAsFriendAndGoNextUser();

  /** Triggered by search form submit; reloads companies. */
  async function fetchUsers(name) {
    let users = await FrienderApi.getUsers(name);
    setUsers(users);
  }

  if (!users) return <LoadingSpinner />;

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      {users.length
        ? (
          <div className="CompanyList-list">
            {/* {users.map((u, index) => {

              if (currIndex === index) {
                <UserDetail  />;
              }


            })} */}
          </div>
        ) : (
          <p className="lead">Sorry, no results were found!</p>
        )}
    </div>
  );
}

export default UserList;
