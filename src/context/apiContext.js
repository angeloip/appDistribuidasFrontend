import { createContext, useContext } from "react";
import axios from "axios";

export const apiContext = createContext();

export const useApi = () => {
  const context = useContext(apiContext);
  if (!context) throw new Error("There is not api provider");
  return context;
};

export const ApiProvider = ({ children }) => {
  const url = "http://localhost:5000/api/";
  const urlFavorite = url + "favorites/";

  const getFavoritesRequest = () => axios.get(urlFavorite);

  const deleteFavoriteRequest = (id) => axios.delete(urlFavorite + id);

  const createFavoriteRequest = (favorite) => axios.post(urlFavorite, favorite);

  const urlDish = url + "products/";

  const getDishesRequest = () => axios.get(urlDish);
  const getDishRequest = (id) => axios.get(urlDish + id);

  const urlLogin = url + "login/";

  const createLoginRequest = (user) => axios.post(urlLogin, user);

  const createLoginWithGoogleRequest = (user) =>
    axios.post(urlLogin + "google/", user);

  const urlUser = url + "users/";

  const createUserRequest = (user) => axios.post(urlUser, user);

  const value = {
    getFavoritesRequest: getFavoritesRequest,
    deleteFavoriteRequest: deleteFavoriteRequest,
    createFavoriteRequest: createFavoriteRequest,
    getDishesRequest: getDishesRequest,
    getDishRequest: getDishRequest,
    createLoginRequest: createLoginRequest,
    createLoginWithGoogleRequest: createLoginWithGoogleRequest,
    createUserRequest
  };

  return <apiContext.Provider value={value}>{children}</apiContext.Provider>;
};
