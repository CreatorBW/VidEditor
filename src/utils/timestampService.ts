import { format } from 'date-fns';

export const formatTimestamp = (timestamp: number): string => {
  return format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss');
};

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const calculateTimeFromFiles = (files: any[], offsetSeconds: number): Date => {
  if (!files.length) return new Date();
  
  const firstFile = files[0];
  return new Date(firstFile.timestamp + (offsetSeconds * 1000));
};

export const getFormattedTimeRange = (
  selectedFiles: any[],
  inPoint: number,
  outPoint: number
): { startTime: string; endTime: string } => {
  if (!selectedFiles.length) {
    return { startTime: '—', endTime: '—' };
  }

  const startTime = calculateTimeFromFiles(selectedFiles, inPoint);
  const endTime = calculateTimeFromFiles(selectedFiles, outPoint);

  return {
    startTime: formatTimestamp(startTime.getTime()),
    endTime: formatTimestamp(endTime.getTime())
  };
};