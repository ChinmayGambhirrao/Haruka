"use client"

import { useState } from "react"
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  Volume2,
  VolumeX,
  ChevronDown,
} from "lucide-react"
import { PomodoroTimer } from "@/components/dashboard/PomodoroTimer"
import { BackgroundSounds } from "@/components/dashboard/BackgroundSounds"
import { ProductivityAnalytics } from "@/components/dashboard/ProductivityAnalytics"
import { TaskList } from "@/components/dashboard/TaskList"
import { QuickNotes as QuickNotesWidget } from "@/components/dashboard/QuickNotes"
import { DailyQuote } from "@/components/dashboard/DailyQuote"

// Components for each section
function TaskSummary() {
  const tasks = {
    completed: 5,
    pending: 3,
    inProgress: 2,
  }

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Task Summary
        </h2>
        <button className="flex items-center space-x-1 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-zinc-600 dark:text-zinc-400">Completed</span>
          <span className="text-green-500">{tasks.completed}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-600 dark:text-zinc-400">In Progress</span>
          <span className="text-yellow-500">{tasks.inProgress}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-600 dark:text-zinc-400">Pending</span>
          <span className="text-red-500">{tasks.pending}</span>
        </div>
      </div>
    </div>
  )
}

function QuickNotes() {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
        Quick Notes
      </h2>
      <textarea
        className="w-full h-32 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write a quick note..."
      />
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Quote of the day */}
      <DailyQuote />

      {/* Main grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PomodoroTimer />
        </div>
        <TaskList />
        <QuickNotesWidget />
        <BackgroundSounds />
        <div className="lg:col-span-2">
          <ProductivityAnalytics />
        </div>
      </div>
    </div>
  )
} 