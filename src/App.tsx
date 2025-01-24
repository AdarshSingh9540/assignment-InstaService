import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { ServicesPage } from "./Pages/ServicesPage";
import { CartPage } from "./Pages/CartPage";
import { PaymentPage } from "./Pages/PaymentPage";
import { CheckoutPage } from "./Pages/ChechkoutPage";
import { Receipt } from "./components/Receipt";
import { Footer } from "./components/layout/Footer";
import { useCartStore } from "./store/cartStore";

export function App() {
  const { items } = useCartStore();
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar cartItemsCount={cartItemsCount} />

        <Routes>
          <Route path="/" element={<ServicesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/checkout"
            element={
              items.length > 0 ? <CheckoutPage /> : <Navigate to="/cart" />
            }
          />
          <Route
            path="/payment"
            element={
              items.length > 0 ? <PaymentPage /> : <Navigate to="/cart" />
            }
          />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
