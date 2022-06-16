import { createContext, useContext, useEffect, useState } from "react";
import {
  createFavoriteRequest,
  deleteFavoriteRequest,
  getFavoritesRequest
} from "../api/favoriteRequest";
import { getUserRequest } from "../api/userRequest";
import { useAuth } from "./authContext";

export const dataContext = createContext();

export const useData = () => {
  // para no estar importando el useContext y dataContext a cada momento en cada componente
  const context = useContext(dataContext);
  if (!context) throw new Error("There is not data provider");
  return context;
};

export const DataProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [beUser, setBeUser] = useAuth().beUser;

  /* const getFavoritesUser = async () => {
    if (beUser) {
      await getUserRequest(beUser.id)
        .then((res) => {
          setFavorites(res.data.favorites);
        })
        .catch((err) => alert(err.response));
    } else {
      setFavorites([]);
    }
  }; */

  const getFavoritesUser = async () => {
    if (beUser) {
      await getFavoritesRequest()
        .then((res) => {
          const data = res.data;
          setFavorites(data.filter((favorite) => favorite.user === beUser.id));
        })
        .catch((err) => alert(err.response));
    } else {
      setFavorites([]);
    }
  };

  const addToFavorites = async (producto) => {
    await createFavoriteRequest(producto)
      .then((res) => {
        setFavorites([...favorites, res.data]);
        console.log("FAVORITO AGREGADO");
      })
      .catch((err) => alert(err.response));
  };

  const deleteToFavorites = async (id) => {
    await deleteFavoriteRequest(id)
      .then((res) => {
        setFavorites(favorites.filter((favorite) => favorite._id !== id));
        console.log("FAVORITO ELIMINADO");
      })
      .catch((err) => alert(err.response));
  };

  useEffect(() => {
    getFavoritesUser();
  }, [beUser]);

  const value = {
    favorites: [favorites, setFavorites],
    addToFavorites: addToFavorites,
    deleteToFavorites: deleteToFavorites
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
};
