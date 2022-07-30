import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useAuth } from "./context/authContext";
import { Home } from "./pages/Home";
import { ProductDetails } from "./pages/ProductDetails";
import { Favorites } from "./pages/Favorites";
import { SearchByIngredients } from "./pages/SearchByIngredients";
import { Loading } from "./components/Loading";
import { Payments } from "./pages/Payments";
import { Footer } from "./components/Footer";
import { NotFound } from "./pages/NotFound";
import { Categories } from "./pages/Categories";

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
            <Route path="/mis-compras" element={<Payments />} />
            <Route
              path="/buscar-por-ingredientes"
              element={<SearchByIngredients />}
            />

            <Route path="/categorias" element={<Categories />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
