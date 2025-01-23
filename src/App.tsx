import { useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { ServicesPage } from "./Pages/ServicesPage";
import { CartPage } from "./Pages/CartPage";
import { CheckoutPage } from "./Pages/ChechkoutPage";
import { Receipt } from "./components/Receipt";
import type { Customer, Receipt as ReceiptType } from "./types";
import { Footer } from "./components/layout/Footer";
import { useCartStore } from "./store/cartStore";

type Page = "services" | "cart" | "checkout" | "receipt";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("services");
  const [receipt, setReceipt] = useState<ReceiptType | null>(null);

  const {
    items: cartItems,
    clearCart,
    updateQuantity,
    removeItem,
  } = useCartStore();

  const handleCustomerSubmit = (customer: Customer) => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.service.price * item.quantity,
      0
    );
    const receipt: ReceiptType = {
      id: Math.random().toString(36).substr(2, 9),
      customer,
      items: cartItems,
      total,
      date: new Date().toISOString(),
    };
    setReceipt(receipt);
    clearCart();
    setCurrentPage("receipt");
  };

  const handleNewOrder = () => {
    setReceipt(null);
    setCurrentPage("services");
  };

  const cartItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Navbar
        cartItemsCount={cartItemsCount}
        onCartClick={() => setCurrentPage("cart")}
        onLogoClick={() => setCurrentPage("services")}
      />

      {currentPage === "services" && <ServicesPage />}

      {currentPage === "cart" && (
        <CartPage
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onContinue={() => setCurrentPage("checkout")}
        />
      )}

      {currentPage === "checkout" && (
        <CheckoutPage onSubmit={handleCustomerSubmit} />
      )}

      {currentPage === "receipt" && receipt && (
        <div className="py-8">
          <Receipt receipt={receipt} onClose={handleNewOrder} />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
