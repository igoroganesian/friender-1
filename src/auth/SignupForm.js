import React, { useState } from "react";
// import Alert from "../common/Alert";
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
  const [regularFormData, setRegularFormData] = useState({
    username: "",
    password: "",
    bio: "",
    hobbies: "",
    interests: "",
    email: "",
    location: "",
  });
  // const [formErrors, setFormErrors] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  console.log('state selectedImage', selectedImage);

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
    console.log('submit in signup form');
    evt.preventDefault();
    try {

      // Create an object of formData
      const formData = new FormData();

      // // Update the formData object
      formData.append(
        "image",
        selectedImage
      );

      console.log('state selectedImage in submit', selectedImage);

      formData.append(
        "email",
        regularFormData.email
      );
      formData.append(
        "password",
        regularFormData.password
      );
      formData.append(
        "bio",
        regularFormData.bio
      );
      formData.append(
        "name",
        regularFormData.name
      );
      formData.append(
        "interests",
        regularFormData.interests
      );
      formData.append(
        "hobbies",
        regularFormData.hobbies
      );
      formData.append(
        "image_url",
        regularFormData.image_url
      );
      formData.append(
        "location",
        regularFormData.location
      );

      // for (var key of formData.entries()) {
      //   console.log(key[0] + ', ' + key[1]);
      // }

      // Details of the uploaded file
      // console.log('selected image', selectedImage);


      console.log("other form data(regular form data): ", regularFormData);
      await signup(formData);
      navigate("/findfriends");
    } catch (err) {
      // setFormErrors(err);
      console.log(err);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setRegularFormData(data => ({ ...data, [name]: value }));
  };

  function handleImageChange(evt) {
    console.log('in signup form image from evt.target.files', evt.target.files);
    console.log('state selectedImage in handle change', selectedImage);
    setSelectedImage(evt.target.files[0]);
  };

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Sign Up</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  name="username"
                  className="form-control"
                  value={regularFormData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={regularFormData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Hobbies</label>
                <input
                  name="hobbies"
                  className="form-control"
                  value={regularFormData.hobbies}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Interests</label>
                <input
                  name="interests"
                  className="form-control"
                  value={regularFormData.interests}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={regularFormData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Bio</label>
                <input
                  name="bio"
                  className="form-control"
                  value={regularFormData.bio}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  name="location"
                  className="form-control"
                  value={regularFormData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input

                  name="image_url"
                  className="form-control"
                  value={regularFormData.image_url}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Upload Image</label>
                <input
                  type='file'
                  name="image"
                  className="form-control"
                  onChange={handleImageChange}
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