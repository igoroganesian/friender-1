import React, { useState } from "react";
import Alert from "../common/Alert";
import "./SignupForm.css";
import { useNavigate } from "react-router-dom";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */


// name,
//             password,
//             email,
//             bio,
//             hobbies,
//             interests,
//             location,
//             image_url=DEFAULT_IMAGE_URL

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    bio: "",
    hobbies: "",
    interests: "",
    email: "",
    location: "",
    image_url: ""
  });
  const [formErrors, setFormErrors] = useState([]);

  // console.debug(
  //   "SignupForm",
  //   "signup=", typeof signup,
  //   "formData=", formData,
  //   "formErrors=", formErrors,
  // );

  /** Handle form submit:
   *
   * Calls login func prop and, if not successful, sets errors.
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signup(formData);
      navigate("/findfriends");
    } catch (err) {
      setFormErrors(err);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }




  //             location,
  //             image_url=DEFAULT_IMAGE_URL

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Sign Up</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Hobbies</label>
                <input
                  name="hobbies"
                  className="form-control"
                  value={formData.hobbies}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Interests</label>
                <input
                  name="interests"
                  className="form-control"
                  value={formData.interests}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Bio</label>
                <input
                  name="bio"
                  className="form-control"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  name="location"
                  className="form-control"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input

                  name="image_url"
                  className="form-control"
                  value={formData.image_url}
                  onChange={handleChange}
                />
              </div>

              {/* {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null
              } */}

              <div className="d-grid">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;