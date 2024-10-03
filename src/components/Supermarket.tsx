import React from 'react';

interface SupermarketProps {
  onBuy: (item: { name: string; healthScore: number }) => void;
  onExit: () => void;
}

export function Supermarket({ onBuy, onExit }: SupermarketProps) {
  const items = [
    { name: 'Apple', healthScore: 5 },
    { name: 'Broccoli', healthScore: 6 },
    { name: 'Whole Grain Bread', healthScore: 4 },
    { name: 'Soda', healthScore: -2 },
    { name: 'Chips', healthScore: -1 },
  ];

  return (
    <div className="absolute inset-0 bg-green-100 p-4">
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="bg-red-200 rounded-lg p-2">
          <h3 className="font-bold">Fruits & Vegetables</h3>
          <ul>
            {items.slice(0, 2).map((item, index) => (
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
        <div className="bg-yellow-200 rounded-lg p-2">
          <h3 className="font-bold">Bakery</h3>
          <ul>
            {items.slice(2, 3).map((item, index) => (
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
        <div className="bg-blue-200 rounded-lg p-2">
          <h3 className="font-bold">Snacks & Drinks</h3>
          <ul>
            {items.slice(3).map((item, index) => (
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
        <div className="col-span-3 flex justify-center">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onExit}
          >
            Exit Supermarket
          </button>
        </div>
      </div>
    </div>
  );
}