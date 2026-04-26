import React from 'react';
import { Trophy, Medal, Star } from 'lucide-react';

export default function Leaderboard() {
  const dummyData = [
    { rank: 1, name: 'Alex Johnson', streak: 45, xp: 12500 },
    { rank: 2, name: 'Sarah Chen', streak: 32, xp: 11200 },
    { rank: 3, name: 'Muhammad Ali', streak: 28, xp: 9800 },
    { rank: 4, name: 'You', streak: 5, xp: 1450 },
    { rank: 5, name: 'Emma Davis', streak: 12, xp: 1200 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full">
           <Trophy className="w-10 h-10 text-yellow-500" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Global Leaderboard</h1>
        <p className="text-gray-500">Compete with students worldwide. Keep your streak alive!</p>
      </header>

      <div className="bg-white rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-gray-50 border-b border-gray-100 text-xs font-black tracking-wider text-gray-500 uppercase">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-6">Student</div>
          <div className="col-span-2 text-right">Day Streak</div>
          <div className="col-span-2 text-right">Total XP</div>
        </div>
        
        <div className="divide-y divide-gray-50">
          {dummyData.map((user) => (
            <div 
              key={user.rank} 
              className={`grid grid-cols-12 gap-4 px-8 py-5 items-center transition-colors ${
                user.name === 'You' ? 'bg-blue-50/50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="col-span-2 flex justify-center">
                {user.rank === 1 && <Medal className="w-8 h-8 text-yellow-500" />}
                {user.rank === 2 && <Medal className="w-8 h-8 text-gray-400" />}
                {user.rank === 3 && <Medal className="w-8 h-8 text-amber-700" />}
                {user.rank > 3 && <span className="font-bold text-gray-400 text-lg">#{user.rank}</span>}
              </div>
              <div className="col-span-6 font-bold text-gray-900 text-lg flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs text-white ${
                  user.name === 'You' ? 'bg-blue-600' : 'bg-gray-800'
                }`}>
                   {user.name.charAt(0)}
                </div>
                {user.name}
              </div>
              <div className="col-span-2 text-right flex items-center justify-end gap-2">
                <span className="font-black text-orange-500">{user.streak}</span>
                <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
              </div>
              <div className="col-span-2 text-right font-black text-blue-600 text-lg font-mono">
                {user.xp.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
