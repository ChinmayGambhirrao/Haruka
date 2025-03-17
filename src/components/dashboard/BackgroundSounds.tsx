"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, ChevronDown } from "lucide-react"

interface Sound {
  name: string
  url: string
  icon?: string
  category: string
}

const sounds: Sound[] = [
  // Lofi Music
  {
    name: "Lofi Study",
    url: "/sounds/lofi-study.mp3",
    icon: "🎵",
    category: "Lofi Music"
  },
  {
    name: "Chill Beats",
    url: "/sounds/chill-beats.mp3",
    icon: "🎧",
    category: "Lofi Music"
  },
  {
    name: "Jazz Hop",
    url: "/sounds/jazz-hop.mp3",
    icon: "🎷",
    category: "Lofi Music"
  },
  
  // Nature Sounds
  {
    name: "Rain",
    url: "/sounds/rain.mp3",
    icon: "🌧️",
    category: "Nature"
  },
  {
    name: "Forest",
    url: "/sounds/forest.mp3",
    icon: "🌳",
    category: "Nature"
  },
  {
    name: "Ocean Waves",
    url: "/sounds/ocean-waves.mp3",
    icon: "🌊",
    category: "Nature"
  },
  
  // Ambient
  {
    name: "Café",
    url: "/sounds/cafe.mp3",
    icon: "☕",
    category: "Ambient"
  },
  {
    name: "White Noise",
    url: "/sounds/white-noise.mp3",
    icon: "📻",
    category: "Ambient"
  },
  {
    name: "Keyboard Typing",
    url: "/sounds/keyboard.mp3",
    icon: "⌨️",
    category: "Ambient"
  }
]

export function BackgroundSounds() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSound, setCurrentSound] = useState<Sound>(sounds[0])
  const [volume, setVolume] = useState(0.5)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [filter, setFilter] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Group sounds by category
  const categories = Array.from(new Set(sounds.map(sound => sound.category)))
  
  const filteredSounds = filter 
    ? sounds.filter(sound => sound.category === filter)
    : sounds

  useEffect(() => {
    try {
      audioRef.current = new Audio(currentSound.url)
      audioRef.current.loop = true
      audioRef.current.volume = volume
      
      // Add error handling
      audioRef.current.onerror = (e) => {
        console.error("Audio error:", e);
        setError("Could not load audio. Please try another sound.");
        setIsPlaying(false);
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current = null
        }
      }
    } catch (err) {
      console.error("Error setting up audio:", err);
      setError("Could not set up audio player.");
    }
  }, [currentSound])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    setError(null); // Clear any previous errors
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause()
        } else {
          // Use a promise to handle play() which returns a promise
          const playPromise = audioRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                // Playback started successfully
              })
              .catch(err => {
                console.error("Playback failed:", err);
                setError("Could not play audio. Please try again or select another sound.");
                return;
              });
          }
        }
        setIsPlaying(!isPlaying)
      } catch (err) {
        console.error("Error playing audio:", err);
        setError("Could not play audio. Please try again.");
      }
    }
  }

  const changeSound = (sound: Sound) => {
    setError(null); // Clear any previous errors
    const wasPlaying = isPlaying
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setCurrentSound(sound)
    setIsMenuOpen(false)

    try {
      // Create new audio with the selected sound
      audioRef.current = new Audio(sound.url)
      audioRef.current.loop = true
      audioRef.current.volume = volume
      
      // Add error handling
      audioRef.current.onerror = (e) => {
        console.error("Audio error:", e);
        setError("Could not load audio. Please try another sound.");
        setIsPlaying(false);
      }

      if (wasPlaying) {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playback started successfully
            })
            .catch(err => {
              console.error("Playback failed:", err);
              setError("Could not play audio. Please try again or select another sound.");
              setIsPlaying(false);
            });
        }
      }
    } catch (err) {
      console.error("Error setting up new audio:", err);
      setError("Could not change sound. Please try again.");
      setIsPlaying(false);
    }
  }

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
        Background Sounds
      </h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md"
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
              className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-all duration-200"
            >
              <span>{currentSound.icon && `${currentSound.icon} `}{currentSound.name}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {isMenuOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 max-h-60 overflow-y-auto">
                {/* Category filters */}
                <div className="flex items-center space-x-2 p-2 border-b border-zinc-200 dark:border-zinc-700">
                  <button
                    onClick={() => setFilter(null)}
                    className={`px-2 py-1 rounded-md text-xs ${
                      filter === null 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
                    }`}
                  >
                    All
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setFilter(category)}
                      className={`px-2 py-1 rounded-md text-xs ${
                        filter === category 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                {/* Sound options */}
                {filteredSounds.map((sound) => (
                  <button
                    key={sound.name}
                    onClick={() => changeSound(sound)}
                    className={`w-full px-4 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white ${
                      currentSound.name === sound.name ? 'bg-zinc-100 dark:bg-zinc-700' : ''
                    }`}
                  >
                    {sound.icon && <span className="mr-2">{sound.icon}</span>}
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
            className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
        
        {/* Error message */}
        {error && (
          <div className="mt-2 p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg">
            {error}
          </div>
        )}
        
        {/* Now playing indicator */}
        {isPlaying && !error && (
          <div className="flex items-center justify-center mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex space-x-1 items-center">
              <span>Now playing:</span>
              <span className="font-medium text-blue-500">{currentSound.icon} {currentSound.name}</span>
              <div className="flex space-x-1 ml-2">
                <span className="w-1 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1 h-4 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></span>
                <span className="w-1 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 