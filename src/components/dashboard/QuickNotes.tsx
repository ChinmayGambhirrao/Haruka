// Create a new QuickNotes component with a sticky-note-style widget
import React, { useState } from "react"

export function QuickNotes() {
  const [note, setNote] = useState("")

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
        Quick Notes
      </h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full h-32 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write a quick note..."
      />
    </div>
  )
} 