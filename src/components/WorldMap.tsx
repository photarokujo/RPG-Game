import React from 'react'
import { motion } from 'framer-motion'

interface Building {
  name: string
  x: number
  y: number
  width: number
  height: number
  color: string
  icon: string
}

interface Road {
  x: number
  y: number
  width: number
  height: number
}

interface MapData {
  backgroundColor: string
  width: number
  height: number
  buildings?: Building[]
  roads?: Road[]
}

interface WorldMapProps {
  mapData: MapData
  playerPosition: { x: number; y: number }
  onEnterBuilding: (building: string) => void
}

export function WorldMap({ mapData, playerPosition, onEnterBuilding }: WorldMapProps) {
  const getBuildingIcon = (name: string) => {
    switch (name) {
      case 'home':
        return '🏠'
      case 'workshop':
        return '🔧'
      case 'shop':
        return '🛒'
      case 'supermarket':
        return '🏪'
      case 'electronics':
        return '💻'
      case 'manufacturing':
        return '🏭'
      case 'hospital':
        return '🏥'
      default:
        return '🏢'
    }
  }

  return (
    <div 
      className={`world-map relative w-full h-full ${mapData.backgroundColor}`}
      style={{
        backgroundImage: 'url("/placeholder.svg?height=640&width=640")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
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
        <motion.div
          key={building.name}
          className={`absolute cursor-pointer ${building.color} rounded-lg shadow-md overflow-hidden`}
          style={{
            left: `${building.x * 32}px`,
            top: `${building.y * 32}px`,
            width: `${building.width * 32}px`,
            height: `${building.height * 32}px`,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEnterBuilding(building.name)}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl mb-1" role="img" aria-label={building.name}>
              {getBuildingIcon(building.name)}
            </span>
            <p className="text-xs font-bold text-center bg-white bg-opacity-75 px-1 rounded">
              {building.name}
            </p>
          </div>
        </motion.div>
      ))}
      +.3-
    </div>
  )
}