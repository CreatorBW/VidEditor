import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Loader2, Share2 } from 'lucide-react';
import SocialPublishingPanel from './SocialPublishingPanel';

const ProcessDownloadButton: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async () => {
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="download" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="download" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download
          </TabsTrigger>
          <TabsTrigger value="publish" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Publish to Social
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="download" className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Download Video</h3>
            <p className="text-gray-400 mb-6">Process and download your edited video clip</p>
            <Button 
              size="lg" 
              onClick={handleProcess}
              disabled={isProcessing}
              className="bg-primary hover:bg-primary/90 px-8 py-3 text-lg font-medium"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  Process & Download
                </>
              )}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="publish" className="space-y-4">
          <SocialPublishingPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProcessDownloadButton;