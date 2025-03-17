import React from "react"

interface Task {
  id: number
  title: string
  completed: boolean
}

const tasks: Task[] = [
  { id: 1, title: "Complete project proposal", completed: false },
  { id: 2, title: "Review code changes", completed: true },
  { id: 3, title: "Update documentation", completed: false },
]

export function TaskList() {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
        Task List
      </h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-gradient-to-r from-pink-500/10 to-violet-500/10 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-zinc-900 dark:text-white">{task.title}</span>
              <span className={`text-sm ${task.completed ? "text-green-500" : "text-yellow-500"}`}>
                {task.completed ? "Completed" : "In Progress"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 