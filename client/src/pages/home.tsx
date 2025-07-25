import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import logoPath from "@assets/AOTGLogo_1753405413377.png";
import framePath from "@assets/game_frame.png";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is Attack of the Goobots?",
    answer: "Attack of the Goobots is an action-packed adventure game where players battle against an invasion of quirky robotic creatures called Goobots. Featuring fast-paced gameplay, unique power-ups, and challenging levels."
  },
  {
    question: "How do I play the demo?",
    answer: "Simply click the \"Start Game Demo\" button above to begin playing. The demo runs directly in your browser - no downloads required! Use arrow keys to move and spacebar to shoot."
  },
  {
    question: "When will the full game be available?",
    answer: "The full version of Attack of the Goobots is currently in development. Follow us on social media for the latest updates and release announcements!"
  },
  {
    question: "What platforms will the game support?",
    answer: "Attack of the Goobots is being developed for web browsers initially, with plans for mobile and desktop versions. The game is designed to be accessible across multiple platforms."
  },
  {
    question: "Can I provide feedback on the demo?",
    answer: "Absolutely! We welcome all feedback and suggestions. You can reach out to us through our social media channels or contact forms. Your input helps make the game better!"
  }
];

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const startGame = () => {
    // Game initialization logic would go here
    console.log("Starting game demo...");
  };

  return (
    <div className="min-h-screen bg-game-orange text-white">
      {/* Header */}
      <header className="container mx-auto px-4 pt-4 pb-2 text-center">
        <div className="mb-0">
          <img 
            src={logoPath} 
            alt="Attack of the Goobots Logo" 
            className="mx-auto w-64 h-auto logo-glow hover:scale-105 transition-transform duration-300"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6 pt-3" style={{ fontFamily: '"Courier New", "Monaco", "Menlo", "Consolas", monospace', fontWeight: 'bold', letterSpacing: '1px', imageRendering: 'pixelated' }}>
          A Mooncat Rescue Story
        </p>
      </header>

      {/* Game Demo */}
      <main className="container mx-auto px-4 py-1">
        <div className="flex justify-center mb-6">
          <div className="relative border-4 border-black">
            {/* Game Area - Black window below */}
            <div className="bg-black w-[480px] h-[270px] flex items-center justify-center">
              <div className="text-center text-game-green">
                <div className="text-4xl mb-2">🎮</div>
                <div className="text-sm font-medium">GAME LOADS HERE</div>
                <div className="text-xs opacity-75 mt-1">16:9 Aspect Ratio</div>
              </div>
            </div>

            {/* Frame Image on top - 200% scale with transform */}
            <img 
              src={framePath} 
              alt="Game Frame" 
              className="absolute left-1/2 pointer-events-none"
              style={{ 
                imageRendering: 'pixelated',
                width: '480px',
                height: '270px',
                top: '54%',
                transform: 'translate(-50%, -50%) scale(2)',
                transformOrigin: 'center'
              }}
            />
          </div>
        </div>

        <div className="text-center mb-12 mt-8">
          <Button 
            onClick={startGame}
            className="bg-white text-game-orange px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
          >
            Start Game Demo
          </Button>
        </div>
      </main>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-6">
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