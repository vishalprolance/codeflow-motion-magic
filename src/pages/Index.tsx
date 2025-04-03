
import VideoPlayer from "@/components/VideoPlayer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 techtheme-text-gradient">
            CodeFlow Motion Magic
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A dynamic video animation showcasing code snippets, logos and smooth text transitions with a modern tech theme.
          </p>
        </div>
        
        <VideoPlayer />
        
        <div className="mt-16 bg-black/20 p-6 rounded-xl max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-white">About This Project</h2>
          <p className="text-gray-300 mb-4">
            This project demonstrates the power of Remotion for creating dynamic videos with React. The video includes:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
            <li>Animated code typing with syntax highlighting</li>
            <li>Smooth text transitions with different animation styles</li>
            <li>Logo animations with spring physics</li>
            <li>Particle background effects</li>
            <li>Modern tech theme with gradient colors</li>
          </ul>
          <p className="text-gray-300">
            All animations are rendered in real-time using React components and the Remotion library.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
