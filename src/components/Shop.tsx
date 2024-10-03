import React from 'react';

interface ShopProps {
  onBuy: (item: { name: string; healthScore: number }) => void;
  onExit: () => void;
}

export function Shop({ onBuy, onExit }: ShopProps) {
  const shopItems = [
    { name: 'Health Potion', healthScore: 5 },
    { name: 'Energy Bar', healthScore: 3 },
    { name: 'Vitamin Supplement', healthScore: 4 },
  ];

  return (
    <div className="absolute inset-0 bg-gray-200 p-4">
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="bg-blue-300 rounded-lg p-2">
          <h3 className="font-bold">Shop Inventory</h3>
          <ul>
            {shopItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center mt-2">
                <span>{item.name}</span>
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded"
                  onClick={() => onBuy(item)}
                >
                  Buy
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-yellow-300 rounded-lg p-2">
          <h3 className="font-bold">Shop Keeper</h3>
          <div className="mt-4 w-16 h-16 bg-red-500 rounded-full mx-auto"></div>
        </div>
        <div className="col-span-2 flex justify-center">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onExit}
          >
            Exit Shop
          </button>
        </div>
      </div>
    </div>
  );
}