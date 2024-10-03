import React from 'react';

interface WorkshopProps {
  onExit: () => void;
}

export function Workshop({ onExit }: WorkshopProps) {
  return (
    <div className="absolute inset-0 bg-yellow-200 p-4">
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="bg-brown-500 rounded-lg"></div>
        <div className="bg-green-500 rounded-full"></div>
        <div className="bg-blue-500 rounded-lg"></div>
        <div className="col-span-3 bg-white p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Health Workshop</h2>
          <p>Learn about nutrition, exercise, and mental health here!</p>
        </div>
        <div className="col-span-3 flex justify-center">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onExit}
          >
            Exit Workshop
          </button>
        </div>
      </div>
    </div>
  );
}