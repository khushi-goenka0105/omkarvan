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
    <div style={{ padding: "20px" }}>
      <h1>🌳 Plantation Batches</h1>

      {batches.map((batch) => (
        <div
          key={batch.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <Link to={`/batches/${batch.id}`}>
            <h3>{batch.batchCode}</h3>
          </Link>

          <p>Event: {batch.eventName}</p>

          <p>Source: {batch.source}</p>

          <p>
            Total Trees: {batch.totalTrees}
          </p>
        </div>
      ))}
    </div>
  );
}

export default BatchListPage;