import React from 'react';
import { useVideoEditor } from '@/context/VideoEditorContext';
import { formatDuration } from '@/utils/timestampService';
import { format } from 'date-fns';

const SegmentPreview: React.FC = () => {
  const { selectedFiles } = useVideoEditor();

  if (!selectedFiles.length) {
    return (
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="text-gray-400 text-center text-sm">
          Select video segments to see preview timeline
        </div>
      </div>
    );
  }

  const totalDuration = selectedFiles.reduce((total, file) => total + file.duration, 0);

  return (
    <div className="bg-gray-800 p-4 border-b border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-200">Selected Segments</h3>
        <div className="text-xs text-gray-400">
          {selectedFiles.length} segments • Total: {formatDuration(totalDuration)}
        </div>
      </div>
      
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {selectedFiles.map((file, index) => {
          const startTime = new Date(file.timestamp);
          const widthPercent = (file.duration / totalDuration) * 100;
          
          return (
            <div
              key={file.filename}
              className="flex-shrink-0 bg-blue-600/30 border border-blue-500/50 rounded px-3 py-2 min-w-[120px]"
              style={{ width: `${Math.max(widthPercent, 15)}%` }}
            >
              <div className="text-xs text-blue-200 font-medium mb-1">
                Segment {index + 1}
              </div>
              <div className="text-xs text-gray-300">
                {format(startTime, 'HH:mm:ss')}
              </div>
              <div className="text-xs text-gray-400">
                {formatDuration(file.duration)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SegmentPreview;