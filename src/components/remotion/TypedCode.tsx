
import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface TypedCodeProps {
  codeString: string;
  language?: string;
  startTypingFrame?: number;
  typingSpeed?: number;
}

const TypedCode: React.FC<TypedCodeProps> = ({
  codeString,
  language = 'javascript',
  startTypingFrame = 0,
  typingSpeed = 0.5,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - startTypingFrame);
  
  // Calculate how many characters to show
  const charactersToShow = Math.floor(adjustedFrame * typingSpeed);
  const visibleCode = codeString.slice(0, charactersToShow);
  
  // Calculate container opacity and scale
  const containerOpacity = interpolate(
    adjustedFrame,
    [0, 10],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );
  
  const containerScale = spring({
    frame: adjustedFrame,
    from: 0.95,
    to: 1,
    fps: 30,
    config: {
      damping: 15,
    },
  });

  // Calculate if we should show the cursor
  const cursorVisible = charactersToShow < codeString.length;
  
  return (
    <div
      style={{
        opacity: containerOpacity,
        transform: `scale(${containerScale})`,
      }}
      className="w-full max-w-2xl bg-[#282c34] rounded-lg p-4 shadow-xl"
    >
      <div className="flex items-center mb-2">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="w-full">
        <SyntaxHighlighter
          language={language}
          style={atomOneDark}
          className="rounded-md"
          wrapLines={true}
          customStyle={{
            backgroundColor: 'transparent',
            padding: '1rem',
            margin: 0,
            overflow: 'hidden',
          }}
        >
          {visibleCode}
        </SyntaxHighlighter>
        {cursorVisible && (
          <div className="typing-cursor" style={{ height: 0, marginTop: '-1.5em', marginLeft: `${visibleCode.length * 0.6}ch` }}></div>
        )}
      </div>
    </div>
  );
};

export default TypedCode;
