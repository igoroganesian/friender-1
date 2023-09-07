import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginForm from "./auth/LoginForm";
import ProfileForm from "./ProfileForm";
import SignupForm from "./auth/SignupForm";
import UserList from './UserList';
import UserDetail from "./UserDetail";
import FriendList from './FriendList';
import MessageList from "./MessageList";
import Setting from "./Setting";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in.
 *
 * Visiting a non-existant route navigates to the homepage.
 */

function RoutesList({ login, signup, currentUser }) {
  // console.debug(
  //   "Routes",
  //   `login=${typeof login}`,
  //   `register=${typeof register}`,
  // );

  return (
    <div className="pt-5">
      <Routes>
        {!currentUser &&
          <>
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/signup" element={<SignupForm signup={signup} />} />
          </>
        }

        {/* <Route path="/"element={<Homepage />} /> */}

        {currentUser &&
          <>

            <Route path="/findfriends" element={<UserList />} />
            <Route path="/friends" element={<FriendList />} />
            <Route path="/user/:id" element={<UserDetail />} />
            <Route path="/profile/:id/edit" element={<ProfileForm />} />
            <Route path="/messages" element={<MessageList />} />
            <Route path="/settings" element={<Setting />} />

          </>
        }

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default RoutesList;
