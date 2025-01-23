import { Clock, Plus } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onAddToCart: (service: Service) => void;
}

export function ServiceCard({ service, onAddToCart }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={service.image} 
        alt={service.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{service.name}</h3>
          <span className="text-lg font-bold text-green-600">
            ${service.price.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{service.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{service.duration}</span>
          </div>
          <button
            onClick={() => onAddToCart(service)}
            className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}