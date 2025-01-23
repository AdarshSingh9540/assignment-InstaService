import { CustomerForm } from '../components/CustomerForm';
import { Customer } from '../types';

interface CheckoutPageProps {
  onSubmit: (customer: Customer) => void;
}

export function CheckoutPage({ onSubmit }: CheckoutPageProps) {
  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Customer Information</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <CustomerForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}