import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import logoPath from "@assets/AOTGLogo_1753405413377.png";
import framePath from "@assets/game_frame.png";
import GameEmbed from "@/components/GameEmbed";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is Attack of the Goobots?",
    answer: "Attack of the Goobots is an action-packed, scrolling-shooter, adventure game featuring the Mooncats from the collection of ACIDMAN. The game focuses on building around the Mooncats collection, its lore, and Web3 Culture."
  },
  {
    question: "What is the story about?",
    answer: "The year was 1BM (Before Merge)... Mooncats #18074 and #18549, cats from the same litter, are making their way to Earth. As they leave their lunar location, a vicious attack on their convoy initiates. Goobots - the gross, rusty, and full of fud aliens from the depths of the Ether - intercepts the Mooncats in the middle of their journey. 'Go, now!' said Mooncat-18074, as his brother watched him fight off the enemy. Years after The Merge, they will be seeing each other again..."
  },
  {
    question: "How do I play the demo? Is it Free to Play?",
    answer: "Simply click the \"Start Game Demo\" button above to begin playing! The demo runs directly in your browser - no downloads required, and is totally free to play! Enable the Touch controls in the MainMenu and go fullscreen for mobile (currently buggy) or use WASD and spacebar on desktop."
  },
  {
    question: "When will the full game be available?",
    answer: "TBD. The full version of Attack of the Goobots is a solo-project by ACIDMAN (hopefully, just for now), so please bear with slow development. Follow us on social media for the latest updates and release announcements!"
  },
  {
    question: "What platforms will the game support?",
    answer: "The Single-Player Attack of the Goobots is planned for mobile and console versions. The game is currently playable on web-browsers to explore options for Web3-gaming playable on any device."
  },
  {
    question: "Can I provide feedback on the demo? How can I get in touch?",
    answer: "Absolutely! We welcome all feedback and suggestions. You can reach out to us through our social media channels or email at aotgoobots@gmail.com. Your input helps make the game better!"
  }
];

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Track fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const startGame = () => {
    console.log('Starting game...');
    setShowGame(true);
    
    // Add a small delay to ensure the iframe loads properly
    setTimeout(() => {
      const iframe = document.querySelector('iframe');
      const gameContainer = document.getElementById('game-container');
      const frameOverlay = document.querySelector('.frame-overlay');
      
      console.log('=== DEBUG INFO ===');
      console.log('Iframe found:', iframe);
      console.log('Iframe src:', iframe?.src);
      console.log('Iframe dimensions:', iframe?.offsetWidth, 'x', iframe?.offsetHeight);
      console.log('Game container:', gameContainer);
      console.log('Frame overlay:', frameOverlay);
      console.log('Show game state:', showGame);
      
      // Check for multiple iframes
      const allIframes = document.querySelectorAll('iframe');
      console.log('Total iframes found:', allIframes.length);
      
      // Check for placeholder elements
      const placeholders = document.querySelectorAll('.text-game-green');
      console.log('Placeholder elements found:', placeholders.length);
      
      console.log('=== END DEBUG ===');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-game-orange text-white">
      {/* Header */}
      <header className="container mx-auto px-4 pt-8 pb-4 text-center">
        <div className="mb-0">
          <img 
            src={logoPath} 
            alt="Attack of the Goobots Logo" 
            className="mx-auto w-64 h-auto logo-glow hover:scale-105 transition-transform duration-300"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8 pt-3" style={{ fontFamily: '"Courier New", "Monaco", "Menlo", "Consolas", monospace', fontWeight: 'bold', letterSpacing: '1px', imageRendering: 'pixelated' }}>
          A Mooncat Rescue Story
        </p>
      </header>

      {/* Game Demo */}
      <main className="container mx-auto px-4 py-4" style={{ marginTop: '3rem' }}>
        <div className="flex justify-center mb-8">
          {showGame ? (
            <div className="relative w-full max-w-4xl game-active">
              {/* Frame Image overlay - COMPLETELY OUTSIDE game container */}
              <img 
                src={framePath} 
                alt="Game Frame" 
                className="absolute pointer-events-none frame-overlay"
                style={{ 
                  imageRendering: 'pixelated',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transform: 'scale(2.0)',
                  transformOrigin: 'center',
                  zIndex: 2,
                  pointerEvents: 'none',
                  top: '0',
                  left: '0'
                }}
              />
              
              {/* Game container with direct iframe - FORCED 16:9 aspect ratio */}
              <div className="relative w-full" id="game-container" style={{ aspectRatio: '16/9', transform: 'translateY(-4%)' }}>
                <iframe
                  src="/game/index.html"
                  className="w-full h-full absolute inset-0"
                  allow="fullscreen; autoplay; encrypted-media; microphone; camera"
                  allowFullScreen
                  style={{ 
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    margin: 0,
                    padding: 0,
                    imageRendering: 'pixelated',
                    background: '#000000',
                    display: 'block',
                    zIndex: 1
                  }}
                  onLoad={() => {
                    console.log('Game iframe loaded successfully');
                    console.log('Iframe dimensions:', document.querySelector('iframe')?.offsetWidth, 'x', document.querySelector('iframe')?.offsetHeight);
                  }}
                  onError={(e) => {
                    console.error('Game iframe error:', e);
                    console.error('Iframe src:', document.querySelector('iframe')?.src);
                  }}
                />
                
                {/* Fullscreen Button */}
                <button
                  onClick={() => {
                    const gameContainer = document.getElementById('game-container');
                    if (gameContainer) {
                      if (document.fullscreenElement) {
                        document.exitFullscreen();
                      } else {
                        gameContainer.requestFullscreen();
                      }
                    }
                  }}
                  className="absolute bottom-2 right-2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded transition-all duration-200 z-10 group"
                  title="Toggle Fullscreen"
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transition-transform duration-200 group-hover:scale-110"
                  >
                    {isFullscreen ? (
                      // Exit fullscreen icon
                      <>
                        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
                      </>
                    ) : (
                      // Enter fullscreen icon
                      <>
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 1 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative w-full max-w-4xl">
              {/* Game placeholder */}
                          <div className="relative w-full" style={{ aspectRatio: '16/9', transform: 'translateY(-4%)' }}>
              <div className="relative w-full bg-black h-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-game-green">
                    <div className="text-4xl mb-2">🎮</div>
                    <div className="text-sm font-medium">CLICK BUTTON TO PLAY GAME</div>
                    <div className="text-xs opacity-75 mt-1">Game loads here</div>
                  </div>
                </div>
              </div>
            </div>

              {/* Frame Image overlay */}
              <img 
                src={framePath} 
                alt="Game Frame" 
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ 
                  imageRendering: 'pixelated',
                  objectFit: 'contain',
                  transform: 'scale(2.0)',
                  transformOrigin: 'center'
                }}
              />
            </div>
          )}
        </div>

        <div className="text-center mb-6 mt-20">
          {!showGame ? (
            <Button 
              onClick={startGame}
              className="bg-white text-game-orange px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Start Game Demo
            </Button>
          ) : (
            <Button 
              onClick={() => setShowGame(false)}
              className="bg-white text-game-orange px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Close Game
            </Button>
          )}
        </div>
      </main>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-2">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 font-game">Frequently Asked Questions</h2>

          <Card className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm border-white border-opacity-20">
            {faqItems.map((item, index) => (
              <div key={index} className={`faq-item ${index < faqItems.length - 1 ? 'border-b border-white border-opacity-20' : ''}`}>
                <button 
                  className="w-full py-4 text-left flex justify-between items-center font-semibold text-lg hover:text-game-green transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{item.question}</span>
                  {openFAQ === index ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="faq-answer pb-4">
                    <p className="text-gray-200 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-12">
        <div className="text-center border-t border-white border-opacity-20 pt-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 font-game">Follow the Adventure</h3>
            <a 
              href="https://x.com/aotgoobots" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-game-orange px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Follow @aotgoobots
            </a>
          </div>

          <div className="text-sm opacity-75 font-game">
            <p>&copy; 2024 Attack of the Goobots. All rights reserved.</p>
            <p className="mt-2">Made with 🧡 for gamers everywhere</p>
          </div>
        </div>
      </footer>
    </div>
  );
}