import React, { useState, useEffect } from "react";
import LoadingSpinner from "./common/LoadingSpinner";
import Navigation from "./Navigation";
import RoutesList from "./RoutesList";
import decode from "jwt-decode";
import FrienderApi from "./api/api";
import UserContext from "./auth/UserContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = useState({
    data: null,
    infoLoaded: false
  });
  const [token, setToken] = ('');

  useEffect(
    function loadUserInfo() {
      // console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            let { id } = decode(token);
            // put the token on the Api class so it can use it to call the API.
            FrienderApi.token = token;
            let fetchedUser = await FrienderApi.getUser(id);

            setCurrentUser({
              infoLoaded: true,
              data: fetchedUser
            });
          } catch (err) {
            // console.error("App loadUserInfo: problem loading", err);
            setCurrentUser({
              infoLoaded: true,
              data: null
            });
          }
        } else {
          setCurrentUser({
            infoLoaded: true,
            data: null
          });
        }
      }
      getCurrentUser();
    },
    [token]
  );

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser({
      infoLoaded: true,
      data: null
    });
    setToken(null);
  }

  /** Handles site-wide signup.
  *
  * Automatically logs them in (set token) upon signup.
  *
  * Make sure you await this function to see if any error happens.
  */
  async function signup(signupData) {
    let token = await FrienderApi.signup(signupData);
    setToken(token);
  }

  /** Handles site-wide login.
  *
  * Logs in a user
  *
  */
  async function login(loginData) {
    let token = await FrienderApi.login(loginData);
    setToken(token);
  }

  if (!currentUser.infoLoaded) return <LoadingSpinner />;

  return (
    <UserContext.Provider
      value={{
        currentUser: currentUser.data,
        setCurrentUser
      }}
    >
      <div className="App">
        <BrowserRouter>
          <Navigation logout={logout} />
          <RoutesList currentUser={currentUser.data} login={login} signup={signup} />
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
