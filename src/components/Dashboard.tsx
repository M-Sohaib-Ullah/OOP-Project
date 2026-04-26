import React from 'react';
import { Flame, Zap, CheckCircle2 } from 'lucide-react';

export default function Dashboard({ userData }: { userData: any }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Progress</h1>
        <p className="text-gray-500 mt-2">Track your CAIE exam readiness and keep your streak alive.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<Zap className="w-8 h-8 text-yellow-500" />}
          label="Total XP"
          value={userData?.xp || 0}
          trend="+150 this week"
        />
        <StatCard 
          icon={<Flame className="w-8 h-8 text-orange-500" />}
          label="Day Streak"
          value={userData?.streak || 0}
          trend="Keep it going!"
        />
        <StatCard 
          icon={<CheckCircle2 className="w-8 h-8 text-green-500" />}
          label="Exams Completed"
          value={0}
          trend="Just started"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Study Analytics</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-100 border-dashed">
             <p className="text-gray-500 font-medium">Complete more exams to unlock detailed analytics.</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-start space-y-4">
      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
        {icon}
      </div>
      <div>
        <div className="text-3xl font-black text-gray-900">{value}</div>
        <div className="text-sm font-medium text-gray-500 mt-1">{label}</div>
      </div>
      <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
        {trend}
      </div>
    </div>
  );
}
