import React, { useState, useRef } from 'react';
import { Image, Type } from 'lucide-react';

interface DraggableOverlayProps {
  type: 'logo' | 'watermark';
  x: number;
  y: number;
  width: number;
  height: number;
  onMove: (x: number, y: number) => void;
  onResize: (width: number, height: number) => void;
}

const DraggableOverlay: React.FC<DraggableOverlayProps> = ({
  type,
  x,
  y,
  width,
  height,
  onMove,
  onResize
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    
    const rect = overlayRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !overlayRef.current) return;

    const container = overlayRef.current.parentElement;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - dragOffset.x;
    const newY = e.clientY - containerRect.top - dragOffset.y;

    // Constrain to container bounds
    const constrainedX = Math.max(0, Math.min(newX, containerRect.width - width));
    const constrainedY = Math.max(0, Math.min(newY, containerRect.height - height));

    onMove(constrainedX, constrainedY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={overlayRef}
      className={`absolute cursor-move border-2 border-dashed ${
        type === 'logo' ? 'border-blue-400' : 'border-yellow-400'
      } bg-white/10 backdrop-blur-sm rounded flex items-center justify-center text-white text-xs font-medium select-none`}
      style={{
        left: x,
        top: y,
        width,
        height
      }}
      onMouseDown={handleMouseDown}
    >
      {type === 'logo' ? (
        <>
          <Image className="w-4 h-4 mr-1" />
          LOGO
        </>
      ) : (
        <>
          <Type className="w-4 h-4 mr-1" />
          WATERMARK
        </>
      )}
    </div>
  );
};

export default DraggableOverlay;