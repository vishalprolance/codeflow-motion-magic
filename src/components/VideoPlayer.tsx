
import { useState, useEffect } from 'react';
import { Player } from '@remotion/player';
import { Button } from "@/components/ui/button";
import TechThemeVideo from './remotion/TechThemeVideo';

const VIDEO_CONFIG = {
  fps: 30,
  durationInFrames: 300, // 10 seconds @ 30fps
  width: 1280,
  height: 720
};

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex justify-center items-center h-96 bg-gray-100 rounded-lg">
        Loading video player...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-5xl mx-auto">
      <div className="relative rounded-xl overflow-hidden shadow-2xl">
        <Player
          component={TechThemeVideo}
          durationInFrames={VIDEO_CONFIG.durationInFrames}
          fps={VIDEO_CONFIG.fps}
          compositionWidth={VIDEO_CONFIG.width}
          compositionHeight={VIDEO_CONFIG.height}
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: `${VIDEO_CONFIG.width} / ${VIDEO_CONFIG.height}`,
          }}
          controls
          autoPlay={isPlaying}
          loop
        />
      </div>
      <div className="flex justify-center gap-4">
        <Button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-techTheme-vibrant-purple hover:bg-techTheme-vibrant-purple/80"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const player = document.querySelector('video');
            if (player) {
              player.currentTime = 0;
              setIsPlaying(true);
            }
          }}
        >
          Restart
        </Button>
      </div>
    </div>
  );
};

export default VideoPlayer;
