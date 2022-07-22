import './App.css';
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useAuth } from "./context/authContext";
import { Home } from "./pages/Home";
import { ProductDetails } from "./pages/ProductDetails";
import { Favorites } from "./pages/Favorites";
import Dashboard from "./pages/Dashboard";
import { Categoria } from "./pages/Categoria";
import { SearchByIngredients } from "./pages/SearchByIngredients";
import { Loading } from "./components/Loading";

function App() {
  const [loadingUser] = useAuth().loadingUser;
  return (
    <>
      {loadingUser ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plato/detalles/:id" element={<ProductDetails />} />
            <Route path="/mis-favoritos" element={<Favorites />} />
            <Route
              path="/buscar-por-ingredientes"
              element={<SearchByIngredients />}
            />
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route path="/categoria/:categoria" element={<Categoria />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
