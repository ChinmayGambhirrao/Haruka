"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

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
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">
        Productivity Overview
      </h2>

      {/* Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={weeklyData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-zinc-200 dark:stroke-zinc-700"
            />
            <XAxis
              dataKey="day"
              className="text-zinc-600 dark:text-zinc-400"
            />
            <YAxis
              className="text-zinc-600 dark:text-zinc-400"
              tickFormatter={formatMinutes}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white dark:bg-zinc-800 p-2 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700">
                      <p className="text-zinc-900 dark:text-white font-medium">
                        {payload[0].payload.day}
                      </p>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        {formatMinutes(payload[0].value as number)}
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="focusMinutes"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#focusGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-50 dark:bg-zinc-700/50 rounded-lg p-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
            Best Focus Day
          </p>
          <p className="text-lg font-semibold text-zinc-900 dark:text-white">
            {bestDay} 🎯
          </p>
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-700/50 rounded-lg p-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
            Daily Average
          </p>
          <p className="text-lg font-semibold text-zinc-900 dark:text-white">
            {formatMinutes(averageMinutes)} ⌚
          </p>
        </div>
      </div>
    </div>
  )
} 