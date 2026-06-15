import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BatchListPage() {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/batches"
      ); 

      setBatches(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <div>

    <div className="flex justify-between items-center mb-8">

      <div>

        <h1 className="text-4xl font-bold text-green-700">
          🌳 Plantation Batches
        </h1>

        <p className="text-gray-500 mt-2">
          Manage and track plantation drives
        </p>

      </div>

    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {batches.map((batch) => (

        <div
          key={batch.id}
          className="
            bg-white
            rounded-2xl
            shadow-md
            hover:shadow-xl
            transition
            duration-300
            p-6
          "
        >

          <div className="flex justify-between items-start mb-4">

            <div>

              <h2 className="text-xl font-bold text-green-700">
                📦 {batch.batchCode}
              </h2>

              <p className="text-gray-500">
                {batch.eventName}
              </p>

            </div>

          </div>

          <div className="space-y-2 mb-6">

            <p>
              <span className="font-semibold">
                Source:
              </span>{" "}
              {batch.source}
            </p>

            <p>
              <span className="font-semibold">
                Total Trees:
              </span>{" "}
              {batch.totalTrees}
            </p>

          </div>

          <Link
            to={`/batches/${batch.id}`}
            className="
              inline-block
              bg-green-700
              text-white
              px-4
              py-2
              rounded-lg
              hover:bg-green-800
            "
          >
            View Details →
          </Link>

        </div>

      ))}

    </div>

  </div>
);
}

export default BatchListPage;