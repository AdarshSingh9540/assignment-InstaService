import { useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { ServicesPage } from "./Pages/ServicesPage";
import { CartPage } from "./Pages/CartPage";
import { CheckoutPage } from "./Pages/ChechkoutPage";
import { Receipt } from "./components/Receipt";
import { Service, CartItem, Customer, Receipt as ReceiptType } from "./types";
import { Footer } from "./components/layout/Footer";

type Page = "services" | "cart" | "checkout" | "receipt";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("services");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [receipt, setReceipt] = useState<ReceiptType | null>(null);

  const handleAddToCart = (service: Service) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.service.id === service.id);
      if (existingItem) {
        return items.map((item) =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { service, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (serviceId: string, change: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.service.id === serviceId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (serviceId: string) => {
    setCartItems((items) =>
      items.filter((item) => item.service.id !== serviceId)
    );
  };

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
    setCartItems([]);
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
    <div className="min-h-screen bg-gray-100">
      <Navbar
        cartItemsCount={cartItemsCount}
        onCartClick={() => setCurrentPage("cart")}
        onLogoClick={() => setCurrentPage("services")}
      />

      {currentPage === "services" && (
        <ServicesPage onAddToCart={handleAddToCart} />
      )}

      {currentPage === "cart" && (
        <CartPage
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
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
