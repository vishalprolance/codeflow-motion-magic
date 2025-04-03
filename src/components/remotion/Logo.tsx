
import React from 'react';
import { interpolate, useCurrentFrame, spring } from 'remotion';

const Logo: React.FC<{ size?: number }> = ({ size = 300 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const scale = spring({
    frame,
    from: 0,
    to: 1,
    fps: 30,
    config: {
      damping: 12,
      mass: 0.5,
    },
  });

  const rotation = interpolate(
    frame,
    [0, 60, 90],
    [0, 0, 360],
    {
      extrapolateRight: 'clamp',
    }
  );

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="w-24 h-24 mb-4 rounded-xl bg-gradient-to-br from-techTheme-vibrant-purple to-techTheme-bright-blue flex items-center justify-center">
          <div className="text-white font-bold text-4xl font-mono">C</div>
        </div>
        <div className="techtheme-text-gradient font-bold text-2xl">CodeFlow</div>
      </div>
    </div>
  );
};

export default Logo;
