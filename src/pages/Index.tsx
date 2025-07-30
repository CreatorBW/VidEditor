
import VideoPlayer from "../components/VideoPlayer";
import TrimTimeline from "../components/TrimTimeline";
import FileSidebar from "../components/FileSidebar";
import ExportPanel from "../components/ExportPanel";
import SegmentPreview from "../components/SegmentPreview";
import SavedClipsList from "../components/SavedClipsList";
import ExportSummary from "../components/ExportSummary";
import ProcessDownloadButton from "../components/ProcessDownloadButton";
import { VideoEditorProvider } from "../context/VideoEditorContext";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Index = () => {
  return (
    <VideoEditorProvider>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 p-4">
          <h1 className="text-xl font-semibold text-gray-100">TrimForge Video Editor</h1>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Left Sidebar */}
          <div className="w-80 bg-gray-800 border-r border-gray-700">
            <FileSidebar />
          </div>

          {/* Center Content */}
          <div className="flex-1 flex flex-col">
            {/* Video Player */}
            <div className="bg-black border-b border-gray-700">
              <VideoPlayer />
            </div>

            {/* Segment Preview */}
            <SegmentPreview />

            {/* Timeline */}
            <div className="bg-gray-800 border-b border-gray-700 p-4">
              <TrimTimeline />
            </div>

            {/* Export Summary & Process Button */}
            <div className="bg-gray-900 p-6">
              <ExportSummary />
              <ProcessDownloadButton />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="flex-1">
              <ExportPanel />
            </div>
            <div className="flex-1 border-t border-gray-700">
              <SavedClipsList />
            </div>
          </div>
        </div>
      </div>
    </VideoEditorProvider>
  );
};

export default Index;
