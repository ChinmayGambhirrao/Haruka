"use client"

import { useState, useEffect, useCallback } from "react"
import { Play, Pause, RotateCcw, Settings } from "lucide-react"

type TimerMode = "work" | "shortBreak" | "longBreak"

interface TimerSettings {
  work: number
  shortBreak: number
  longBreak: number
  longBreakInterval: number
}

const defaultSettings: TimerSettings = {
  work: 25 * 60, // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60, // 15 minutes
  longBreakInterval: 4, // After 4 work sessions
}

export function PomodoroTimer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [time, setTime] = useState(defaultSettings.work)
  const [mode, setMode] = useState<TimerMode>("work")
  const [sessions, setSessions] = useState(0)
  const [settings] = useState<TimerSettings>(defaultSettings)

  const requestNotificationPermission = useCallback(async () => {
    if ("Notification" in window) {
      await Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    requestNotificationPermission()
  }, [requestNotificationPermission])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isPlaying && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      // Timer completed
      setIsPlaying(false)
      if (mode === "work") {
        const newSessions = sessions + 1
        setSessions(newSessions)
        
        // Show notification
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("Time for a break!", {
            body: "Great work! Take some time to rest.",
            icon: "/favicon.ico",
          })
        }

        // Determine next break type
        if (newSessions % settings.longBreakInterval === 0) {
          setMode("longBreak")
          setTime(settings.longBreak)
        } else {
          setMode("shortBreak")
          setTime(settings.shortBreak)
        }
      } else {
        // Break completed
        setMode("work")
        setTime(settings.work)
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("Break finished!", {
            body: "Ready to focus again?",
            icon: "/favicon.ico",
          })
        }
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, time, mode, sessions, settings])

  const toggleTimer = () => {
    setIsPlaying(!isPlaying)
  }

  const resetTimer = () => {
    setIsPlaying(false)
    setTime(settings.work)
    setMode("work")
    setSessions(0)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const getProgressPercentage = () => {
    const total = mode === "work" 
      ? settings.work 
      : mode === "shortBreak" 
        ? settings.shortBreak 
        : settings.longBreak
    return ((total - time) / total) * 100
  }

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          {mode === "work" ? "Focus Time" : mode === "shortBreak" ? "Short Break" : "Long Break"}
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Session {sessions + 1}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {/* Timer Circle */}
        <div className="relative w-48 h-48 mb-8">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              className="stroke-current text-zinc-100 dark:text-zinc-700"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              className="stroke-current text-blue-500"
              strokeWidth="12"
              fill="none"
              strokeDasharray={2 * Math.PI * 88}
              strokeDashoffset={2 * Math.PI * 88 * (1 - getProgressPercentage() / 100)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-zinc-900 dark:text-white">
              {formatTime(time)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex space-x-4">
          <button
            onClick={toggleTimer}
            className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>
          <button
            onClick={resetTimer}
            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
} 