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
    <div className="absolute top-0 left-[50%] translate-x-[-50%] bg-black border-gray-300 p-2 opacity-60 text-white text-xs">
      <h3 className="font-bold text-white">Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.description} - Assigned by {task.assignedBy}
          </li>
        ))}
      </ul>
    </div>
  )
}