import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

      {trees.map((tree) => (
        <div
          key={tree.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>
            <strong>{tree.treeCode}</strong>
          </p>

          <p>{tree.species}</p>

          <p>Status: {tree.status}</p>
        </div>
      ))}
    </div>
  );
}

export default BatchDetailsPage;