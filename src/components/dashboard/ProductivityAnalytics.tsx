"use client"

import React from "react"
import { motion } from "framer-motion"

// Mock data - in a real app, this would come from your backend
const weeklyData = [
  { day: "Mon", focusMinutes: 120 },
  { day: "Tue", focusMinutes: 180 },
  { day: "Wed", focusMinutes: 150 },
  { day: "Thu", focusMinutes: 210 },
  { day: "Fri", focusMinutes: 160 },
  { day: "Sat", focusMinutes: 90 },
  { day: "Sun", focusMinutes: 75 },
]

const getBestDay = () => {
  const bestDay = weeklyData.reduce((prev, current) =>
    prev.focusMinutes > current.focusMinutes ? prev : current
  )
  return bestDay.day
}

const getAverageMinutes = () => {
  const total = weeklyData.reduce((sum, day) => sum + day.focusMinutes, 0)
  return Math.round(total / weeklyData.length)
}

const formatMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
}

export function ProductivityAnalytics() {
  const bestDay = getBestDay()
  const averageMinutes = getAverageMinutes()

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
        Productivity Stats
      </h2>
      <div className="h-48 flex items-end justify-between">
        {weeklyData.map((item, index) => {
          // Calculate height percentage based on max value
          const maxValue = Math.max(...weeklyData.map(d => d.focusMinutes));
          const heightPercentage = (item.focusMinutes / maxValue) * 100;
          
          return (
            <motion.div
              key={item.day}
              initial={{ height: 0 }}
              animate={{ height: `${heightPercentage}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-8 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg shadow-md relative group"
              style={{ minHeight: '10%' }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-zinc-700 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {formatMinutes(item.focusMinutes)}
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="flex justify-between mt-2">
        {weeklyData.map((item) => (
          <span key={item.day} className="text-sm text-zinc-600 dark:text-zinc-400">
            {item.day}
          </span>
        ))}
      </div>
    </div>
  )
} 