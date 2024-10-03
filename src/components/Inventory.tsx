import React from 'react';

interface InventoryItem {
  name: string;
  healthScore: number;
}

interface InventoryProps {
  items: InventoryItem[];
}

export function Inventory({ items }: InventoryProps) {
  return (
    <div className="absolute top-0 right-0 bg-white border-l-2 border-b-2 border-gray-300 p-2">
      <h3 className="font-bold">Inventory</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} (+{item.healthScore})
          </li>
        ))}
      </ul>
    </div>
  );
}