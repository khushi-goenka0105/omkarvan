import { useState, useEffect } from "react";
import axios from "axios";

function BatchPage() {
  const [batchData, setBatchData] = useState({
    eventName: "",
    source: "TEAM",
    donorId: "",
  });

  const [speciesList, setSpeciesList] = useState([
  {
    species: "",
    quantity: 1,
  },
]);

const [donors, setDonors] = useState([]);

const generateBatch = async () => {
  try {
    const payload = {
      ...batchData,
      speciesList,
    };

    const response = await axios.post(
      "http://localhost:8080/api/batches/generate",
      payload
    );

    alert(response.data);
  } catch (error) {
    console.error(error);
    alert("Failed to generate batch");
  }
};

useEffect(() => {
  fetchDonors();
}, []);

const fetchDonors = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/donors"
    );

    setDonors(response.data);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Plantation Batch 🌳</h1>

      <input
        type="text"
        placeholder="Event Name"
        value={batchData.eventName}
        onChange={(e) =>
          setBatchData({
            ...batchData,
            eventName: e.target.value,
          })
        }
      />

      <br /><br />

      <select
        value={batchData.source}
        onChange={(e) =>
          setBatchData({
            ...batchData,
            source: e.target.value,
          })
        }
      >
        <option value="TEAM">TEAM</option>
        <option value="DONATED">DONATED</option>
      </select>

      <br /><br />

      {batchData.source === "DONATED" && (
  <>
    <br /><br />

    <select
      value={batchData.donorId}
      onChange={(e) =>
        setBatchData({
          ...batchData,
          donorId: e.target.value,
        })
      }
    >
      <option value="">
        Select Donor
      </option>

      {donors.map((donor) => (
        <option
          key={donor.id}
          value={donor.id}
        >
          {donor.name}
        </option>
      ))}
    </select>
  </>
)}

<h3>Species List</h3>

{speciesList.map((item, index) => (
  <div key={index}>
    <input
      type="text"
      placeholder="Species"
      value={item.species}
      onChange={(e) => {
        const updated = [...speciesList];

        updated[index].species =
          e.target.value;

        setSpeciesList(updated);
      }}
    />

    <input
      type="number"
      placeholder="Quantity"
      value={item.quantity}
      onChange={(e) => {
        const updated = [...speciesList];

        updated[index].quantity =
          Number(e.target.value);

        setSpeciesList(updated);
      }}
    />

    <br /><br />
  </div>
))}

<button
  type="button"
  onClick={() =>
    setSpeciesList([
      ...speciesList,
      {
        species: "",
        quantity: 1,
      },
    ])
  }
>
  + Add Species
</button>

<br /><br />

<button
  type="button"
  onClick={generateBatch}
>
  Generate Batch 🌳
</button>
    </div>
  );
}

export default BatchPage;