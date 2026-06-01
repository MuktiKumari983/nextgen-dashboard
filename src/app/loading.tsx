import React from 'react';

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto w-full space-y-6">
        {/* Top Grid Row Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 h-48 bg-neutral-900/50 border border-neutral-900 rounded-3xl animate-pulse" />
          <div className="h-48 bg-neutral-900/50 border border-neutral-900 rounded-3xl animate-pulse" />
        </div>

        {/* Courses Grid Row Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-neutral-900/50 border border-neutral-900 rounded-3xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}