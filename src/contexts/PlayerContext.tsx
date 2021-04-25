import { isSunday } from 'date-fns'
import { createContext, useState, ReactNode, useContext } from 'react'

type Episode = {
    title: string; 
    members: string;
    thumbnail: string; 
    duration: number;
    url: string; 
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number; 
    isPlaying: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void; 
    playList: (list: Episode[], index: number) => void;
    playNext: () => void; 
    playPrevious: () => void; 
    toggleLoop: () => void; 
    setPlayingState: (state: boolean) => void; 
    togglePlay: () => void;  
    toggleShuffle: () => void; 
    clearPlayerState: () => void; 
}

// Valor definirá o formato dos dados que serão salvos. Neste caso, string. O contexto nos permite compartilhar
// dados de forma global entre nossos componentes.
export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
    children: ReactNode; // Quando as children do elemento podem ser de qualquer tipo (JSX, texto, etc.)
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  function play(episode: Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function toggleLoop() {
    setIsLooping(!isLooping)
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  function clearPlayerState() {
    setEpisodeList([])
    setCurrentEpisodeIndex(0) 
  }

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  return(
    <PlayerContext.Provider value={{ 
        episodeList, 
        currentEpisodeIndex, 
        play, 
        isPlaying, 
        playList, 
        playNext,
        playPrevious, 
        togglePlay,
        toggleLoop, 
        isLooping,  
        isShuffling, 
        toggleShuffle, 
        hasNext,
        hasPrevious,
        setPlayingState,
        clearPlayerState, 
        }}
    >
        { children }
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext)
}