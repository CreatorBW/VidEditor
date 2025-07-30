import React, { useState } from 'react';
import { useVideoEditor } from '@/context/VideoEditorContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Edit3, Check, X } from 'lucide-react';
import { formatDuration } from '@/utils/timestampService';
import { format } from 'date-fns';

const SavedClipsList: React.FC = () => {
  const { savedClips, deleteClip } = useVideoEditor();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleEditStart = (clip: any) => {
    setEditingId(clip.id);
    setEditTitle(clip.title);
  };

  const handleEditSave = () => {
    // In a real implementation, you'd update the clip title
    setEditingId(null);
    setEditTitle('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditTitle('');
  };

  if (!savedClips.length) {
    return (
      <div className="bg-gray-800 p-4">
        <h3 className="text-lg font-medium text-gray-200 mb-4">Saved Clips</h3>
        <div className="text-center text-gray-400 py-8">
          No clips saved yet. Create clips using the timeline above.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4">
      <h3 className="text-lg font-medium text-gray-200 mb-4">
        Saved Clips ({savedClips.length})
      </h3>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {savedClips.map((clip) => {
          const duration = clip.outPoint - clip.inPoint;
          
          return (
            <div
              key={clip.id}
              className="bg-gray-700 rounded-lg p-3 border border-gray-600"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {editingId === clip.id ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="flex-1 h-8 text-sm"
                        placeholder="Clip title"
                      />
                      <Button
                        size="sm"
                        onClick={handleEditSave}
                        className="h-8 w-8 p-0"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleEditCancel}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-200 text-sm">
                        {clip.title}
                      </h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditStart(clip)}
                        className="h-6 w-6 p-0 text-gray-400 hover:text-gray-200"
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
                    <span>Duration: {formatDuration(duration)}</span>
                    <span>Files: {clip.selectedFiles.length}</span>
                    <span>Created: {format(clip.createdAt, 'MMM dd, HH:mm')}</span>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-1">
                    IN: {formatDuration(clip.inPoint)} • OUT: {formatDuration(clip.outPoint)}
                  </div>
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteClip(clip.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10 ml-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavedClipsList;