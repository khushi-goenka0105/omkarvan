import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import hero from "../assets/hero.jpg";

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
        "http://localhost:8080/api/dashboard"
      );

      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSpeciesInventory = async () => {
  try {

    const response = await axios.get(
      "http://localhost:8080/api/dashboard/species"
    );

    setSpeciesInventory(response.data);

  } catch (error) {
    console.error(error);
  }
};

  return (
  <div>
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-10">

  <div className="grid lg:grid-cols-2">

    <div className="p-10 flex flex-col justify-center">

      <div className="text-sm font-semibold text-emerald-700 mb-4">
        OMKARVAN • 25,000 SQ FT
      </div>

      <h1 className="text-5xl font-bold text-slate-800 mb-4">
        🌳 Omkarvan
      </h1>

      <p className="text-2xl text-slate-600 mb-6">
        A Sacred Space of Remembrance,
        Reflection and Rejuvenation
      </p>

      <p className="text-slate-500 mb-8">
        Memorial garden management, donor tracking,
        plantation drives and QR-enabled tree stories.
      </p>

      <div className="flex gap-4">

        <div className="bg-emerald-50 px-5 py-3 rounded-xl">
          <div className="text-2xl font-bold">
            {stats.trees}
          </div>
          <div className="text-sm">
            Trees
          </div>
        </div>

        <div className="bg-blue-50 px-5 py-3 rounded-xl">
          <div className="text-2xl font-bold">
            {stats.donors}
          </div>
          <div className="text-sm">
            Donors
          </div>
        </div>

        <div className="bg-orange-50 px-5 py-3 rounded-xl">
          <div className="text-2xl font-bold">
            {stats.batches}
          </div>
          <div className="text-sm">
            Drives
          </div>
        </div>

      </div>

    </div>

    <div>
      <img
        src={hero}
        alt="Omkarvan Master Plan"
        className="w-full h-full object-cover"
      />
    </div>

  </div>

</div>

    <div className="mb-8">
        
    </div>

    

    

    <div className="grid lg:grid-cols-2 gap-8">

      {/* Trees Needed */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
          🌳 Current Tree Inventory
        </h2>

        <div className="space-y-3">

  {speciesInventory.map((item) => (

    <div
      key={item.species}
      className="flex justify-between"
    >

      <span>
        {item.species}
      </span>

      <span className="font-bold">
        {item.count}
      </span>

    </div>

  ))}

</div>

      </div>

      {/* Garden Zones */}
      <div className="bg-white rounded-2xl shadow p-6">

  <h2 className="text-2xl font-bold mb-4">
    🗺 Garden Zones
  </h2>

  <div className="grid grid-cols-2 gap-4">

    <div className="bg-emerald-50 p-4 rounded-xl">
      <h3 className="font-bold">
        🌿 Tulsi Van
      </h3>

      <p className="text-sm text-gray-600 mt-1">
        Spiritual & sacred zone
      </p>
    </div>

    <div className="bg-pink-50 p-4 rounded-xl">
      <h3 className="font-bold">
        🦋 Butterfly Garden
      </h3>

      <p className="text-sm text-gray-600 mt-1">
        Pollinator habitat
      </p>
    </div>

    <div className="bg-yellow-50 p-4 rounded-xl">
      <h3 className="font-bold">
        🍋 Fruit Orchard
      </h3>

      <p className="text-sm text-gray-600 mt-1">
        Community fruit trees
      </p>
    </div>

    <div className="bg-blue-50 p-4 rounded-xl">
      <h3 className="font-bold">
        💧 Waterbody
      </h3>

      <p className="text-sm text-gray-600 mt-1">
        Wellness & reflection
      </p>
    </div>

    <div className="bg-purple-50 p-4 rounded-xl">
      <h3 className="font-bold">
        🕊 Reflection Zone
      </h3>

      <p className="text-sm text-gray-600 mt-1">
        Peaceful seating area
      </p>
    </div>

    <div className="bg-orange-50 p-4 rounded-xl">
      <h3 className="font-bold">
        🕉 Om Garden
      </h3>

      <p className="text-sm text-gray-600 mt-1">
        Central meditation space
      </p>
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

          <button 
            className="w-full bg-emerald-600 text-white py-3 rounded-xl"
            onClick={() => navigate("/batch")}
          >
            Create Batch
          </button>

          <button

  onClick={() => navigate("/search")}

  className="w-full bg-blue-600 text-white py-3 rounded-xl"

>

  Search Trees

</button>

<button

  onClick={() => navigate("/batches")}

  className="w-full bg-orange-500 text-white py-3 rounded-xl"

>

  View Batches

</button>

        </div>

      </div>

    </div>

  </div>
);
}

export default Dashboard;