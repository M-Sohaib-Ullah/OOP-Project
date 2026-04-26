import React, { useState } from 'react';
import { ai } from '../App';
import { Sparkles, Loader2, BookOpenCheck } from 'lucide-react';

export default function ExamEngine({ user }: { user: any }) {
  const [question, setQuestion] = useState('Describe the mechanism of an SN2 reaction. (5 marks)');
  const [scheme, setScheme] = useState('Must include: single step, concerted mechanism, nucleophilic attack from opposite side of leaving group, pentacoordinate transition state, inversion of configuration.');
  const [answer, setAnswer] = useState('');
  
  const [isGrading, setIsGrading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleGrade = async () => {
    if (!answer) return;
    setIsGrading(true);
    setFeedback(null);
    try {
      const prompt = `You are an expert Cambridge A-Level Examiner. 
      Evaluate the student's answer based on the official marking scheme.
      
      Question: ${question}
      Official Marking Scheme: ${scheme}
      Student Answer: ${answer}
      
      Provide a concise response with:
      1. Estimated Score (e.g. 3/5)
      2. Constructive Feedback on where marks were lost and how to improve.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
      });

      setFeedback(response.text());
      // In a real app we'd save this to Firestore and award XP.
    } catch (error) {
      console.error(error);
      setFeedback('Error connecting to AI examiner.');
    } finally {
      setIsGrading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Exam Engine</h1>
        <p className="text-gray-500 mt-2">Take simulated past papers with AI auto-grading.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Context */}
        <div className="space-y-6">
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
             <label className="block text-sm font-bold tracking-tight text-gray-700 mb-2">Question</label>
             <textarea 
               value={question}
               onChange={(e) => setQuestion(e.target.value)}
               className="w-full bg-gray-50 rounded-xl p-4 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 resize-none h-32"
             />
           </div>
           
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
             <label className="block text-sm font-bold tracking-tight text-gray-700 mb-2">Marking Scheme (Internal)</label>
             <textarea 
               value={scheme}
               onChange={(e) => setScheme(e.target.value)}
               className="w-full bg-yellow-50 rounded-xl p-4 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0 resize-none h-32 font-mono text-sm text-yellow-900"
             />
           </div>
        </div>

        {/* Right Column: Work & Feedback */}
        <div className="space-y-6">
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 shadow-blue-100/50">
             <label className="block text-sm font-bold tracking-tight text-blue-900 mb-2">Your Answer</label>
             <textarea 
               value={answer}
               onChange={(e) => setAnswer(e.target.value)}
               placeholder="Type your detailed answer here..."
               className="w-full bg-white rounded-xl p-4 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none h-48"
             />
             <div className="mt-4 flex justify-end">
                <button 
                  onClick={handleGrade}
                  disabled={isGrading || !answer}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-sm shadow-blue-600/20"
                >
                  {isGrading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  {isGrading ? 'Grading...' : 'Grade with AI'}
                </button>
             </div>
           </div>

           {feedback && (
             <div className="bg-green-50 rounded-2xl p-6 border border-green-200 animate-in fade-in slide-in-from-top-2 duration-300">
               <div className="flex items-center gap-3 font-bold text-green-900 mb-4">
                 <BookOpenCheck className="w-6 h-6 text-green-600" />
                 Examiner Feedback
               </div>
               <div className="prose prose-sm prose-green max-w-none whitespace-pre-wrap font-medium text-green-900 leading-relaxed">
                 {feedback}
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
