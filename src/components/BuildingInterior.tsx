"use client"

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Character } from './Character'

interface Tile {
  type: 'floor' | 'wall' | 'furniture' | 'decoration' | 'npc'
  icon?: string
  walkable: boolean
  interaction?: () => void
}

interface BuildingInteriorProps {
  layout: Tile[][]
  onExit: () => void
  buildingName: string
}

export function BuildingInterior({ layout, onExit, buildingName }: BuildingInteriorProps) {
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 })
  const [showDialog, setShowDialog] = useState(false)
  const [dialogContent, setDialogContent] = useState({ title: '', content: '' })

  const TILE_SIZE = 33 // Size of each tile in pixels

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newPosition = { ...playerPosition }

      switch (e.key) {
        case 'ArrowUp':
          newPosition.y = Math.max(0, newPosition.y - 1)
          break
        case 'ArrowDown':
          newPosition.y = Math.min(layout.length - 1, newPosition.y + 1)
          break
        case 'ArrowLeft':
          newPosition.x = Math.max(0, newPosition.x - 1)
          break
        case 'ArrowRight':
          newPosition.x = Math.min(layout[0].length - 1, newPosition.x + 1)
          break
        case 'Enter':
          interactWithTile(newPosition)
          return
      }

      // Check if the new position is walkable before updating the player position
      if (layout[newPosition.y][newPosition.x].walkable) {
        setPlayerPosition(newPosition)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [playerPosition, layout])

  const interactWithTile = (position: { x: number; y: number }) => {
    const tile = layout[position.y][position.x]
    if (tile.interaction) {
      console.log(`Interacting with tile at ${position.x}, ${position.y}`)
      tile.interaction()
    } else {
      console.log(`No interaction available at tile ${position.x}, ${position.y}`)
    }
  }

  const getTileStyle = (tile: Tile) => {
    switch (tile.type) {
      case 'floor':
        return 'bg-yellow-200'
      case 'wall':
        return 'bg-gray-500'
      case 'furniture':
        return 'bg-brown-400'
      case 'decoration':
        return 'bg-green-300'
      case 'npc':
        return 'bg-blue-300'
      default:
        return 'bg-gray-200'
    }
  }

  return (
    <div className="absolute inset-0 bg-pink-100 flex flex-col items-center justify-center overflow-hidden">
      <h2 className="text-2xl font-bold mb-10">{buildingName}</h2>
      <div
        className="relative border-4 border-brown-600 rounded-lg overflow-hidden scale-125"
        style={{
          width: `${layout[0].length * TILE_SIZE}px`,
          height: `${layout.length * TILE_SIZE}px`,
        }}
      >
        {layout.map((row, y) => (
          <div key={y} className="flex">
            {row.map((tile, x) => (
              <div
                key={`${x}-${y}`}
                className={`flex items-center justify-center ${getTileStyle(tile)}`}
                style={{
                  width: `${TILE_SIZE}px`,
                  height: `${TILE_SIZE}px`,
                }}
              >
                {tile.icon && <span className="text-2xl">{tile.icon}</span>}
              </div>
            ))}
          </div>
        ))}
        <Character position={playerPosition} tileSize={TILE_SIZE} />
      </div>
      <div className="mt-10">
        <Button variant="destructive" onClick={onExit}>
          Exit Building
        </Button>
      </div>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogContent.title}</DialogTitle>
            <DialogDescription>{dialogContent.content}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
