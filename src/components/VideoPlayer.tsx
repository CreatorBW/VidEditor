
import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, Maximize, SkipBack, SkipForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useVideoEditor } from "@/context/VideoEditorContext";
import DraggableOverlay from "./DraggableOverlay";

const VideoPlayer = () => {
  const {
    currentTime,
    setCurrentTime,
    duration,
    isPlaying,
    setIsPlaying,
    overlaySettings,
    setOverlaySettings
  } = useVideoEditor();
  const [volume, setVolume] = React.useState([80]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOverlayMove = (type: 'logo' | 'watermark', x: number, y: number) => {
    setOverlaySettings({
      ...overlaySettings,
      [type]: { ...overlaySettings[type], x, y }
    });
  };

  const handleOverlayResize = (type: 'logo' | 'watermark', width: number, height: number) => {
    setOverlaySettings({
      ...overlaySettings,
      [type]: { ...overlaySettings[type], width, height }
    });
  };

  return (
    <div className="relative bg-black aspect-video max-h-[60vh]">
      {/* Video Display Area */}
      <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
        <div className="text-gray-400 text-lg">Video Preview Area</div>
        
        {/* Overlays */}
        {overlaySettings.logo.enabled && (
          <DraggableOverlay
            type="logo"
            x={overlaySettings.logo.x}
            y={overlaySettings.logo.y}
            width={overlaySettings.logo.width}
            height={overlaySettings.logo.height}
            onMove={(x, y) => handleOverlayMove('logo', x, y)}
            onResize={(w, h) => handleOverlayResize('logo', w, h)}
          />
        )}
        
        {overlaySettings.watermark.enabled && (
          <DraggableOverlay
            type="watermark"
            x={overlaySettings.watermark.x}
            y={overlaySettings.watermark.y}
            width={overlaySettings.watermark.width}
            height={overlaySettings.watermark.height}
            onMove={(x, y) => handleOverlayMove('watermark', x, y)}
            onResize={(w, h) => handleOverlayResize('watermark', w, h)}
          />
        )}
      </div>

      {/* Video Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <Slider
            value={[currentTime]}
            onValueChange={(value) => setCurrentTime(value[0])}
            max={duration}
            step={1}
            className="w-full"
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
              className="text-white hover:bg-white/20"
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentTime(Math.min(duration, currentTime + 10))}
              className="text-white hover:bg-white/20"
            >
              <SkipForward className="h-4 w-4" />
            </Button>

            <div className="text-sm text-gray-300 ml-4">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4 text-gray-300" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-20"
            />
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
