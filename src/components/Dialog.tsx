import React from 'react';

interface DialogProps {
  speaker: string;
  text: string;
  onClose: () => void;
}

export function Dialog({ speaker, text, onClose }: DialogProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 p-4">
      <h3 className="font-bold">{speaker}</h3>
      <p>{text}</p>
      <button
        className="mt-2 px-2 py-1 bg-blue-500 text-white rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}