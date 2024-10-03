import React from 'react';

interface HomeProps {
  onEvaluate: () => void;
  onExit: () => void;
}

export function Home({ onEvaluate, onExit }: HomeProps) {
  return (
    <div className="absolute inset-0 bg-yellow-100 p-4">
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="bg-brown-300 rounded-lg p-2">
          <h3 className="font-bold">Living Room</h3>
        </div>
        <div className="bg-blue-300 rounded-lg p-2">
          <h3 className="font-bold">Kitchen</h3>
        </div>
        <div className="col-span-2 bg-green-300 rounded-lg p-2">
          <h3 className="font-bold">Evaluate Health Choices</h3>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={onEvaluate}
          >
            Evaluate Items
          </button>
        </div>
        <div className="col-span-2 flex justify-center">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onExit}
          >
            Exit Home
          </button>
        </div>
      </div>
    </div>
  );
}