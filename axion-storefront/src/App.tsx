import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartDrawer } from "./components/CartDrawer";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CartProvider } from "./context/CartContext";
import { Collection } from "./pages/Collection";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Journal } from "./pages/Journal";
import { ProductPage } from "./pages/ProductPage";
import { Story } from "./pages/Story";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection/zenith" element={<Collection />} />
          <Route path="/products/:handle" element={<ProductPage />} />
          <Route path="/story" element={<Story />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </BrowserRouter>
  );
}
