import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface VideoFile {
  filename: string;
  timestamp: number;
  duration: number;
  selected: boolean;
}

export interface Marker {
  id: string;
  time: number;
  label: string;
  type: 'goal' | 'foul' | 'replay';
  color: string;
}

export interface SavedClip {
  id: string;
  title: string;
  inPoint: number;
  outPoint: number;
  selectedFiles: string[];
  createdAt: Date;
}

export interface OverlaySettings {
  logo: {
    enabled: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
  };
  watermark: {
    enabled: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface PlatformConnection {
  platform: 'youtube' | 'twitter' | 'facebook' | 'instagram' | 'tiktok';
  connected: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  accountInfo?: {
    id: string;
    name: string;
    profilePicture?: string;
  };
}

export interface PlatformConfig {
  platform: 'youtube' | 'twitter' | 'facebook' | 'instagram' | 'tiktok';
  enabled: boolean;
  settings: {
    title?: string;
    description?: string;
    tags?: string[];
    privacy?: 'public' | 'private' | 'unlisted';
    category?: string;
    thumbnail?: string;
    scheduledTime?: Date;
  };
}

export interface PublishJob {
  id: string;
  platform: 'youtube' | 'twitter' | 'facebook' | 'instagram' | 'tiktok';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  error?: string;
  publishedUrl?: string;
  createdAt: Date;
}

interface VideoEditorContextType {
  // Video state
  currentTime: number;
  setCurrentTime: (time: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  
  // Timeline state
  inPoint: number;
  setInPoint: (point: number) => void;
  outPoint: number;
  setOutPoint: (point: number) => void;
  
  // File management
  videoFiles: VideoFile[];
  setVideoFiles: (files: VideoFile[]) => void;
  selectedFiles: VideoFile[];
  
  // Markers
  markers: Marker[];
  setMarkers: (markers: Marker[]) => void;
  addMarker: (marker: Omit<Marker, 'id'>) => void;
  removeMarker: (id: string) => void;
  
  // Saved clips
  savedClips: SavedClip[];
  setSavedClips: (clips: SavedClip[]) => void;
  saveClip: (title: string) => void;
  deleteClip: (id: string) => void;
  
  // Overlays
  overlaySettings: OverlaySettings;
  setOverlaySettings: (settings: OverlaySettings) => void;
  
  // Export settings
  exportSettings: {
    aspectRatio: string;
    quality: string;
    format: string;
  };
  setExportSettings: (settings: any) => void;
  
  // Social publishing
  connectedPlatforms: PlatformConnection[];
  setConnectedPlatforms: React.Dispatch<React.SetStateAction<PlatformConnection[]>>;
  platformConfigs: PlatformConfig[];
  setPlatformConfigs: React.Dispatch<React.SetStateAction<PlatformConfig[]>>;
  publishingQueue: PublishJob[];
  setPublishingQueue: React.Dispatch<React.SetStateAction<PublishJob[]>>;
  addToPublishingQueue: (job: Omit<PublishJob, 'id' | 'createdAt'>) => void;
}

const VideoEditorContext = createContext<VideoEditorContextType | undefined>(undefined);

export const VideoEditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inPoint, setInPoint] = useState(10);
  const [outPoint, setOutPoint] = useState(90);
  
  const [videoFiles, setVideoFiles] = useState<VideoFile[]>([
    { filename: '1753880505000.ts', timestamp: 1753880505000, duration: 30, selected: true },
    { filename: '1753880535000.ts', timestamp: 1753880535000, duration: 25, selected: false },
    { filename: '1753880560000.ts', timestamp: 1753880560000, duration: 35, selected: true },
    { filename: '1753880595000.ts', timestamp: 1753880595000, duration: 30, selected: false },
  ]);
  
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [savedClips, setSavedClips] = useState<SavedClip[]>([]);
  
  const [overlaySettings, setOverlaySettings] = useState<OverlaySettings>({
    logo: { enabled: false, x: 20, y: 20, width: 100, height: 50 },
    watermark: { enabled: false, x: 20, y: 450, width: 120, height: 30 }
  });
  
  const [exportSettings, setExportSettings] = useState({
    aspectRatio: '16:9',
    quality: '1080p',
    format: 'MP4'
  });
  
  const [connectedPlatforms, setConnectedPlatforms] = useState<PlatformConnection[]>([
    { platform: 'youtube', connected: false },
    { platform: 'twitter', connected: false },
    { platform: 'facebook', connected: false },
    { platform: 'instagram', connected: false },
    { platform: 'tiktok', connected: false },
  ]);
  
  const [platformConfigs, setPlatformConfigs] = useState<PlatformConfig[]>([
    { platform: 'youtube', enabled: false, settings: { privacy: 'public' } },
    { platform: 'twitter', enabled: false, settings: { privacy: 'public' } },
    { platform: 'facebook', enabled: false, settings: { privacy: 'public' } },
    { platform: 'instagram', enabled: false, settings: { privacy: 'public' } },
    { platform: 'tiktok', enabled: false, settings: { privacy: 'public' } },
  ]);
  
  const [publishingQueue, setPublishingQueue] = useState<PublishJob[]>([]);

  const selectedFiles = videoFiles.filter(file => file.selected);

  const addMarker = (marker: Omit<Marker, 'id'>) => {
    const newMarker = { ...marker, id: Date.now().toString() };
    setMarkers(prev => [...prev, newMarker]);
  };

  const removeMarker = (id: string) => {
    setMarkers(prev => prev.filter(marker => marker.id !== id));
  };

  const saveClip = (title: string) => {
    const newClip: SavedClip = {
      id: Date.now().toString(),
      title,
      inPoint,
      outPoint,
      selectedFiles: selectedFiles.map(f => f.filename),
      createdAt: new Date()
    };
    setSavedClips(prev => [...prev, newClip]);
  };

  const deleteClip = (id: string) => {
    setSavedClips(prev => prev.filter(clip => clip.id !== id));
  };

  const addToPublishingQueue = (job: Omit<PublishJob, 'id' | 'createdAt'>) => {
    const newJob: PublishJob = {
      ...job,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setPublishingQueue(prev => [...prev, newJob]);
  };

  return (
    <VideoEditorContext.Provider value={{
      currentTime,
      setCurrentTime,
      duration,
      setDuration,
      isPlaying,
      setIsPlaying,
      inPoint,
      setInPoint,
      outPoint,
      setOutPoint,
      videoFiles,
      setVideoFiles,
      selectedFiles,
      markers,
      setMarkers,
      addMarker,
      removeMarker,
      savedClips,
      setSavedClips,
      saveClip,
      deleteClip,
      overlaySettings,
      setOverlaySettings,
      exportSettings,
      setExportSettings,
      connectedPlatforms,
      setConnectedPlatforms,
      platformConfigs,
      setPlatformConfigs,
      publishingQueue,
      setPublishingQueue,
      addToPublishingQueue
    }}>
      {children}
    </VideoEditorContext.Provider>
  );
};

export const useVideoEditor = () => {
  const context = useContext(VideoEditorContext);
  if (context === undefined) {
    throw new Error('useVideoEditor must be used within a VideoEditorProvider');
  }
  return context;
};