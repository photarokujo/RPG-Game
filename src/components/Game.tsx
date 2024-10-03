import React, { useState, useEffect } from 'react';
import { Character } from './components/Character';
import { WorldMap } from './components/WorldMap';
import { Dialog } from './components/Dialog';
import { Inventory } from './components/Inventory';
import { Shop } from './components/Shop';
import { Workshop } from './components/Workshop';

const GRID_SIZE = 32;

interface MapData {
  background: string;
  width: number;
  height: number;
  buildings?: Array<{
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    enterX: number;
    enterY: number;
  }>;
  exit?: {
    x: number;
    y: number;
    toMap: string;
    toX: number;
    toY: number;
  };
}

interface Maps {
  [key: string]: MapData;
}

export default function Game() {
  const [playerPosition, setPlayerPosition] = useState({ x: 5, y: 5 });
  const [currentMap, setCurrentMap] = useState('town');
  const [gameState, setGameState] = useState('workshop');
  const [inventory, setInventory] = useState<Array<{ name: string; healthScore: number }>>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [dialog, setDialog] = useState<{ speaker: string; text: string } | null>(null);

  const maps: Maps = {
    town: {
      background: '/images/town_map.png',
      width: 20,
      height: 20,
      buildings: [
        { name: 'home', x: 5, y: 5, width: 2, height: 2, enterX: 5, enterY: 6 },
        { name: 'shop', x: 10, y: 2, width: 3, height: 2, enterX: 11, enterY: 3 },
      ],
    },
    home: {
      background: '/images/home_interior.png',
      width: 10,
      height: 10,
      exit: { x: 5, y: 9, toMap: 'town', toX: 5, toY: 6 },
    },
    shop: {
      background: '/images/shop_interior.png',
      width: 8,
      height: 8,
      exit: { x: 4, y: 7, toMap: 'town', toX: 11, toY: 3 },
    },
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== 'exploring') return;

      const currentMapData = maps[currentMap];
      const newPosition = { ...playerPosition };

      switch (e.key) {
        case 'ArrowUp':
          newPosition.y = Math.max(0, newPosition.y - 1);
          break;
        case 'ArrowDown':
          newPosition.y = Math.min(currentMapData.height - 1, newPosition.y + 1);
          break;
        case 'ArrowLeft':
          newPosition.x = Math.max(0, newPosition.x - 1);
          break;
        case 'ArrowRight':
          newPosition.x = Math.min(currentMapData.width - 1, newPosition.x + 1);
          break;
      }

      if (currentMapData.exit && newPosition.x === currentMapData.exit.x && newPosition.y === currentMapData.exit.y) {
        setCurrentMap(currentMapData.exit.toMap);
        setPlayerPosition({ x: currentMapData.exit.toX, y: currentMapData.exit.toY });
      } else if (currentMap === 'town') {
        const building = currentMapData.buildings?.find(
          b => newPosition.x >= b.x && newPosition.x < b.x + b.width &&
             newPosition.y >= b.y && newPosition.y < b.y + b.height
        );
        if (building) {
          setCurrentMap(building.name);
          setPlayerPosition({ x: building.enterX, y: building.enterY });
        } else {
          setPlayerPosition(newPosition);
        }
      } else {
        setPlayerPosition(newPosition);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerPosition, currentMap, gameState]);

  const startGame = (playerName: string) => {
    setGameState('workshop');
    setDialog({
      speaker: 'Workshop Speaker',
      text: `Welcome, ${playerName}! Today we'll learn about checking if items are good for your health.`
    });
  };

  const exitWorkshop = () => {
    setGameState('exploring');
    setCurrentMap('town');
    setPlayerPosition({ x: 5, y: 5 });
    setDialog({
      speaker: 'Game',
      text: 'You left the workshop. Use arrow keys to move around the town.'
    });
  };

  const enterBuilding = (building: string) => {
    setCurrentMap(building);
    if (building === 'home') {
      setDialog({
        speaker: 'Parents',
        text: 'Welcome home! We have some tasks for you. Can you buy some healthy items from the shops?'
      });
    } else if (building === 'shop') {
      setDialog({
        speaker: 'Shopkeeper',
        text: 'Welcome to the shop! Feel free to look around and ask questions about our products.'
      });
    }
  };

  const buyItem = (item: { name: string; healthScore: number }) => {
    setInventory([...inventory, item]);
    setDialog({
      speaker: 'Shopkeeper',
      text: `You bought ${item.name}. Remember to check the labels and ingredients!`
    });
  };

  const evaluateItems = () => {
    const newScore = inventory.reduce((sum, item) => sum + item.healthScore, 0);
    setScore(newScore);
    if (newScore >= 10 * level) {
      setLevel(level + 1);
      setDialog({
        speaker: 'Parents',
        text: `Great job! You scored ${newScore} points. You're ready for the next level!`
      });
    } else {
      setDialog({
        speaker: 'Parents',
        text: `You scored ${newScore} points. Try again to make healthier choices.`
      });
    }
    setInventory([]);
  };

  return (
    <div className="game-container w-full h-screen flex justify-center items-center bg-gray-800">
      <div className="game-screen w-[640px] h-[640px] bg-white relative overflow-hidden">
        {gameState === 'start' && (
          <div className="start-screen flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl mb-4">Health Quest</h1>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => startGame('Player')}
            >
              Start Game
            </button>
          </div>
        )}
        {gameState === 'workshop' && (
          <Workshop onExit={exitWorkshop} />
        )}
        {gameState === 'exploring' && (
          <>
            <WorldMap
              mapData={maps[currentMap]}
              playerPosition={playerPosition}
              onEnterBuilding={enterBuilding}
            />
            <Character position={playerPosition} />
          </>
        )}
        {currentMap === 'shop' && gameState === 'exploring' && (
          <Shop onBuy={buyItem} />
        )}
        {dialog && (
          <Dialog speaker={dialog.speaker} text={dialog.text} onClose={() => setDialog(null)} />
        )}
        <div className="hud absolute top-0 left-0 p-2 bg-black bg-opacity-50 text-white">
          <p>Level: {level}</p>
          <p>Score: {score}</p>
        </div>
        <Inventory items={inventory} />
      </div>
    </div>
  );
}