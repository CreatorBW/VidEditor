import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Youtube, Twitter, Facebook, Instagram, Music } from 'lucide-react';

interface PlatformConfigPanelProps {
  platform: string;
  onBack: () => void;
}

const PlatformConfigPanel: React.FC<PlatformConfigPanelProps> = ({ platform, onBack }) => {
  const platformIcons = {
    youtube: Youtube,
    twitter: Twitter,
    facebook: Facebook,
    instagram: Instagram,
    tiktok: Music
  };

  const Icon = platformIcons[platform as keyof typeof platformIcons];

  const renderYouTubeConfig = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Video Title</Label>
        <Input id="title" placeholder="Enter video title" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          placeholder="Enter video description" 
          className="mt-1 min-h-[100px]" 
        />
      </div>
      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input id="tags" placeholder="gaming, highlights, sports" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gaming">Gaming</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="education">Education</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="privacy">Privacy</Label>
        <Select>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select privacy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="unlisted">Unlisted</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderTwitterConfig = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="tweet">Tweet Text</Label>
        <Textarea 
          id="tweet" 
          placeholder="What's happening?" 
          className="mt-1" 
          maxLength={280}
        />
        <p className="text-sm text-gray-400 mt-1">280 characters remaining</p>
      </div>
      <div>
        <Label htmlFor="hashtags">Hashtags</Label>
        <Input id="hashtags" placeholder="#gaming #highlights" className="mt-1" />
      </div>
    </div>
  );

  const renderInstagramConfig = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="caption">Caption</Label>
        <Textarea 
          id="caption" 
          placeholder="Write a caption..." 
          className="mt-1 min-h-[100px]" 
        />
      </div>
      <div>
        <Label htmlFor="hashtags">Hashtags</Label>
        <Input id="hashtags" placeholder="#gaming #highlights #fyp" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="location">Location (optional)</Label>
        <Input id="location" placeholder="Add location" className="mt-1" />
      </div>
    </div>
  );

  const renderFacebookConfig = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="caption">Post Caption</Label>
        <Textarea 
          id="caption" 
          placeholder="Share your thoughts..." 
          className="mt-1 min-h-[100px]" 
        />
      </div>
      <div>
        <Label htmlFor="audience">Audience</Label>
        <Select>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select audience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="friends">Friends</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderTikTokConfig = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="caption">Caption</Label>
        <Textarea 
          id="caption" 
          placeholder="Describe your video..." 
          className="mt-1" 
        />
      </div>
      <div>
        <Label htmlFor="hashtags">Hashtags</Label>
        <Input id="hashtags" placeholder="#fyp #viral #gaming" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="privacy">Who can view this video</Label>
        <Select>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select privacy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Everyone</SelectItem>
            <SelectItem value="friends">Friends</SelectItem>
            <SelectItem value="private">Only me</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderPlatformConfig = () => {
    switch (platform) {
      case 'youtube':
        return renderYouTubeConfig();
      case 'twitter':
        return renderTwitterConfig();
      case 'instagram':
        return renderInstagramConfig();
      case 'facebook':
        return renderFacebookConfig();
      case 'tiktok':
        return renderTikTokConfig();
      default:
        return <div>Platform configuration not available</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6" />
          <h3 className="text-lg font-semibold text-white capitalize">
            Configure {platform}
          </h3>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-white">Post Settings</CardTitle>
          <CardDescription>
            Configure how your video will appear on {platform}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderPlatformConfig()}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Cancel
        </Button>
        <Button className="flex-1 bg-primary hover:bg-primary/90">
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default PlatformConfigPanel;