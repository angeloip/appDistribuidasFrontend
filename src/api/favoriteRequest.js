import axios from "axios";

const url = "http://localhost:5000/api/favorites/";

export const getFavoritesRequest = () => axios.get(url);

export const deleteFavoriteRequest = (id) => axios.delete(url + id);

export const createFavoriteRequest = (favorite) => axios.post(url, favorite);
