
import { useCurrentFrame, interpolate, spring } from 'remotion';

interface AnimatedTextProps {
  text: string;
  startFrame?: number;
  className?: string;
  charDelay?: number;
  type?: 'fade' | 'slide' | 'scale';
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  startFrame = 0,
  className = "",
  charDelay = 3,
  type = 'fade'
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - startFrame);

  return (
    <div className={`flex ${className}`}>
      {text.split('').map((char, i) => {
        const charFrame = adjustedFrame - i * charDelay;
        
        let opacity = 0;
        let transform = '';
        
        if (type === 'fade') {
          opacity = interpolate(charFrame, [0, 20], [0, 1], {
            extrapolateRight: 'clamp',
          });
          transform = `translateY(${interpolate(charFrame, [0, 20], [20, 0], {
            extrapolateRight: 'clamp',
          })}px)`;
        } else if (type === 'slide') {
          opacity = interpolate(charFrame, [0, 20], [0, 1], {
            extrapolateRight: 'clamp',
          });
          transform = `translateX(${interpolate(charFrame, [0, 20], [20, 0], {
            extrapolateRight: 'clamp',
          })}px)`;
        } else if (type === 'scale') {
          opacity = interpolate(charFrame, [0, 20], [0, 1], {
            extrapolateRight: 'clamp',
          });
          const scale = spring({
            frame: charFrame,
            from: 0.5,
            to: 1,
            fps: 30,
            config: { damping: 12 },
          });
          transform = `scale(${scale})`;
        }

        // Add a small rotation effect for additional visual interest
        const rotation = spring({
          frame: charFrame,
          from: -10,
          to: 0,
          fps: 30,
          config: { damping: 20 },
        });

        return (
          <span 
            key={i}
            style={{
              opacity,
              transform: `${transform} rotate(${rotation}deg)`,
              display: 'inline-block',
            }}
            className="origin-bottom"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </div>
  );
};

export default AnimatedText;
