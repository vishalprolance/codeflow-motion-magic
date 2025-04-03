
import { AbsoluteFill, Sequence, Audio } from 'remotion';
import { useEffect, useState } from 'react';
import AnimatedText from './AnimatedText';
import Logo from './Logo';
import TypedCode from './TypedCode';
import Particles from './Particles';

const codeExample = `function createAnimation(params) {
  const { duration, easing, delay } = params;
  
  return {
    animate: (element) => {
      element.style.transition = 
        \`transform \${duration}ms \${easing} \${delay}ms\`;
      element.style.transform = 'scale(1)';
    },
    
    // Support for advanced animations
    keyframes: (frames) => {
      // Implementation details
      console.log('Processing keyframes...');
      return frames.map(frame => ({
        ...frame,
        duration
      }));
    }
  };
}`;

const codeExample2 = `import { motion } from 'framer-motion';

const CodeFlowAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut"
      }}
    >
      <h1>Code Flow Animation</h1>
      <p>Bringing your code to life</p>
    </motion.div>
  );
};`;

const TechThemeVideo: React.FC<{ fps?: number; durationInFrames?: number }> = ({
  fps = 30,
  durationInFrames = 300,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <AbsoluteFill className="tech-gradient overflow-hidden">
      <Particles />
      
      {/* Scene 1: Logo Intro */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill className="flex items-center justify-center">
          <Logo />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Title Sequence */}
      <Sequence from={60} durationInFrames={90}>
        <AbsoluteFill className="flex flex-col items-center justify-center">
          <AnimatedText 
            text="CodeFlow Motion Magic" 
            className="text-5xl font-bold mb-6 techtheme-text-gradient"
            startFrame={60}
            type="scale"
          />
          <AnimatedText 
            text="Bringing Your Code to Life" 
            className="text-2xl text-white/80"
            startFrame={90}
            type="fade"
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Code Example 1 */}
      <Sequence from={120} durationInFrames={90}>
        <AbsoluteFill className="flex flex-col items-center justify-center">
          <div className="mb-8">
            <AnimatedText 
              text="Beautiful Animation Code" 
              className="text-2xl font-bold text-white mb-2"
              startFrame={120}
              type="slide"
            />
          </div>
          <TypedCode 
            codeString={codeExample} 
            startTypingFrame={130}
            typingSpeed={1}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Code Example 2 */}
      <Sequence from={210} durationInFrames={90}>
        <AbsoluteFill className="flex flex-col items-center justify-center">
          <div className="mb-8">
            <AnimatedText 
              text="React Animation Components" 
              className="text-2xl font-bold text-white mb-2"
              startFrame={210}
              type="slide"
            />
          </div>
          <TypedCode 
            codeString={codeExample2}
            language="jsx"
            startTypingFrame={220}
            typingSpeed={1}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

export default TechThemeVideo;
