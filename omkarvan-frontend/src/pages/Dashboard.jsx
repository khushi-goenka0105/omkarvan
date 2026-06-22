import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import hero from "../assets/hero.JPG";
import { API_BASE_URL } from "../config";

function Dashboard() {
  const [stats, setStats] = useState({
    trees: 0,
    donors: 0,
    batches: 0,
  });

  const [speciesInventory, setSpeciesInventory] =
  useState([]);

  const navigate = useNavigate();

  useEffect(() => {
  fetchStats();
  fetchSpeciesInventory();
}, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(

  `${API_BASE_URL}/api/dashboard`

);

      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSpeciesInventory = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/dashboard/species`
      );

      setSpeciesInventory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="grid gap-8 overflow-hidden rounded-[2rem] bg-white/95 p-6 shadow-2xl shadow-slate-200/40 ring-1 ring-slate-200/60 lg:grid-cols-[1.2fr_0.95fr] lg:p-8">
          <div className="flex flex-col justify-center gap-7">
            <div className="inline-flex items-center gap-3 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700 shadow-sm">
              OMKARVAN • Garden HQ
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-emerald-700">
                  Premium garden operations
                </p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                  <span className="block text-emerald-800">Omkarvan</span>
                  <span className="mt-3 block text-base font-serif text-slate-500 italic sm:text-lg">
                    in loving memory of Shri Omprakashji Goenka
                  </span>
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  A refined dashboard for managing memorial gardens, donors, plantation drives, and tree stories with confidence.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.75rem] border border-emerald-100 bg-emerald-50/90 p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-700">Trees</p>
                  <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.trees}</p>
                </div>
                <div className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-700">Donors</p>
                  <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.donors}</p>
                </div>
                <div className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-700">Batches</p>
                  <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.batches}</p>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-emerald-100 bg-emerald-50/70 p-5 text-sm leading-6 text-slate-600 shadow-sm">
                Stay ahead of every planting cycle with a premium view of inventory, donors, and campaign performance.
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 shadow-inner">
            <img src={hero} alt="Omkarvan Master Plan" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-[1.75rem] border border-white/20 bg-white/10 p-5 text-white backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Site view</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Master plan in bloom</h2>
              <p className="mt-2 text-sm leading-6 text-slate-200/80">
                The hero image anchors the dashboard with calm landscaping, premium depth, and natural focus.
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.7fr_1fr]">
          <div className="space-y-8">
            <section className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-200/80">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Inventory</p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">Current Tree Inventory</h2>
                </div>
                <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
                  Live counts
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {speciesInventory.map((item) => (
                  <div key={item.species} className="flex items-center justify-between rounded-[1.5rem] border border-slate-100 bg-slate-50 px-5 py-4 shadow-sm">
                    <span className="font-medium text-slate-700">{item.species}</span>
                    <span className="text-lg font-semibold text-slate-900">{item.count}</span>
                  </div>
                ))}
              </div>
            </section>

            
          </div>

          <aside className="space-y-8">
            <section className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-200/80">
              <h2 className="text-2xl font-semibold text-slate-900">Garden Zones</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] bg-emerald-50 p-4">
                  <h3 className="font-semibold text-slate-900">🌿 Tulsi Van</h3>
                  <p className="mt-2 text-sm text-slate-600">Spiritual & sacred zone</p>
                </div>
                <div className="rounded-[1.75rem] bg-rose-50 p-4">
                  <h3 className="font-semibold text-slate-900">🦋 Butterfly Garden</h3>
                  <p className="mt-2 text-sm text-slate-600">Pollinator habitat</p>
                </div>
                <div className="rounded-[1.75rem] bg-amber-50 p-4">
                  <h3 className="font-semibold text-slate-900">🍋 Fruit Orchard</h3>
                  <p className="mt-2 text-sm text-slate-600">Community fruit trees</p>
                </div>
                <div className="rounded-[1.75rem] bg-sky-50 p-4">
                  <h3 className="font-semibold text-slate-900">💧 Waterbody</h3>
                  <p className="mt-2 text-sm text-slate-600">Wellness & reflection</p>
                </div>
                <div className="rounded-[1.75rem] bg-violet-50 p-4">
                  <h3 className="font-semibold text-slate-900">🕊 Reflection Zone</h3>
                  <p className="mt-2 text-sm text-slate-600">Peaceful seating area</p>
                </div>
                <div className="rounded-[1.75rem] bg-orange-50 p-4">
                  <h3 className="font-semibold text-slate-900">🕉 Om Garden</h3>
                  <p className="mt-2 text-sm text-slate-600">Central meditation space</p>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-200/80">
              <h2 className="text-2xl font-semibold text-slate-900">Quick Actions</h2>
              <div className="mt-6 space-y-4">
                <button
                  className="w-full rounded-3xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                  onClick={() => navigate("/batch")}
                >
                  Create Batch
                </button>
                <button
                  className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  onClick={() => navigate("/search")}
                >
                  Search Trees
                </button>
                <button
                  className="w-full rounded-3xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  onClick={() => navigate("/batches")}
                >
                  View Batches
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

