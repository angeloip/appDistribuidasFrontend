import { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "./apiContext";
import { useAuth } from "./authContext";

export const dataContext = createContext();

export const useData = () => {
  const context = useContext(dataContext);
  if (!context) throw new Error("There is not data provider");
  return context;
};

export const DataProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [shopping, setShopping] = useState([]);
  const [beUser] = useAuth().beUser;
  const [dataDishes, setDataDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingDishes, setIsLoadingDishes] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [listIngredients, setListIngredients] = useState([]);
  const getPaymentsRequest = useApi().getPaymentsRequest;
  const getFavoritesRequest = useApi().getFavoritesRequest;
  const deleteFavoriteRequest = useApi().deleteFavoriteRequest;
  const createFavoriteRequest = useApi().createFavoriteRequest;
  const getDishesRequest = useApi().getDishesRequest;
  const getCategoriesRequest = useApi().getCategoriesRequest;

  const getFavoritesUser = async () => {
    if (beUser) {
      await getFavoritesRequest()
        .then((res) => {
          const data = res.data;
          setFavorites(data.filter((favorite) => favorite.user === beUser.id));
        })
        .catch((err) => alert(err.response.data));

      await getPaymentsRequest()
        .then((res) => {
          const data = res.data;
          setShopping(data.filter((shop) => shop.user === beUser.id));
        })
        .catch((err) => alert(err.response.data));
    } else {
      setFavorites([]);
      setShopping([]);
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

  const getCategories = async () => {
    setIsLoadingCategories(true);
    await getCategoriesRequest()
      .then((res) => setCategories(res.data))
      .catch((err) => alert(err.response));
    setIsLoadingCategories(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (dataDishes.length > 0) {
      let temp = [];
      let uniqueArr = [];
      for (let i = 0; i < dataDishes.length; i++) {
        temp = temp.concat(dataDishes[i].tags);
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
      })
      .catch((err) => alert(err.response));
  };

  const deleteToFavorites = async (id) => {
    await deleteFavoriteRequest(id)
      .then((res) => {
        setFavorites(favorites.filter((favorite) => favorite._id !== id));
      })
      .catch((err) => alert(err.response));
  };

  const value = {
    favorites: [favorites, setFavorites],
    shopping: [shopping, setShopping],
    dataDishes: [dataDishes, setDataDishes],
    categories: [categories, setCategories],
    listIngredients: [listIngredients, setListIngredients],
    isLoadingDishes: [isLoadingDishes, setIsLoadingDishes],
    isLoadingCategories: [isLoadingCategories, setIsLoadingCategories],
    addToFavorites: addToFavorites,
    deleteToFavorites: deleteToFavorites
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
};
