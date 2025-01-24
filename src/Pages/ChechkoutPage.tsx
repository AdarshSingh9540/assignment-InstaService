import { useNavigate } from "react-router-dom";
import { CustomerForm } from "../components/CustomerForm";
import { Customer } from "../types";
import { useCartStore } from "../store/cartStore";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items } = useCartStore();

  const handleSubmit = (customer: Customer) => {
    localStorage.setItem("customerInfo", JSON.stringify(customer));
    if (items.length > 0) {
      navigate("/payment");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Customer Information</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <CustomerForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
