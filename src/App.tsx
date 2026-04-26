import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { Award, Brain, Target, BarChart2, BookOpen } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ExamEngine from './components/ExamEngine';
import Flashcards from './components/Flashcards';
import Leaderboard from './components/Leaderboard';
import { GoogleGenAI } from '@google/genai';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Gemini
export const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY });


type Tab = 'dashboard' | 'exam' | 'flashcards' | 'leaderboard';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{ xp: number; streak: number } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // init or load user
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data() as any);
        } else {
          const newData = {
            uid: user.uid,
            email: user.email,
            xp: 0,
            streak: 0,
            createdAt: new Date().toISOString(),
          };
          await setDoc(userRef, newData);
          setUserData(newData as any);
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">Loading EduPrep AI...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 font-sans p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
               <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">EduPrep AI</h1>
            <p className="text-gray-500">Your Intelligent, Gamified Platform for CAIE Exam Preparation.</p>
            <button 
              onClick={login}
              className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
            >
              Sign in with Google
            </button>
            <p className="text-xs text-gray-400 mt-4">Required to track XP, streaks, and progress.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col">
        <div className="px-6 py-8 border-b border-gray-100">
          <div className="flex items-center gap-3 font-bold text-xl tracking-tight text-blue-600">
            <Brain className="w-6 h-6" />
            EduPrep AI
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<BarChart2 className="w-5 h-5"/>} label="Dashboard" />
          <NavItem active={activeTab === 'exam'} onClick={() => setActiveTab('exam')} icon={<Target className="w-5 h-5"/>} label="Exam Engine" />
          <NavItem active={activeTab === 'flashcards'} onClick={() => setActiveTab('flashcards')} icon={<BookOpen className="w-5 h-5"/>} label="Flashcards" />
          <NavItem active={activeTab === 'leaderboard'} onClick={() => setActiveTab('leaderboard')} icon={<Award className="w-5 h-5"/>} label="Leaderboard" />
        </nav>

        <div className="px-6 py-6 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}`} className="w-10 h-10 rounded-full bg-gray-200" />
            <div className="truncate text-sm">
              <div className="font-medium text-gray-900 truncate">{user.displayName || 'Student'}</div>
              <div className="text-gray-500 truncate">{user.email}</div>
            </div>
          </div>
          <button onClick={() => auth.signOut()} className="mt-4 text-sm text-gray-500 hover:text-gray-900 transition-colors">Sign Out</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50/50">
        <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-8">
          {activeTab === 'dashboard' && <Dashboard userData={userData} />}
          {activeTab === 'exam' && <ExamEngine user={user} />}
          {activeTab === 'flashcards' && <Flashcards user={user} />}
          {activeTab === 'leaderboard' && <Leaderboard />}
        </div>
      </main>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
        active 
          ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
