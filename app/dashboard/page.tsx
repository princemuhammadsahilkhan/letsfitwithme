import React from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="mb-8 flex justify-between items-end border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--navy)' }}>Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here's an overview of your activity.</p>
          </div>
          <Link 
            href="/community" 
            className="text-sm font-medium hover:underline transition-colors"
            style={{ color: 'var(--coral)' }}
          >
            Go to Community &rarr;
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            { label: 'Total Workouts', value: '24', change: '+3 this week' },
            { label: 'Active Days', value: '12', change: 'Current streak: 4' },
            { label: 'Posts Created', value: '8', change: '+1 this week' },
            { label: 'Followers', value: '156', change: '+12 this month' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
              <span className="text-sm font-medium text-gray-500 mb-1">{stat.label}</span>
              <span className="text-3xl font-bold" style={{ color: 'var(--navy)' }}>{stat.value}</span>
              <span className="text-sm mt-3 font-medium" style={{ color: 'var(--coral)' }}>{stat.change}</span>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--navy)' }}>Recent Activity</h2>
            <div className="space-y-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex gap-4 items-start pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: '#FEE2E2', color: 'var(--coral)' }}>
                    {['🏃', '💪', '🧘'][i]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {['Completed 5K Run', 'Upper Body Strength', 'Morning Yoga Flow'][i]}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {['Pace: 5:30/km • 25 mins', '4 exercises • 45 mins', 'Flexibility focus • 20 mins'][i]}
                    </p>
                    <span className="text-xs text-gray-400 mt-2 block">
                      {['2 hours ago', 'Yesterday', '2 days ago'][i]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 rounded-lg font-medium text-sm transition-colors border border-gray-200 hover:bg-gray-50" style={{ color: 'var(--navy)' }}>
              View All Activity
            </button>
          </div>

          {/* Quick Actions / Goals */}
          <div className="space-y-8">
            {/* Action Box */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
               <h3 className="font-semibold mb-2" style={{ color: 'var(--navy)' }}>Start a Workout</h3>
               <p className="text-sm text-gray-500 mb-6">Ready to crush your goals today?</p>
               <button 
                  className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 shadow-sm"
                  style={{ backgroundColor: 'var(--coral)' }}
               >
                 Log Activity
               </button>
            </div>

            {/* Weekly Goal Progress */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold" style={{ color: 'var(--navy)' }}>Weekly Goal</h3>
                <span className="text-sm font-medium text-gray-500">3/4 Days</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 mb-6">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '75%', backgroundColor: 'var(--coral)' }}></div>
              </div>
              
              <div className="flex justify-between gap-2">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-400 font-medium">{day}</span>
                    <div 
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                        i < 3 ? 'text-white' : 'bg-gray-100 text-transparent'
                      }`}
                      style={i < 3 ? { backgroundColor: 'var(--coral)' } : {}}
                    >
                      {i < 3 && '✓'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
