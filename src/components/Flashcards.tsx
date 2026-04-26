import React, { useState } from 'react';
import { ai } from '../App';
import { Loader2, Lightbulb, Repeat } from 'lucide-react';

export default function Flashcards({ user }: { user: any }) {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [cards, setCards] = useState<{ q: string; a: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    setCards([]);
    setCurrentIndex(0);
    setIsFlipped(false);
    
    try {
      const prompt = `Generate 5 concise study flashcards for CAIE-level students on the topic: "${topic}".
      Return ONLY valid JSON in this exact format, with no markdown formatting or backticks:
      [
        {"q": "question here", "a": "answer here"}
      ]`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
      });

      const text = response.text().replace(/```json\n?|\n?```/g, '').trim();
      const parsed = JSON.parse(text);
      setCards(parsed);
    } catch (error) {
      console.error(error);
      alert('Failed to generate flashcards. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((p) => (p + 1) % cards.length);
    }, 150);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">AI Flashcards</h1>
        <p className="text-gray-500 mt-2">Generate instant study aids for your weak topics.</p>
      </header>

      <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
        <input 
          type="text" 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g. Energetics, Cell Structure)"
          className="flex-1 bg-gray-50 rounded-xl px-4 py-3 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 font-medium"
        />
        <button 
          onClick={handleGenerate}
          disabled={isGenerating || !topic}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm shadow-blue-600/20"
        >
          {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lightbulb className="w-5 h-5" />}
          Generate
        </button>
      </div>

      {cards.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center text-sm font-bold text-gray-500 px-2">
            <span>Card {currentIndex + 1} of {cards.length}</span>
            <span>Tap to flip</span>
          </div>
          
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="group relative h-80 w-full cursor-pointer perspective-1000"
          >
            <div className={`w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              {/* Front */}
              <div className="absolute w-full h-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col justify-center items-center text-center backface-hidden">
                <span className="absolute top-6 left-6 text-2xl font-black text-gray-200">Q.</span>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">{cards[currentIndex].q}</h2>
              </div>
              
              {/* Back */}
              <div className="absolute w-full h-full bg-blue-600 rounded-3xl shadow-xl shadow-blue-600/20 p-8 flex flex-col justify-center items-center text-center backface-hidden rotate-y-180">
                <span className="absolute top-6 left-6 text-2xl font-black text-blue-400/50">A.</span>
                <p className="text-xl font-medium text-white leading-relaxed">{cards[currentIndex].a}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={nextCard}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 rounded-full font-bold shadow-sm transition-colors"
            >
              <Repeat className="w-5 h-5 text-gray-400" />
              Next Flashcard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
