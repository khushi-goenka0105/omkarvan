import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function BatchDetailsPage() {
  const { batchId } = useParams();

  const [trees, setTrees] = useState([]);

  useEffect(() => {
    fetchTrees();
  }, []);

  const fetchTrees = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/batches/${batchId}/trees`
      );

      setTrees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🌳 Batch Details</h1>

      <p>Batch ID: {batchId}</p>

      <h2>Trees</h2>

      <Link
  to={`/print-labels/${batchId}`}
  className="bg-green-700 text-white px-4 py-2 rounded"
>
  🖨 Print Labels
</Link>

      {trees.map((tree) => (
        <div
          key={tree.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <Link
  to={`/tree/${tree.treeCode}`}
  className="text-blue-600 font-bold hover:underline"
>
  {tree.treeCode}
</Link>

          <p>{tree.species}</p>
          <p>
  Zone: {tree.section}
</p>

          <p>Status: {tree.status}</p>
        </div>
      ))}
    </div>
  );
}

export default BatchDetailsPage;