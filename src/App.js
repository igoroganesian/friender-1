import React, { useState, useEffect } from "react";
import LoadingSpinner from "./common/LoadingSpinner";
import Navigation from "./routes-nav/Navigation";
import RoutesList from "./routes-nav/RoutesList";
import decode from "jwt-decode";
import FrienderApi from "./api/api";

function App() {
  const [currentUser, setCurrentUser] = useState({
    data: null,
    infoLoaded: false
  });
  const [token, setToken] = (FrienderApi.token);

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            let { email } = decode(token);
            // put the token on the Api class so it can use it to call the API.
            FrienderApi.token = token;
            let currentUser = await FrienderApi.getUser(id);

            setCurrentUser({
              infoLoaded: true,
              data: currentUser
            });
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
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
      getUser();
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
        <Navigation logout={logout} />
        <RoutesList currentUser={currentUser.data} login={login} signup={signup} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
