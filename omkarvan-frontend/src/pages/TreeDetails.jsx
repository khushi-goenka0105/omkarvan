import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function TreeDetails() {
  const { treeCode } = useParams();

  const [tree, setTree] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/trees/${treeCode}`)
      .then((response) => {
        setTree(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [treeCode]);

  if (!tree) {
    return <h2>Loading...</h2>;
  }

  return (
  <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">

    <div className="bg-white shadow-xl rounded-3xl max-w-2xl w-full p-8">

      <div className="text-center mb-8">

        <div className="text-6xl mb-4">
          🌳
        </div>

        <h1 className="text-4xl font-bold text-green-700">
          {tree.species}
        </h1>

        <p className="text-gray-500 mt-2">
          Tree Information
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-gray-500 text-sm">
            Tree Code
          </p>

          <p className="font-semibold">
            {tree.treeCode}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-gray-500 text-sm">
            Scientific Name
          </p>

          <p className="font-semibold">
            {tree.scientificName}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-gray-500 text-sm">
            Section
          </p>

          <p className="font-semibold">
            {tree.section}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-gray-500 text-sm">
            Source
          </p>

          <p className="font-semibold">
            {tree.source}
          </p>
        </div>

      </div>

      {tree.source === "DONATED" &&
        tree.donor && (

        <div className="mt-8">

          <h2 className="text-2xl font-bold mb-4">
            ❤️ Donor Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-gray-500 text-sm">
                Name
              </p>

              <p className="font-semibold">
                {tree.donor.name}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-gray-500 text-sm">
                Occasion
              </p>

              <p className="font-semibold">
                {tree.donor.occasion}
              </p>
            </div>

          </div>

        </div>
      )}

      <div className="mt-8">

        <h2 className="text-2xl font-bold mb-4">
          📍 Location
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-gray-500 text-sm">
              Latitude
            </p>

            <p className="font-semibold">
              {tree.latitude}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-gray-500 text-sm">
              Longitude
            </p>

            <p className="font-semibold">
              {tree.longitude}
            </p>
          </div>

        </div>

      </div>

      <div className="mt-10 text-center">

        <p className="text-green-700 font-medium">
          Thank you for supporting Omkarvan 🌳
        </p>

      </div>

    </div>

  </div>
);
}

export default TreeDetails;