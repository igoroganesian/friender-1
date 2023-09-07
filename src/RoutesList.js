import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import Homepage from "../homepage/Homepage";
// import CompanyList from "../companies/CompanyList";
// import JobList from "../jobs/JobList";
// import CompanyDetail from "../companies/CompanyDetail";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";

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
