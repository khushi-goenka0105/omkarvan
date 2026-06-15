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
    <div style={{ padding: "20px" }}>
      <h1>🌳 Tree Information</h1>

      <h2>{tree.species}</h2>

      <p>Tree Code: {tree.treeCode}</p>
      <p>Scientific Name: {tree.scientificName}</p>
      <p>Section: {tree.section}</p>
      <p>Source: {tree.source}</p>
      {tree.source === "DONATED" && tree.donor && (
  <>
    <h3>🌳 Donor Information</h3>

    <p>Name: {tree.donor.name}</p>
    <p>Phone: {tree.donor.phone}</p>
    <p>Email: {tree.donor.email}</p>
    <p>Occasion: {tree.donor.occasion}</p>
  </>
)}
      <p>Latitude: {tree.latitude}</p>
      <p>Longitude: {tree.longitude}</p>
    </div>
  );
}

export default TreeDetails;