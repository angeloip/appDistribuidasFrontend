import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useAuth } from "./context/authContext";
import { Home } from "./pages/Home";
import { ProductDetails } from "./pages/ProductDetails";
import { Favorites } from "./pages/Favorites";
import { Categoria } from "./pages/Categoria";

function App() {
  const [loadingUser] = useAuth().loadingUser;
  return (
    <>
      {loadingUser ? (
        <h1>CARGANDO...</h1>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plato/detalles/:id" element={<ProductDetails />} />
            <Route path="/mis-favoritos" element={<Favorites />} />
            <Route path="/categoria/:categoria" element={<Categoria />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
