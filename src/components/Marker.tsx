import React from 'react';
import { X, Target, AlertTriangle, RotateCcw } from 'lucide-react';
import { Marker as MarkerType } from '@/context/VideoEditorContext';
import { formatDuration } from '@/utils/timestampService';

interface MarkerProps {
  marker: MarkerType;
  duration: number;
  onRemove: (id: string) => void;
}

const markerIcons = {
  goal: Target,
  foul: AlertTriangle,
  replay: RotateCcw
};

const markerColors = {
  goal: 'text-green-400 border-green-400',
  foul: 'text-red-400 border-red-400',
  replay: 'text-blue-400 border-blue-400'
};

const Marker: React.FC<MarkerProps> = ({ marker, duration, onRemove }) => {
  const Icon = markerIcons[marker.type];
  const leftPercent = (marker.time / duration) * 100;

  return (
    <div
      className="absolute top-0 transform -translate-x-1/2 group"
      style={{ left: `${leftPercent}%` }}
    >
      {/* Marker Icon */}
      <div className={`w-6 h-6 rounded-full border-2 bg-gray-900 flex items-center justify-center cursor-pointer ${markerColors[marker.type]}`}>
        <Icon className="w-3 h-3" />
      </div>
      
      {/* Vertical Line */}
      <div className={`w-0.5 h-16 ${marker.color} opacity-60`} />
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap border border-gray-600">
          <div className="font-medium">{marker.label}</div>
          <div className="text-gray-400">{formatDuration(marker.time)}</div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(marker.id);
            }}
            className="mt-1 text-red-400 hover:text-red-300 text-xs flex items-center"
          >
            <X className="w-3 h-3 mr-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marker;