import React from 'react'

export interface Task {
  id: number
  description: string
  assignedBy: 'Mom' | 'Dad'
}

interface TaskListProps {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="absolute top-0 left-[50%] translate-x-[-50%] bg-black bg-opacity-60 text-white text-xs p-2 rounded-b-md">
      <h3 className="font-bold text-white mb-1">Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks assigned yet.</p>
      ) : (
        <ul className="space-y-1">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between">
              <span>{task.description}</span>
              <span className="ml-2 text-gray-400">- {task.assignedBy}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}