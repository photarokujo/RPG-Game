import React, { useState, useEffect } from 'react'
import { Task, TaskList } from './task-list'

interface HomeProps {
  onEvaluate: () => void
  onExit: () => void
  onEntering: () => void
  onAssignTask: (task: Task) => void
  tasks: Task[]
}

export function Home({ onEvaluate, onExit, onEntering, onAssignTask, tasks }: HomeProps) {
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    onEntering()
  }, [onEntering])

  const assignTask = (parent: 'Mom' | 'Dad') => {
    const newTask: Task = {
      id: tasks.length + 1,
      description: `Task ${tasks.length + 1} from ${parent}`,
      assignedBy: parent,
    }
    onAssignTask(newTask)
    setShowDialog(false)
  }

  return (
    <div className="absolute inset-0 bg-yellow-100 p-4">
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="bg-brown-300 rounded-lg p-2">
          <h3 className="font-bold">Living Room</h3>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setShowDialog(true)}
          >
            Talk to Parents
          </button>
        </div>
        <div className="bg-blue-300 rounded-lg p-2 flex justify-center">
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

      {showDialog && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Parents</h2>
            <p>Do you want to accept a task?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={() => assignTask('Mom')}
              >
                Accept from Mom
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => assignTask('Dad')}
              >
                Accept from Dad
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => setShowDialog(false)}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      <TaskList tasks={tasks} />
    </div>
  )
}