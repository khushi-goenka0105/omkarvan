import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    trees: 0,
    donors: 0,
    batches: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/dashboard"
      );

      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <div>

    <div className="mb-8">
      <h1 className="text-5xl font-bold text-slate-800">
        🌳 Omkarvan Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        A sacred space of remembrance, reflection and rejuvenation
      </p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-gray-500">
          Total Trees
        </p>

        <h2 className="text-5xl font-bold text-emerald-600 mt-2">
          {stats.trees}
        </h2>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-gray-500">
          Total Donors
        </p>

        <h2 className="text-5xl font-bold text-blue-600 mt-2">
          {stats.donors}
        </h2>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-gray-500">
          Plantation Drives
        </p>

        <h2 className="text-5xl font-bold text-orange-500 mt-2">
          {stats.batches}
        </h2>
      </div>

    </div>

    <div className="grid lg:grid-cols-2 gap-8">

      {/* Trees Needed */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
          🌱 Trees Needed
        </h2>

        <div className="space-y-3">

          <div className="flex justify-between">
            <span>Neem</span>
            <span className="font-bold">
              20 Needed
            </span>
          </div>

          <div className="flex justify-between">
            <span>Peepal</span>
            <span className="font-bold">
              15 Needed
            </span>
          </div>

          <div className="flex justify-between">
            <span>Mango</span>
            <span className="font-bold">
              10 Needed
            </span>
          </div>

        </div>

      </div>

      {/* Garden Zones */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
          🗺 Garden Zones
        </h2>

        <div className="grid grid-cols-2 gap-3">

          <div className="bg-green-50 p-3 rounded-xl">
            Tulsi Van
          </div>

          <div className="bg-green-50 p-3 rounded-xl">
            Butterfly Garden
          </div>

          <div className="bg-green-50 p-3 rounded-xl">
            Fruit Orchard
          </div>

          <div className="bg-green-50 p-3 rounded-xl">
            Herb Garden
          </div>

          <div className="bg-green-50 p-3 rounded-xl">
            Reflection Zone
          </div>

          <div className="bg-green-50 p-3 rounded-xl">
            Om Garden
          </div>

        </div>

      </div>

      {/* Recent Plantation Drives */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
          📦 Recent Plantation Drives
        </h2>

        <div className="space-y-4">

          <div>
            <p className="font-semibold">
              World Environment Day
            </p>

            <p className="text-gray-500 text-sm">
              50 Trees
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Memorial Plantation
            </p>

            <p className="text-gray-500 text-sm">
              25 Trees
            </p>
          </div>

        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
          ⚡ Quick Actions
        </h2>

        <div className="space-y-3">

          <button className="w-full bg-emerald-600 text-white py-3 rounded-xl">
            Create Batch
          </button>

          <button className="w-full bg-blue-600 text-white py-3 rounded-xl">
            Search Trees
          </button>

          <button className="w-full bg-orange-500 text-white py-3 rounded-xl">
            Print Labels
          </button>

        </div>

      </div>

    </div>

  </div>
);
}

export default Dashboard;