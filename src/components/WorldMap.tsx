import React from 'react';

interface Building {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

interface Road {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface MapData {
  backgroundColor: string;
  width: number;
  height: number;
  buildings?: Building[];
  roads?: Road[];
}

interface WorldMapProps {
  mapData: MapData;
  playerPosition: { x: number; y: number };
  onEnterBuilding: (building: string) => void;
}

export function WorldMap({ mapData, playerPosition, onEnterBuilding }: WorldMapProps) {
  return (
    <div className={`world-map relative w-full h-full ${mapData.backgroundColor}`}>
      {mapData.roads && mapData.roads.map((road, index) => (
        <div
          key={`road-${index}`}
          className="absolute bg-gray-400"
          style={{
            left: `${road.x * 32}px`,
            top: `${road.y * 32}px`,
            width: `${road.width * 32}px`,
            height: `${road.height * 32}px`,
          }}
        />
      ))}
      {mapData.buildings && mapData.buildings.map((building) => (
        <div
          key={building.name}
          className={`absolute cursor-pointer ${building.color}`}
          style={{
            left: `${building.x * 32}px`,
            top: `${building.y * 32}px`,
            width: `${building.width * 32}px`,
            height: `${building.height * 32}px`,
          }}
          onClick={() => onEnterBuilding(building.name)}
        >
          <p className="text-xs text-center mt-1 bg-white bg-opacity-50 rounded">{building.name}</p>
        </div>
      ))}
    </div>
  );
}