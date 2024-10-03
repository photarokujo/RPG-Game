import React, { useState, useEffect } from 'react';
import { Character } from './components/Character';
import { WorldMap } from './components/WorldMap';
import { Dialog } from './components/Dialog';
import { Inventory } from './components/Inventory';
import { Shop } from './components/Shop';
import { Workshop } from './components/Workshop';
import { Hospital } from './components/Hospital';
import { Home } from './components/Home';
import { Supermarket } from './components/Supermarket';
import { ElectronicsShop } from './components/ElectronicsShop';
import { ManufacturingShop } from './components/ManufacturingShop';

const GRID_SIZE = 32;

interface MapData {
  backgroundColor: string;
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
    color: string;
  }>;
  roads?: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
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
  const [gameState, setGameState] = useState('start');
  const [inventory, setInventory] = useState<Array<{ name: string; healthScore: number }>>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [dialog, setDialog] = useState<{ speaker: string; text: string } | null>(null);

  const maps: Maps = {
    town: {
      backgroundColor: 'bg-green-200',
      width: 20,
      height: 20,
      buildings: [
        { name: 'home', x: 2, y: 2, width: 3, height: 3, enterX: 3, enterY: 4, color: 'bg-red-500' },
        { name: 'workshop', x: 8, y: 2, width: 4, height: 3, enterX: 10, enterY: 4, color: 'bg-yellow-500' },
        { name: 'shop', x: 15, y: 2, width: 3, height: 2, enterX: 16, enterY: 3, color: 'bg-blue-500' },
        { name: 'supermarket', x: 2, y: 15, width: 4, height: 3, enterX: 4, enterY: 17, color: 'bg-green-500' },
        { name: 'electronics', x: 8, y: 15, width: 3, height: 3, enterX: 9, enterY: 17, color: 'bg-purple-500' },
        { name: 'manufacturing', x: 14, y: 15, width: 4, height: 3, enterX: 16, enterY: 17, color: 'bg-orange-500' },
        { name: 'hospital', x: 15, y: 8, width: 4, height: 4, enterX: 17, enterY: 11, color: 'bg-white' },
      ],
      roads: [
        { x: 0, y: 9, width: 20, height: 2 },
        { x: 9, y: 0, width: 2, height: 20 },
      ],
    },
    home: {
      backgroundColor: 'bg-yellow-100',
      width: 10,
      height: 10,
      exit: { x: 5, y: 9, toMap: 'town', toX: 3, toY: 4 },
    },
    workshop: {
      backgroundColor: 'bg-yellow-200',
      width: 12,
      height: 10,
      exit: { x: 6, y: 9, toMap: 'town', toX: 10, toY: 4 },
    },
    shop: {
      backgroundColor: 'bg-gray-200',
      width: 8,
      height: 8,
      exit: { x: 4, y: 7, toMap: 'town', toX: 16, toY: 3 },
    },
    supermarket: {
      backgroundColor: 'bg-green-100',
      width: 12,
      height: 10,
      exit: { x: 6, y: 9, toMap: 'town', toX: 4, toY: 17 },
    },
    electronics: {
      backgroundColor: 'bg-purple-100',
      width: 10,
      height: 10,
      exit: { x: 5, y: 9, toMap: 'town', toX: 9, toY: 17 },
    },
    manufacturing: {
      backgroundColor: 'bg-orange-100',
      width: 12,
      height: 10,
      exit: { x: 6, y: 9, toMap: 'town', toX: 16, toY: 17 },
    },
    hospital: {
      backgroundColor: 'bg-blue-100',
      width: 12,
      height: 12,
      exit: { x: 6, y: 11, toMap: 'town', toX: 17, toY: 11 },
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
    setGameState('exploring');
    setCurrentMap('town');
    setPlayerPosition({ x: 5, y: 5 });
    setDialog({
      speaker: 'Game',
      text: `Welcome, ${playerName}! Use arrow keys to move around the town. Visit the workshop to learn about health.`
    });
  };

  const enterBuilding = (building: string) => {
    setCurrentMap(building);
    switch (building) {
      case 'home':
        setDialog({
          speaker: 'Parents',
          text: 'Welcome home! We have some tasks for you. Can you buy some healthy items from the shops?'
        });
        break;
      case 'workshop':
        setDialog({
          speaker: 'Workshop Instructor',
          text: "Welcome to the Health Workshop! Here you'll learn about checking if items are good for your health."
        });
        break;
      case 'shop':
      case 'supermarket':
      case 'electronics':
      case 'manufacturing':
        setDialog({
          speaker: 'Shopkeeper',
          text: 'Welcome to our shop! Feel free to look around and ask questions about our products.'
        });
        break;
      case 'hospital':
        setDialog({
          speaker: 'Doctor',
          text: 'Welcome to the hospital. Remember, prevention is better than cure!'
        });
        break;
    }
  };

  const exitBuilding = () => {
    const currentMapData = maps[currentMap];
    if (currentMapData.exit) {
      setCurrentMap(currentMapData.exit.toMap);
      setPlayerPosition({ x: currentMapData.exit.toX, y: currentMapData.exit.toY });
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
    <div className='overflow-hidden'>
    <div className="game-container w-full h-screen flex justify-center items-center bg-gray-800 scale-125 overflow-hidden">
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
        {gameState === 'exploring' && (
          <>
            <WorldMap
              mapData={maps[currentMap]}
              playerPosition={playerPosition}
              onEnterBuilding={enterBuilding}
            />
            <Character position={playerPosition} />
            {currentMap === 'workshop' && <Workshop onExit={exitBuilding} />}
            {currentMap === 'shop' && <Shop onBuy={buyItem} onExit={exitBuilding} />}
            {currentMap === 'supermarket' && <Supermarket onBuy={buyItem} onExit={exitBuilding} />}
            {currentMap === 'electronics' && <ElectronicsShop onBuy={buyItem} onExit={exitBuilding} />}
            {currentMap === 'manufacturing' && <ManufacturingShop onBuy={buyItem} onExit={exitBuilding} />}
            {currentMap === 'hospital' && <Hospital onExit={exitBuilding} />}
            {currentMap === 'home' && <Home onEvaluate={evaluateItems} onExit={exitBuilding} />}
          </>
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
    </div>
  );
}