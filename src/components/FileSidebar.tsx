import React, { useState } from "react";
import { Search, FileVideo, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useVideoEditor } from "@/context/VideoEditorContext";
import { formatDuration } from "@/utils/timestampService";
import { format } from "date-fns";

const FileSidebar = () => {
  const { videoFiles, setVideoFiles } = useVideoEditor();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFiles = videoFiles.filter(file =>
    file.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileToggle = (filename: string) => {
    setVideoFiles(videoFiles.map(file =>
      file.filename === filename
        ? { ...file, selected: !file.selected }
        : file
    ));
  };

  const selectedCount = videoFiles.filter(f => f.selected).length;

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-200">Video Segments</h3>
          <span className="text-sm text-gray-400">
            {selectedCount}/{videoFiles.length} selected
          </span>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search segments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
          />
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {filteredFiles.map((file) => {
            const startTime = new Date(file.timestamp);
            const fileSizeMB = (file.duration * 0.18).toFixed(1); // Rough estimate
            
            return (
              <div
                key={file.filename}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  file.selected
                    ? "bg-blue-600/20 border-blue-500/50"
                    : "bg-gray-700 border-gray-600 hover:border-gray-500"
                }`}
                onClick={() => handleFileToggle(file.filename)}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={file.selected}
                    onCheckedChange={() => handleFileToggle(file.filename)}
                  />
                  <FileVideo className="h-4 w-4 text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-200 truncate">
                      {file.filename}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      {format(startTime, 'MMM dd, HH:mm:ss')}
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatDuration(file.duration)}</span>
                      </div>
                      <span>{fileSizeMB} MB</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FileSidebar;