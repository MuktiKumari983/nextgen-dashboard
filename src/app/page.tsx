import { createClient } from '@/utils/supabase/server';
import { Sidebar } from '@/components/Sidebar';
import { BentoGrid } from '@/components/BentoGrid';
import { Course } from '@/types/database';

export const revalidate = 0; 

export default async function DashboardPage() {
  let courses: Course[] = [];
  let databaseError: string | null = null;

  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    courses = data || [];
  } catch (err: unknown) {
    if (err instanceof Error) {
      databaseError = err.message;
    } else {
      databaseError = "Failed to communicate with database gateway.";
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-neutral-950 selection:bg-indigo-500/30">
      <Sidebar />
      
      <div className="flex-1 w-full overflow-hidden">
        {databaseError ? (
          <div className="m-6 p-6 bg-red-950/20 border border-red-900/30 rounded-3xl max-w-xl mx-auto mt-16 text-center backdrop-blur-sm">
            <h2 className="text-red-400 font-semibold tracking-tight text-lg">System Pipeline Error</h2>
            <p className="text-xs text-red-500/80 mt-2 font-mono">{databaseError}</p>
          </div>
        ) : (
          <BentoGrid courses={courses} />
        )}
      </div>
    </div>
  );
}