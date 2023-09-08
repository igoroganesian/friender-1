import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class FrienderApi {
  // the token for interactive with the API will be stored here.
  static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5NDEwNzM5NiwianRpIjoiZmFiMmI2MjAtYzYwZS00Zjk4LWI5OGUtMmJiZmRkNDJlM2M0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImVtYWlsN0BnbWFpbC5jb20iLCJuYmYiOjE2OTQxMDczOTYsImV4cCI6MTY5NDEwODI5Nn0.j9ljIAzA97XnEvNcQVljlP5AcBBTn6g6ZYFFgmSbwmo";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;

    //TODO:  'Content-Type': 'application/x-www-form-urlencoded' works too!
    const headers = {
      Authorization: `Bearer ${FrienderApi.token}`,
      'Content-Type': 'multipart/form-data'
    };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get all users */

  static async getUsers() {
    //FIXME: can't have users/ or /users or /users/
    let res = await this.request(`users`);
    return res.users;
  }

  /** Get user by ID */

  static async getUser(id) {
    let res = await this.request(`users/${id}`);
    return res.user;
  }

  /** Get friends for current user */

  static async getFriends(id) {
    let res = await this.request(`users/${id}/friends`);
    return res.friends;
  }

  /** Send like to other user */

  static async sendLike(id) {
    let res = await this.request(`likes/${id}`);
    return res;
  }



  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`/login`, data, "post");
    //TODO: res.token => res.access_token (we set this in flask)
    return res.access_token;
  }

  /** Signup for site. */

  static async signup(data) {
    console.log(`in Api signup, data: ${data}`);
    let res = await this.request(`/signup`, data, "post");
    console.log(`in Api signup, res: ${res}`);
    //TODO: res.token => res.access_token (we set this in flask)
    return res.access_token;
  }

  /** Save user profile page. */

  static async saveProfile(id, data) {
    let res = await this.request(`/profile/${id}/edit`, data, "patch");
    return res.user;
  }
}


export default FrienderApi;
