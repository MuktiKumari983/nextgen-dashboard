'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen, BarChart3 } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'courses', label: 'My Courses', icon: BookOpen },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

export function Sidebar() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <>
      {/* 1. DESKTOP & TABLET SIDEBAR (Responsive layouts matching requirements) */}
      <aside className="hidden md:flex flex-col justify-between h-screen sticky top-0 bg-neutral-950 border-r border-neutral-900 p-4 transition-all duration-300 z-30 w-16 lg:w-64">
        <div className="space-y-8">
          {/* Logo Block: Tablet par single text logo, desktop par Nexus word */}
          <div className="flex items-center gap-3 px-2 py-3 justify-center lg:justify-start">
            <div className="h-8 w-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              N
            </div>
            <span className="font-bold tracking-wider text-neutral-100 text-lg hidden lg:block select-none">
              NEXUS
            </span>
          </div>

          {/* Nav Items Link Pipeline */}
          <nav className="space-y-1 relative" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-2xl relative transition-colors duration-300 justify-center lg:justify-start h-11 md:h-12 ${
                    isActive ? 'text-neutral-100' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {/* Framer motion spring layout id for dynamic sliding block */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSidePill"
                      className="absolute inset-0 bg-neutral-900 border border-neutral-800 rounded-2xl -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-indigo-400' : 'text-neutral-400'}`} />
                  <span className="hidden lg:block truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User profile bottom item block */}
        <div className="border-t border-neutral-900 pt-4 flex items-center gap-3 px-2 justify-center lg:justify-start">
          <div className="h-9 w-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-semibold text-neutral-300 flex-shrink-0">
            S
          </div>
          <div className="hidden lg:flex flex-col truncate">
            <span className="text-xs font-medium text-neutral-200 truncate">Scholar User</span>
            <span className="text-[10px] text-neutral-500 truncate">Premium Account</span>
          </div>
        </div>
      </aside>

      {/* 2. MOBILE BOTTOM NAVIGATION SCREEN (Section 6 Requirement) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-neutral-950/80 border-t border-neutral-900 backdrop-blur-md px-6 py-2 flex justify-around items-center z-40" aria-label="Mobile Navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl relative transition-colors duration-300 ${
                isActive ? 'text-indigo-400' : 'text-neutral-500'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeMobilePill"
                  className="absolute inset-x-0 -top-2 h-0.5 bg-indigo-500"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}