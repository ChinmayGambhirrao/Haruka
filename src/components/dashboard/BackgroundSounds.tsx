"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, ChevronDown } from "lucide-react"

interface Sound {
  name: string
  url: string
}

const sounds: Sound[] = [
  {
    name: "Café",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_2dde668d05.mp3",
  },
  {
    name: "Rain",
    url: "https://cdn.pixabay.com/download/audio/2021/10/25/audio_e2f365c960.mp3",
  },
  {
    name: "White Noise",
    url: "https://cdn.pixabay.com/download/audio/2021/08/09/audio_dc39bde808.mp3",
  },
  {
    name: "Forest",
    url: "https://cdn.pixabay.com/download/audio/2021/10/25/audio_c4d2800b44.mp3",
  },
]

export function BackgroundSounds() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSound, setCurrentSound] = useState<Sound>(sounds[0])
  const [volume, setVolume] = useState(0.5)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio(currentSound.url)
    audioRef.current.loop = true
    audioRef.current.volume = volume

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [currentSound])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const changeSound = (sound: Sound) => {
    const wasPlaying = isPlaying
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setCurrentSound(sound)
    setIsMenuOpen(false)

    // Create new audio with the selected sound
    audioRef.current = new Audio(sound.url)
    audioRef.current.loop = true
    audioRef.current.volume = volume

    if (wasPlaying) {
      audioRef.current.play()
    }
  }

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
        Background Sounds
      </h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600"
          >
            {isPlaying ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          <div className="relative flex-1">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600"
            >
              <span>{currentSound.name}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {isMenuOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700">
                {sounds.map((sound) => (
                  <button
                    key={sound.name}
                    onClick={() => changeSound(sound)}
                    className="w-full px-4 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white first:rounded-t-lg last:rounded-b-lg"
                  >
                    {sound.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Volume Slider */}
        <div className="flex items-center space-x-2">
          <Volume2 className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
} 