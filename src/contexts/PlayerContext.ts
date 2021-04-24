import { createContext } from 'react'

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
    play: (episode: Episode) => void; 
    setPlayingState: (state: boolean) => void; 
    togglePlay: () => void;  
}

// Valor definirá o formato dos dados que serão salvos. Neste caso, string
export const PlayerContext = createContext({} as PlayerContextData)