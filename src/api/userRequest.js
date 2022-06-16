import axios from "axios";

/* const url = "http://localhost:5000/api/users/"; */
const url = "https://app-distribuida.herokuapp.com/api/users/";

export const getUsersRequest = () => axios.get(url);

export const getUserRequest = (id) => axios.get(url + id);

export const deleteUserRequest = (id) => axios.delete(url + id);

export const createUserRequest = (user) => axios.post(url, user);

export const updateUserRequest = (id, newInfoUser) => {
  return axios.put(url + id, newInfoUser);
};
