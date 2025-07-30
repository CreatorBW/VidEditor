
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Target, AlertTriangle, RotateCcw } from "lucide-react";
import { useVideoEditor } from "@/context/VideoEditorContext";
import { formatDuration, getFormattedTimeRange } from "@/utils/timestampService";
import Marker from "./Marker";

const TrimTimeline = () => {
  const {
    currentTime,
    setCurrentTime,
    duration,
    inPoint,
    setInPoint,
    outPoint,
    setOutPoint,
    selectedFiles,
    markers,
    addMarker,
    removeMarker,
    saveClip
  } = useVideoEditor();
  
  const [showMarkerForm, setShowMarkerForm] = useState(false);
  const [newMarkerLabel, setNewMarkerLabel] = useState('');
  const [newMarkerType, setNewMarkerType] = useState<'goal' | 'foul' | 'replay'>('goal');
  const [clipTitle, setClipTitle] = useState('');

  const selectedDuration = outPoint - inPoint;
  const { startTime, endTime } = getFormattedTimeRange(selectedFiles, inPoint, outPoint);

  const handleAddMarker = () => {
    if (newMarkerLabel.trim()) {
      addMarker({
        time: currentTime,
        label: newMarkerLabel,
        type: newMarkerType,
        color: newMarkerType === 'goal' ? 'bg-green-500' : newMarkerType === 'foul' ? 'bg-red-500' : 'bg-blue-500'
      });
      setNewMarkerLabel('');
      setShowMarkerForm(false);
    }
  };

  const handleSaveClip = () => {
    if (clipTitle.trim()) {
      saveClip(clipTitle);
      setClipTitle('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-200">Timeline</h3>
        <div className="text-sm text-gray-400">
          Selected: {formatDuration(selectedDuration)} | Position: {formatDuration(currentTime)}
        </div>
      </div>

      {/* Timestamp Display */}
      <div className="grid grid-cols-2 gap-4 p-3 bg-gray-700 rounded-lg">
        <div>
          <label className="text-xs font-medium text-gray-300">Start Time</label>
          <div className="text-sm text-blue-200 font-mono">{startTime}</div>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-300">End Time</label>
          <div className="text-sm text-blue-200 font-mono">{endTime}</div>
        </div>
      </div>

      {/* Markers Bar */}
      <div className="relative h-12 mb-4 z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-300">Markers</div>
          <Button
            size="sm"
            onClick={() => setShowMarkerForm(!showMarkerForm)}
            className="text-xs h-6"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Marker
          </Button>
        </div>
        
        {showMarkerForm && (
          <div className="flex items-center space-x-2 mb-2 p-2 bg-gray-700 rounded z-20">
            <Input
              placeholder="Marker label"
              value={newMarkerLabel}
              onChange={(e) => setNewMarkerLabel(e.target.value)}
              className="flex-1 h-8 text-sm"
            />
            <select
              value={newMarkerType}
              onChange={(e) => setNewMarkerType(e.target.value as any)}
              className="h-8 px-2 bg-gray-600 text-white text-sm rounded"
            >
              <option value="goal">Goal</option>
              <option value="foul">Foul</option>
              <option value="replay">Replay</option>
            </select>
            <Button size="sm" onClick={handleAddMarker} className="h-8">
              Add
            </Button>
            <Button 
              size="sm" 
              disabled 
              className="h-8 opacity-50 cursor-not-allowed" 
              title="Coming soon"
            >
              Suggest Markers (AI)
            </Button>
          </div>
        )}
        
        <div className="relative h-6 bg-gray-600 rounded">
          {markers.map(marker => (
            <Marker
              key={marker.id}
              marker={marker}
              duration={duration}
              onRemove={removeMarker}
            />
          ))}
        </div>
      </div>

      {/* Waveform Placeholder */}
      <div className="h-20 bg-gray-700 rounded-lg relative overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 flex items-center justify-center">
          <div className="w-full h-full flex items-end justify-around px-2">
            {Array.from({ length: 60 }, (_, i) => (
              <div
                key={i}
                className="bg-blue-400/60 w-1 rounded-t cursor-pointer hover:bg-blue-300/80"
                style={{ height: `${Math.random() * 80 + 20}%` }}
                onClick={() => setCurrentTime((i / 60) * duration)}
              />
            ))}
          </div>
        </div>

        {/* Current Time Indicator */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
          style={{ left: `${(currentTime / duration) * 100}%` }}
        />

        {/* Selection Overlay */}
        <div
          className="absolute top-0 bottom-0 bg-yellow-400/20 border-l-2 border-r-2 border-yellow-400"
          style={{
            left: `${(inPoint / duration) * 100}%`,
            width: `${((outPoint - inPoint) / duration) * 100}%`,
          }}
        />
      </div>

      {/* IN Point Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-300">IN Point</label>
          <div className="text-right">
            <span className="text-sm text-gray-400">{formatDuration(inPoint)}</span>
            <div className="text-xs text-blue-200 font-mono">{startTime}</div>
          </div>
        </div>
        <Slider
          value={[inPoint]}
          onValueChange={(value) => setInPoint(value[0])}
          max={outPoint - 1}
          step={1}
          className="w-full"
        />
      </div>

      {/* OUT Point Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-300">OUT Point</label>
          <div className="text-right">
            <span className="text-sm text-gray-400">{formatDuration(outPoint)}</span>
            <div className="text-xs text-blue-200 font-mono">{endTime}</div>
          </div>
        </div>
        <Slider
          value={[outPoint]}
          onValueChange={(value) => setOutPoint(value[0])}
          min={inPoint + 1}
          max={duration}
          step={1}
          className="w-full"
        />
      </div>

      {/* Save Clip Section */}
      <div className="pt-4 border-t border-gray-600">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Enter clip title"
            value={clipTitle}
            onChange={(e) => setClipTitle(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={handleSaveClip}
            disabled={!clipTitle.trim()}
            className="bg-green-600 hover:bg-green-700"
          >
            Save Clip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrimTimeline;
