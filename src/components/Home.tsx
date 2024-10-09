import React, { useState, useEffect } from 'react'
import { BuildingInterior } from './BuildingInterior'
import { Task, TaskList } from './task-list'
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog"

interface HomeProps {
  onEvaluate: () => void
  onExit: () => void
  onAssignTask: (task: Task) => void
  tasks: Task[]
}

export function Home({ onEvaluate, onExit, onAssignTask, tasks }: HomeProps) {
  const [showParentDialog, setShowParentDialog] = useState(false)
  const [activeParent, setActiveParent] = useState<'Mom' | 'Dad' | null>(null)

  // Remove the useEffect hook that was causing the error

  const handleParentInteraction = (parent: 'Mom' | 'Dad') => {
    setActiveParent(parent)
    setShowParentDialog(true)
  }

  const assignTask = (parent: 'Dad' | 'Mom') => {
    const newTask: Task = {
      id: tasks.length + 1,
      description: `Task ${tasks.length + 1} from ${parent}`,
      assignedBy: parent,
    }
    onAssignTask(newTask)
    setShowParentDialog(false)
  }

  const homeLayout = [
    [
      { type: 'wall', walkable: false },
      { type: 'wall', walkable: false },
      { type: 'wall', walkable: false },
      { type: 'wall', walkable: false },
      { type: 'wall', walkable: false },
      { type: 'wall', walkable: false },
      { type: 'wall', walkable: false },
      { type: 'wall', walkable: false },
    ],
    [
      { type: 'wall', walkable: false },
      { type: 'floor', walkable: true },
      { type: 'floor', walkable: true },
      { type: 'floor', walkable: true },
      { type: 'floor', walkable: true },
      { type: 'floor', walkable: true },
      { type: 'floor', walkable: true },
      { type: 'wall', walkable: false },
    ],
    [
      { type: 'wall', walkable: false },
      { type: 'floor', walkable: true },
      { type: 'furniture', icon: '🪑', walkable: false },
      { type: 'furniture', icon: '🍽️', walkable: false },
      { type: 'furniture', icon: '🍽️', walkable: false },
      { type: 'furniture', icon: '🪑', walkable: false },
      { type: 'floor', walkable: true },
      { type: 'wall', walkable: false },
    ],
    [
      { type: 'wall', walkable: false },
      { type: 'floor', walkable: true },
      { type: 'furniture', icon: '🛋️', walkable: false },
      { type: 'floor', walkable: true },
      { type: 'floor', walkable: true },
      { type: 'decoration', icon: '🪴', walkable: false },
      { type: 'floor', walkable: true },
      { type: 'wall', walkable: false },
    ],
    [
      { type: 'wall', walkable: false },
      { type: 'floor', walkable: true },
      { type: 'furniture', icon: '📺', walkable: false },
      { type: 'floor', walkable: true },
      { type: 'floor', walkable: true },
      { type: 'furniture', icon: '🧺', walkable: false },
      { type: 'floor', walkable: true },
      { type: 'wall', walkable: false },
    ],
    [
      { type: 'wall', walkable: false },
      { type: 'floor', walkable: true },
      { type: 'furniture', icon: '🔥', walkable: false },
      { type: 'floor', walkable: true },
      {
        type: 'npc',
        icon: '👩',
        walkable: false,
        content: <Button onClick={() => handleParentInteraction('Mom')}>Talk to Mom</Button>,
      },
      {
        type: 'npc',
        icon: '👨',
        walkable: false,
        content: <Button onClick={() => handleParentInteraction('Dad')}>Talk to Dad</Button>,
      },
      { type: 'floor', walkable: true },
      { type: 'wall', walkable: false },
    ],
    [
      { type: 'wall', walkable: false },
      { type: 'floor', walkable: true },
      { type: 'floor', walkable: true },
      { type: 'floor', walkable: true },
      { type: 'floor', walkable: true },
      { type: 'floor', walkable: true },
      { type: 'floor', walkable: true },
      { type: 'wall', walkable: false },
    ],
    [
      { type: 'wall', walkable: false },
      { type: 'wall', walkable: false },
      { type: 'wall', walkable: false },
      { type: 'wall', walkable: false },
      { type: 'floor', walkable: true },
      { type: 'wall', walkable: false },
      { type: 'wall', walkable: false },
      { type: 'wall', walkable: false },
    ],
  ]

  return (
    <>
      <BuildingInterior layout={homeLayout} onExit={onExit} buildingName="Home" />
      <div className="absolute top-4 left-4 bg-white bg-opacity-80 p-2 rounded">
        <h3 className="font-bold">Home Controls</h3>
        <Button className="mt-2" onClick={onEvaluate}>
          Evaluate Items
        </Button>
      </div>

      <Dialog open={showParentDialog} onOpenChange={setShowParentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{activeParent === 'Mom' ? 'Mom' : 'Dad'}</DialogTitle>
            <DialogDescription>
              {activeParent === 'Mom'
                ? 'Do you want Mom to evaluate the items?'
                : 'Do you want to accept a task from Dad?'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {activeParent === 'Mom' ? (
              <Button onClick={onEvaluate}>Evaluate Items</Button>
            ) : (
              <Button onClick={() => assignTask('Dad')}>Accept Task from Dad</Button>
            )}
            <Button variant="secondary" onClick={() => setShowParentDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <TaskList tasks={tasks} />
    </>
  )
}