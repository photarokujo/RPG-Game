import React from 'react';
import { motion } from 'framer-motion';

interface CharacterProps {
  position: { x: number; y: number };
}

export function Character({ position }: CharacterProps) {
  return (
    <div
      className="absolute w-8 h-8 bg-blue-500 rounded-full border-2 border-blue-700"
      style={{
        left: `${position.x * 32}px`,
        top: `${position.y * 32}px`,
        transition: 'all 0.1s',
      }}
    >
      <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>
      <div className="w-2 h-2 bg-white rounded-full absolute top-1 right-1"></div>
      <div className="w-4 h-1 bg-red-500 rounded-full absolute bottom-2 left-2"></div>
    </div>
  );
}