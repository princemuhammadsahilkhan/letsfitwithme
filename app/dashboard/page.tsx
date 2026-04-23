import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | LetsFit',
  description: 'Your dashboard',
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-[#F8F8F8]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h1 className="text-3xl font-bold text-[#111111] mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <h3 className="text-[#767676] font-medium text-sm mb-2">Saved Pins</h3>
            <p className="text-[#111111] text-3xl font-bold">12</p>
          </div>
          <div className="bg-white p-6 rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <h3 className="text-[#767676] font-medium text-sm mb-2">Community Posts</h3>
            <p className="text-[#111111] text-3xl font-bold">4</p>
          </div>
          <div className="bg-white p-6 rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <h3 className="text-[#767676] font-medium text-sm mb-2">Followers</h3>
            <p className="text-[#111111] text-3xl font-bold">28</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <h2 className="text-xl font-bold text-[#111111] mb-6">Recent Activity</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 py-3 border-b border-[#EFEFEF]">
              <div className="w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center text-xl">🔥</div>
              <div>
                <p className="text-[#111111] font-medium">You saved "10 Minute Core Workout"</p>
                <p className="text-[#767676] text-sm">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-3 border-b border-[#EFEFEF]">
              <div className="w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center text-xl">🥗</div>
              <div>
                <p className="text-[#111111] font-medium">You commented on "Healthy Meal Prep"</p>
                <p className="text-[#767676] text-sm">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
