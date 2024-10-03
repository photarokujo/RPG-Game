import React from 'react';

interface ElectronicsShopProps {
  onBuy: (item: { name: string; healthScore: number }) => void;
  onExit: () => void;
}

export function ElectronicsShop({ onBuy, onExit }: ElectronicsShopProps) {
  const items = [
    { name: 'Fitness Tracker', healthScore: 3 },
    { name: 'Air Purifier', healthScore: 2 },
    { name: 'Smart Water Bottle', healthScore: 1 },
  ];

  return (
    <div className="absolute inset-0 bg-purple-100 p-4">
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="bg-gray-200 rounded-lg p-2">
          <h3 className="font-bold">Health Electronics</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index} className="flex justify-between items-center mt-2">
                <span>{item.name}</span>
                <button
                  className="px-2 py-1 bg-purple-500 text-white rounded"
                  onClick={() => onBuy(item)}
                >
                  Buy
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-blue-200 rounded-lg p-2">
          <h3 className="font-bold">Tech Expert</h3>
          <p className="mt-2">Ask me about how these devices can improve your health!</p>
        </div>
        <div className="col-span-2 flex justify-center">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onExit}
          >
            Exit Electronics Shop
          </button>
        </div>
      </div>
    </div>
  );
}