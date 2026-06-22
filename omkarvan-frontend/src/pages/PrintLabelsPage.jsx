import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import axios from "axios";
import { PUBLIC_URL } from "../config";
import { API_BASE_URL } from "../config";

function PrintLabelsPage() {

  const { batchId } = useParams();

  const [trees, setTrees] = useState([]);

  useEffect(() => {
    fetchTrees();
  }, []);

  const fetchTrees = async () => {

    const response =
      await axios.get(
        `${API_BASE_URL}/api/batches/${batchId}/trees`
      );

    setTrees(response.data);
  };

  return (
    <div className="p-8">

      <button
        onClick={() => window.print()}
        className="bg-green-700 text-white px-4 py-2 rounded mb-8"
      >
        Print Labels
      </button>

      <div className="grid grid-cols-3 gap-8">

        {trees.map((tree) => (

          <div
            key={tree.id}
            className="
  border-2 border-emerald-200
  rounded-2xl
  p-6
  text-center
  bg-white
  shadow-sm
"
          >

            <div className="mb-4">
  <h3 className="text-lg font-bold">
    {tree.treeCode}
  </h3>

  <p className="text-sm text-slate-600 mt-1">
    {tree.species.charAt(0).toUpperCase() +
      tree.species.slice(1)}
  </p>
</div>

            <QRCode
              value={
                `${PUBLIC_URL}/tree/${tree.treeCode}`
              }
              size={120}
            />
            <p className="mt-3 text-xs text-slate-500">

    Scan to view tree profile

  </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default PrintLabelsPage;