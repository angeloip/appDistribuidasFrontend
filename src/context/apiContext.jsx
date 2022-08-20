import { createContext, useContext } from "react";
import axios from "axios";
import { useAuth } from "./authContext";

export const apiContext = createContext();

export const useApi = () => {
  const context = useContext(apiContext);
  if (!context) throw new Error("There is not api provider");
  return context;
};

export const ApiProvider = ({ children }) => {
  const url = process.env.REACT_APP_API;

  const [token] = useAuth().token;

  const config = {
    headers: {
      Authorization: token
    }
  };

  const urlFavorite = url + "favorites/";

  const getFavoritesRequest = () => axios.get(urlFavorite);

  const deleteFavoriteRequest = (id) => axios.delete(urlFavorite + id);

  const createFavoriteRequest = (favorite) => axios.post(urlFavorite, favorite);

  const urlDish = url + "products/";

  const createDishReviewRequest = (id, data) =>
    axios.post(`${urlDish}${id}/reviews`, data, config);

  const getDishesRequest = () => axios.get(urlDish);

  const getDishRequest = (id) => axios.get(urlDish + id);

  const getDishesRequestPaginate = () => axios.get(urlDish);

  const getDishesForCategoryRequest = (category, page, limit) =>
    axios.post(urlDish + `category?page=${page}&limit=${limit}`, category);

  const getSearchDishesRequest = (name) =>
    axios.post(urlDish + `search?name=${name}`, null);

  const urlCategory = url + "categories/";

  const getCategoriesRequest = () => axios.get(urlCategory);

  const urlLogin = url + "login/";

  const createLoginRequest = (user) => axios.post(urlLogin, user);

  const createLoginWithGoogleRequest = (user) =>
    axios.post(urlLogin + "google/", user);

  const urlUser = url + "users/";

  const createUserRequest = (user) => axios.post(urlUser, user);

  const urlPayment = url + "payment/";

  const getPaymentsRequest = () => axios.get(urlPayment);

  const createPaymentRequest = (data) => axios.post(urlPayment, data);

  const value = {
    getFavoritesRequest: getFavoritesRequest,
    deleteFavoriteRequest: deleteFavoriteRequest,
    createFavoriteRequest: createFavoriteRequest,
    createDishReviewRequest,
    getDishesRequest: getDishesRequest,
    getDishRequest: getDishRequest,
    getDishesRequestPaginate: getDishesRequestPaginate,
    getDishesForCategoryRequest: getDishesForCategoryRequest,
    getSearchDishesRequest: getSearchDishesRequest,
    getCategoriesRequest: getCategoriesRequest,
    createLoginRequest: createLoginRequest,
    createLoginWithGoogleRequest: createLoginWithGoogleRequest,
    createUserRequest: createUserRequest,
    getPaymentsRequest: getPaymentsRequest,
    createPaymentRequest: createPaymentRequest
  };

  return <apiContext.Provider value={value}>{children}</apiContext.Provider>;
};
