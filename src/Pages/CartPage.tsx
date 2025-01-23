import { CartItem } from '../types';
import { Cart } from '../components/Cart';

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (serviceId: string, change: number) => void;
  onRemoveItem: (serviceId: string) => void;
  onContinue: () => void;
}

export function CartPage({ items, onUpdateQuantity, onRemoveItem, onContinue }: CartPageProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <Cart
        items={items}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveItem}
        onCheckout={onContinue}
      />
    </div>
  );
}