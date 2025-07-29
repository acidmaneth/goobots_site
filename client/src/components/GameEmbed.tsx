import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, Play, Pause } from "lucide-react";

interface GameEmbedProps {
  gameUrl: string;
  width?: number;
  height?: number;
}

export default function GameEmbed({ gameUrl, width = 480, height = 270 }: GameEmbedProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Use responsive sizing if width/height are 0
  const isResponsive = width === 0 && height === 0;

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      gameContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
    setIsPlaying(true);
  };

  // Handle game play/pause
  const togglePlayPause = () => {
    if (iframeRef.current) {
      // Send message to iframe to pause/resume game
      iframeRef.current.contentWindow?.postMessage(
        { type: isPlaying ? 'pause' : 'play' },
        '*'
      );
      setIsPlaying(!isPlaying);
    }
  };

  // Handle mobile touch events for fullscreen
  const handleTouchStart = (e: React.TouchEvent) => {
    // Don't prevent default - let touch events pass through to game
    // e.preventDefault();
  };

  return (
    <div className="relative">
      {/* Game Container */}
      <div 
        ref={gameContainerRef}
        className={`relative bg-black overflow-hidden ${
          isFullscreen ? 'game-embed-fullscreen' : 'game-embed-container'
        }`}
        style={isResponsive ? {
          position: isFullscreen ? 'fixed' : 'absolute',
          top: '0',
          left: '0',
          width: isFullscreen ? '100vw' : '100%',
          height: isFullscreen ? '100vh' : '100%',
          zIndex: isFullscreen ? '9999' : 'auto'
        } : { 
          width: isFullscreen ? '100vw' : `${width}px`, 
          height: isFullscreen ? '100vh' : `${height}px`,
          position: isFullscreen ? 'fixed' : 'relative',
          top: isFullscreen ? '0' : 'auto',
          left: isFullscreen ? '0' : 'auto',
          zIndex: isFullscreen ? '9999' : 'auto'
        }}
        onTouchStart={handleTouchStart}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="text-center text-game-green game-loading">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-game-green mx-auto mb-4"></div>
              <div className="text-sm font-medium">Loading Game...</div>
            </div>
          </div>
        )}

        {/* Game Iframe */}
        <iframe
          ref={iframeRef}
          src={gameUrl}
          className="game-iframe w-full h-full"
          allow="fullscreen; autoplay; encrypted-media"
          allowFullScreen
          onLoad={handleIframeLoad}
          style={{ 
            width: '100%',
            height: '100%',
            border: 'none',
            margin: 0,
            padding: 0,
            imageRendering: 'pixelated',
            background: '#000000'
          }}
        />

        {/* Control Overlay */}
        <div className="absolute top-2 right-2 flex gap-2 z-20 game-controls">
          <Button
            onClick={togglePlayPause}
            size="sm"
            variant="secondary"
            className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          
          <Button
            onClick={toggleFullscreen}
            size="sm"
            variant="secondary"
            className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>

        {/* Mobile Instructions */}
        <div className="absolute bottom-2 left-2 text-xs text-white opacity-75 z-20">
          <div className="bg-black bg-opacity-50 px-2 py-1 rounded">
            {isFullscreen ? 'Tap controls to exit fullscreen' : 'Tap to enter fullscreen'}
          </div>
        </div>
      </div>

      {/* Game Controls Info */}
      {!isFullscreen && !isResponsive && (
        <div className="mt-4 text-center text-sm text-white opacity-75">
          <p className="mb-2">
            <strong>Controls:</strong> Arrow keys to move, Spacebar to shoot
          </p>
          <p className="text-xs">
            Mobile: Touch controls are built into the game
          </p>
        </div>
      )}
    </div>
  );
}