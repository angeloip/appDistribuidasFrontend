import axios from "axios";

const url = "http://localhost:5000/api/login/";

export const createLoginRequest = (user) => axios.post(url, user);

export const createLoginWithGoogleRequest = (user) =>
  axios.post(url + "google/", user);
