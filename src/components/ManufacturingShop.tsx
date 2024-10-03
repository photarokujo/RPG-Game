import React from 'react';

interface ManufacturingShopProps {
  onBuy: (item: { name: string; healthScore: number }) => void;
  onExit: () => void;
}

export function ManufacturingShop({ onBuy, onExit }: ManufacturingShopProps) {
  const items = [
    { name: 'Eco-friendly Water Bottle', healthScore: 2 },
    { name: 'Reusable Food Container', healthScore: 1 },
    { name: 'Organic Cotton T-shirt', healthScore: 1 },
  ];

  return (
    <div className="absolute inset-0 bg-orange-100 p-4">
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="bg-green-200 rounded-lg p-2">
          <h3 className="font-bold">Eco-friendly Products</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index} className="flex justify-between items-center mt-2">
                <span>{item.name}</span>
                <button
                  className="px-2 py-1 bg-orange-500 text-white rounded"
                  onClick={() => onBuy(item)}
                >
                  Buy
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-yellow-200 rounded-lg p-2">
          <h3 className="font-bold">Sustainable Manufacturing</h3>
          <p className="mt-2">Learn about how these products are made sustainably!</p>
        </div>
        <div className="col-span-2 flex justify-center">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onExit}
          >
            Exit Manufacturing Shop
          </button>
        </div>
      </div>
    </div>
  );
}