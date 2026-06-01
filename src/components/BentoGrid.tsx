'use client';

import { motion } from 'framer-motion';
import { Course } from '@/types/database';
import { DynamicIcon } from './DynamicIcon';
import { Calendar, Flame } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  }
};

const cardHoverProps = {
  whileHover: { 
    scale: 1.018,
    borderColor: 'rgba(99, 102, 241, 0.4)',
    boxShadow: '0 0 25px rgba(99, 102, 241, 0.12)',
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  }
};

export function BentoGrid({ courses }: { courses: Course[] }) {
  return (
    <motion.main 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 p-4 md:p-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-max lg:auto-rows-[minmax(160px,_auto)] max-w-7xl mx-auto w-full pb-24 md:pb-6"
    >
      {/* HERO TILE */}
      <motion.section 
        variants={itemVariants} 
        {...cardHoverProps}
        className="grain-bg bg-neutral-950 border border-neutral-900 rounded-3xl p-6 md:col-span-2 flex flex-col justify-between relative overflow-hidden group min-h-[180px] transition-colors duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-40 pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-100">Welcome back, Scholar</h1>
          <p className="text-neutral-400 mt-1 text-sm md:text-base">Ready to tackle your tracks today?</p>
        </div>
        <div className="relative z-10 flex items-center gap-3 mt-4 bg-neutral-900/60 w-fit px-4 py-2 rounded-full border border-neutral-800">
          <Flame className="text-orange-500 fill-orange-500 h-5 w-5 animate-pulse" />
          <span className="text-sm font-semibold text-neutral-200">14 Day Streak</span>
        </div>
      </motion.section>

      {/* ACTIVITY TILE */}
      <motion.section 
        variants={itemVariants} 
        {...cardHoverProps}
        className="bg-neutral-950 border border-neutral-900 rounded-3xl p-6 md:col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col justify-between overflow-hidden relative transition-colors duration-300 min-h-[220px]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-40 pointer-events-none" />
        
        <div className="relative z-10">
          <h3 className="text-sm font-medium text-neutral-400 flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Consistency
          </h3>
          <div className="grid grid-cols-7 gap-2 mt-6 max-w-xs mx-auto lg:max-w-none">
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className={`aspect-square rounded-sm ${i % 3 === 0 ? 'bg-indigo-500/80' : 'bg-neutral-900'} transition-all duration-300 hover:scale-110`} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* DYNAMIC COURSE TILES */}
      {courses.map((course) => (
        <motion.article 
          key={course.id} 
          variants={itemVariants} 
          {...cardHoverProps}
          className="grain-bg bg-neutral-950 border border-neutral-900 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[160px] transition-colors duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-40 pointer-events-none" />

          <div className="relative z-10 p-3 bg-neutral-900 rounded-2xl border border-neutral-800/80 text-indigo-400 w-fit">
            <DynamicIcon name={course.icon_name} className="h-6 w-6" />
          </div>
          <div className="relative z-10 mt-4">
            <h2 className="font-semibold text-neutral-200 tracking-tight">{course.title}</h2>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-neutral-400 mb-1">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${course.progress}%` }} 
                  transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 15 }} 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" 
                />
              </div>
            </div>
          </div>
        </motion.article>
      ))}
    </motion.main>
  );
}