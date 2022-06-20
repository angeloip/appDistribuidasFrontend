import { createContext, useContext, useEffect, useState } from "react";
import {
  createFavoriteRequest,
  deleteFavoriteRequest,
  getFavoritesRequest
} from "../api/favoriteRequest";
import { getDishesRequest } from "../api/request";
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
  const [dataDishes, setDataDishes] = useState([]);
  const [isLoadingDishes, setIsLoadingDishes] = useState(false);
  const [listIngredients, setListIngredients] = useState([]);

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

  useEffect(() => {
    getFavoritesUser();
  }, [beUser]);

  const getData = async () => {
    setIsLoadingDishes(true);
    await getDishesRequest()
      .then((res) => {
        setDataDishes(res.data);
      })
      .catch((err) => alert(err.response));

    setIsLoadingDishes(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (dataDishes.length > 0) {
      let temp = [];
      let uniqueArr = [];
      for (let i = 0; i < dataDishes.length; i++) {
        temp = temp.concat(dataDishes[i].ingredients);
      }
      for (let i = 0; i < temp.length; i++) {
        if (!uniqueArr.includes(temp[i])) {
          uniqueArr.push(temp[i]);
        }
      }
      setListIngredients(uniqueArr.sort());
    }
  }, [dataDishes]);

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

  const value = {
    favorites: [favorites, setFavorites],
    dataDishes: [dataDishes, setDataDishes],
    listIngredients: [listIngredients, setListIngredients],
    isLoadingDishes: [isLoadingDishes, setIsLoadingDishes],
    addToFavorites: addToFavorites,
    deleteToFavorites: deleteToFavorites
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
};
