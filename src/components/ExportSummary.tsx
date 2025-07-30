import React from 'react';
import { useVideoEditor } from '@/context/VideoEditorContext';
import { formatDuration } from '@/utils/timestampService';

const ExportSummary: React.FC = () => {
  const { inPoint, outPoint, exportSettings, overlaySettings } = useVideoEditor();
  
  const clipDuration = outPoint - inPoint;
  
  const getOverlaysText = () => {
    const overlays = [];
    if (overlaySettings.logo.enabled) overlays.push('Logo');
    if (overlaySettings.watermark.enabled) overlays.push('Watermark');
    return overlays.length > 0 ? overlays.join(', ') : 'None';
  };

  return (
    <div className="space-y-4">
      {/* Selected Duration */}
      <div className="text-center">
        <div className="text-lg font-medium text-gray-200 flex items-center justify-center">
          ⏱ Selected Duration: <span className="ml-2 text-blue-200">{formatDuration(clipDuration)}</span>
        </div>
      </div>
      
      {/* Export Summary */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-200 mb-2">Export Summary</h3>
        <div className="text-sm text-gray-300">
          <span className="font-medium">Clip:</span> {formatDuration(clipDuration)} | 
          <span className="font-medium"> Format:</span> {exportSettings.format} | 
          <span className="font-medium"> Aspect:</span> {exportSettings.aspectRatio} | 
          <span className="font-medium"> Quality:</span> {exportSettings.quality} | 
          <span className="font-medium"> Overlays:</span> {getOverlaysText()}
        </div>
      </div>
    </div>
  );
};

export default ExportSummary;