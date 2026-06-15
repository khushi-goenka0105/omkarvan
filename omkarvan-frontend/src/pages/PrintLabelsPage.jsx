import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import axios from "axios";
import { PUBLIC_URL } from "../config";

function PrintLabelsPage() {

  const { batchId } = useParams();

  const [trees, setTrees] = useState([]);

  useEffect(() => {
    fetchTrees();
  }, []);

  const fetchTrees = async () => {

    const response =
      await axios.get(
        `http://localhost:8080/api/batches/${batchId}/trees`
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
            className="border p-4 text-center"
          >

            <h3 className="font-bold mb-4">
              {tree.treeCode}
            </h3>

            <QRCode
              value={
                `${PUBLIC_URL}/tree/${tree.treeCode}`
              }
              size={120}
            />

          </div>

        ))}

      </div>

    </div>
  );
}

export default PrintLabelsPage;