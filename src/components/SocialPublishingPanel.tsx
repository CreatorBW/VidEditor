import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useVideoEditor, type PlatformConnection } from '@/context/VideoEditorContext';
import { Settings, Youtube, Twitter, Facebook, Instagram, Music } from 'lucide-react';
import PlatformConfigPanel from './PlatformConfigPanel';

const SocialPublishingPanel: React.FC = () => {
  const { 
    connectedPlatforms, 
    setConnectedPlatforms, 
    platformConfigs, 
    setPlatformConfigs,
    addToPublishingQueue 
  } = useVideoEditor();
  
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [currentConfigPlatform, setCurrentConfigPlatform] = useState<string | null>(null);

  const platformIcons = {
    youtube: Youtube,
    twitter: Twitter,
    facebook: Facebook,
    instagram: Instagram,
    tiktok: Music
  };

  const platformColors = {
    youtube: 'bg-red-600',
    twitter: 'bg-blue-500',
    facebook: 'bg-blue-700',
    instagram: 'bg-gradient-to-r from-purple-600 to-pink-600',
    tiktok: 'bg-black'
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const connectPlatform = (platform: string) => {
    // Simulate OAuth connection
    setConnectedPlatforms(prev => 
      prev.map(p => 
        p.platform === platform 
          ? { ...p, connected: true, accountInfo: { id: '123', name: `${platform} Account` } }
          : p
      )
    );
  };

  const handlePublish = async () => {
    selectedPlatforms.forEach(platform => {
      addToPublishingQueue({
        platform: platform as any,
        status: 'pending',
        progress: 0
      });
    });
  };

  if (currentConfigPlatform) {
    return (
      <PlatformConfigPanel 
        platform={currentConfigPlatform}
        onBack={() => setCurrentConfigPlatform(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">Publish to Social Media</h3>
        <p className="text-gray-400 mb-6">Share your video across multiple platforms</p>
      </div>

      {/* Platform Selection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {connectedPlatforms.map((platform) => {
          const Icon = platformIcons[platform.platform];
          const isSelected = selectedPlatforms.includes(platform.platform);
          
          return (
            <Card 
              key={platform.platform}
              className={`cursor-pointer transition-all border-2 ${
                isSelected 
                  ? 'border-primary bg-primary/10' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => togglePlatform(platform.platform)}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-full ${platformColors[platform.platform]} flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-medium text-white capitalize mb-2">{platform.platform}</h4>
                
                {platform.connected ? (
                  <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/30">
                    Connected
                  </Badge>
                ) : (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      connectPlatform(platform.platform);
                    }}
                    className="text-xs"
                  >
                    Connect
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Selected Platforms Configuration */}
      {selectedPlatforms.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configure Selected Platforms
            </CardTitle>
            <CardDescription>
              Set up posting details for your selected platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedPlatforms.map(platform => (
              <div key={platform} className="flex items-center justify-between p-3 border border-gray-700 rounded">
                <div className="flex items-center gap-3">
                  {React.createElement(platformIcons[platform as keyof typeof platformIcons], { 
                    className: "h-5 w-5" 
                  })}
                  <span className="font-medium text-white capitalize">{platform}</span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setCurrentConfigPlatform(platform)}
                >
                  Configure
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Publish Button */}
      {selectedPlatforms.length > 0 && (
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handlePublish}
            className="bg-primary hover:bg-primary/90 px-8 py-3 text-lg font-medium"
          >
            Publish to {selectedPlatforms.length} Platform{selectedPlatforms.length > 1 ? 's' : ''}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SocialPublishingPanel;