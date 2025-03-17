"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Play, Pause, RotateCcw, Settings, Volume2, VolumeX, X, Check } from "lucide-react"

type TimerMode = "work" | "shortBreak" | "longBreak"
type TimerSound = "none" | "bell" | "digital" | "twinkle" | "zen"

interface TimerSettings {
  work: number
  shortBreak: number
  longBreak: number
  longBreakInterval: number
  autoTransition: boolean
  hideCount: boolean
  sound: TimerSound
  volume: number
}

const defaultSettings: TimerSettings = {
  work: 25 * 60, // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60, // 15 minutes
  longBreakInterval: 4, // After 4 work sessions
  autoTransition: true,
  hideCount: false,
  sound: "twinkle",
  volume: 0.7
}

const soundFiles = {
  bell: "/sounds/bell.mp3",
  digital: "/sounds/digital.mp3",
  twinkle: "/sounds/twinkle.mp3",
  zen: "/sounds/zen.mp3"
};

export function PomodoroTimer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [time, setTime] = useState(defaultSettings.work)
  const [mode, setMode] = useState<TimerMode>("work")
  const [sessions, setSessions] = useState(0)
  const [settings, setSettings] = useState<TimerSettings>(defaultSettings)
  const [showSettings, setShowSettings] = useState(false)
  const [tempSettings, setTempSettings] = useState<TimerSettings>(settings)
  
  // Form state for settings
  const [workMinutes, setWorkMinutes] = useState(Math.floor(settings.work / 60).toString())
  const [shortBreakMinutes, setShortBreakMinutes] = useState(Math.floor(settings.shortBreak / 60).toString())
  const [longBreakMinutes, setLongBreakMinutes] = useState(Math.floor(settings.longBreak / 60).toString())
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
      
      // Play sound
      if (settings.sound !== "none") {
        playSound();
      }
      
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
        
        // Auto-transition
        if (settings.autoTransition) {
          setIsPlaying(true)
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
        
        // Auto-transition
        if (settings.autoTransition) {
          setIsPlaying(true)
        }
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, time, mode, sessions, settings])

  const playSound = () => {
    if (settings.sound === "none") return;
    
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      const sound = new Audio(soundFiles[settings.sound]);
      sound.volume = settings.volume;
      sound.play();
      audioRef.current = sound;
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

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

  const switchMode = (newMode: TimerMode) => {
    setIsPlaying(false);
    setMode(newMode);
    
    if (newMode === "work") {
      setTime(settings.work);
    } else if (newMode === "shortBreak") {
      setTime(settings.shortBreak);
    } else {
      setTime(settings.longBreak);
    }
  };

  const saveSettings = () => {
    // Validate and convert inputs
    const workSecs = Math.max(1, parseInt(workMinutes) || 25) * 60;
    const shortBreakSecs = Math.max(1, parseInt(shortBreakMinutes) || 5) * 60;
    const longBreakSecs = Math.max(1, parseInt(longBreakMinutes) || 15) * 60;
    
    const newSettings = {
      ...tempSettings,
      work: workSecs,
      shortBreak: shortBreakSecs,
      longBreak: longBreakSecs
    };
    
    setSettings(newSettings);
    
    // Update current timer if needed
    if (mode === "work") {
      setTime(workSecs);
    } else if (mode === "shortBreak") {
      setTime(shortBreakSecs);
    } else {
      setTime(longBreakSecs);
    }
    
    setShowSettings(false);
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-6 shadow-lg text-white">
      {!showSettings ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              {formatTime(time)}
            </h2>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-full hover:bg-zinc-700 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          <div className="flex border-b border-zinc-700 mb-6">
            <button
              onClick={() => switchMode("work")}
              className={`py-2 px-4 ${mode === "work" ? "border-b-2 border-white font-medium" : "text-zinc-400"}`}
            >
              Pomodoro
            </button>
            <button
              onClick={() => switchMode("shortBreak")}
              className={`py-2 px-4 ${mode === "shortBreak" ? "border-b-2 border-white font-medium" : "text-zinc-400"}`}
            >
              Short Break
            </button>
            <button
              onClick={() => switchMode("longBreak")}
              className={`py-2 px-4 ${mode === "longBreak" ? "border-b-2 border-white font-medium" : "text-zinc-400"}`}
            >
              Long Break
            </button>
          </div>

          <div className="flex flex-col items-center">
            {/* Timer Circle */}
            <div className="relative w-48 h-48 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  className="stroke-current text-zinc-700"
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
                <span className="text-5xl font-bold">
                  {formatTime(time)}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex space-x-4">
              <button
                onClick={toggleTimer}
                className="px-8 py-2 rounded-full bg-white text-zinc-900 hover:bg-zinc-200 transition-colors font-medium"
              >
                {isPlaying ? "Pause" : "Start"}
              </button>
              <button
                onClick={resetTimer}
                className="p-2 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
            
            {!settings.hideCount && (
              <div className="mt-4 text-sm text-zinc-400">
                Session {sessions + 1}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="settings-panel">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Timer Settings</h2>
            <button
              onClick={() => setShowSettings(false)}
              className="p-2 rounded-full hover:bg-zinc-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-2">Pomodoro</label>
                <input
                  type="number"
                  min="1"
                  value={workMinutes}
                  onChange={(e) => setWorkMinutes(e.target.value)}
                  className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Short Break</label>
                <input
                  type="number"
                  min="1"
                  value={shortBreakMinutes}
                  onChange={(e) => setShortBreakMinutes(e.target.value)}
                  className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Long Break</label>
                <input
                  type="number"
                  min="1"
                  value={longBreakMinutes}
                  onChange={(e) => setLongBreakMinutes(e.target.value)}
                  className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm mb-2">Timer Sound</label>
              <select
                value={tempSettings.sound}
                onChange={(e) => setTempSettings({...tempSettings, sound: e.target.value as TimerSound})}
                className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded text-white"
              >
                <option value="none">None</option>
                <option value="bell">Bell</option>
                <option value="digital">Digital</option>
                <option value="twinkle">Twinkle</option>
                <option value="zen">Zen</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm mb-2">Volume</label>
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-zinc-400" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={tempSettings.volume}
                  onChange={(e) => setTempSettings({...tempSettings, volume: parseFloat(e.target.value)})}
                  className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="auto-transition"
                  checked={tempSettings.autoTransition}
                  onChange={(e) => setTempSettings({...tempSettings, autoTransition: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="auto-transition">Auto-transition Timer</label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hide-count"
                  checked={tempSettings.hideCount}
                  onChange={(e) => setTempSettings({...tempSettings, hideCount: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="hide-count">Hide Pomodoro Count</label>
              </div>
            </div>
            
            <button
              onClick={saveSettings}
              className="w-full py-3 bg-red-400 hover:bg-red-500 rounded-lg font-medium transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 
