import React, { useState } from "react";
import { ChevronDown, ChevronUp, Settings, Image, Type, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVideoEditor } from "@/context/VideoEditorContext";

const ExportPanel = () => {
  const { overlaySettings, setOverlaySettings, exportSettings, setExportSettings } = useVideoEditor();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-full flex flex-col">
      {/* Panel Header */}
      <div className="p-4 border-b border-gray-700">
        <Button
          variant="ghost"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full justify-between text-gray-200 hover:bg-gray-700"
        >
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span className="font-semibold">Export Settings</span>
          </div>
          {isCollapsed ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Panel Content */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Aspect Ratio */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-200">Aspect Ratio</Label>
            <Select 
              value={exportSettings.aspectRatio} 
              onValueChange={(value) => setExportSettings({...exportSettings, aspectRatio: value})}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue placeholder="Select aspect ratio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                <SelectItem value="1:1">1:1 (Square)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Overlays */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-200">Overlays</Label>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Switch
                  checked={overlaySettings.logo.enabled}
                  onCheckedChange={(checked) => 
                    setOverlaySettings({
                      ...overlaySettings,
                      logo: { ...overlaySettings.logo, enabled: checked }
                    })
                  }
                />
                <Label htmlFor="logo-toggle" className="text-gray-300">Add Logo</Label>
              </div>

              <div className="flex items-center justify-between">
                <Switch
                  checked={overlaySettings.watermark.enabled}
                  onCheckedChange={(checked) => 
                    setOverlaySettings({
                      ...overlaySettings,
                      watermark: { ...overlaySettings.watermark, enabled: checked }
                    })
                  }
                />
                <Label htmlFor="watermark-toggle" className="text-gray-300">Add Watermark</Label>
              </div>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-200">Thumbnail</Label>
            <Button
              variant="outline"
              className="w-full bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
            >
              <FileImage className="mr-2 h-4 w-4" />
              Set Thumbnail
            </Button>
          </div>

          {/* Quality Settings */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-200">Quality Settings</Label>
            <Select 
              value={exportSettings.quality} 
              onValueChange={(value) => setExportSettings({...exportSettings, quality: value})}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="720p">720p HD</SelectItem>
                <SelectItem value="1080p">1080p Full HD</SelectItem>
                <SelectItem value="4k">4K Ultra HD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportPanel;