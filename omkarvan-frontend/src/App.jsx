import { useEffect, useState } from "react";
import TreeList from "./components/TreeList";
import TreeForm from "./components/TreeForm";
import {
  getAllTrees,
  createTree,
  createDonor, 
} from "./services/treeService";

function App() {
  const [trees, setTrees] = useState([]);

  const [formData, setFormData] = useState({
    species: "",
    scientificName: "",
    section: "",
    latitude: "",
    longitude: "",
    source: "TEAM",
  });

  const [donorData, setDonorData] = useState({
    name: "",
    phone: "",
    email: "",
    occasion: "",
  });

  

  const fetchTrees = async () => {
  try {
    const response = await getAllTrees();
    setTrees(response.data);
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    fetchTrees();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDonorChange = (e) => {
  setDonorData({
    ...donorData,
    [e.target.name]: e.target.value,
  });
};

  const getLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setFormData((prev) => ({
        ...prev,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }));
    },
    (error) => {
      console.error(error);
      alert("Location access denied");
    }
  );
};

  const addTree = async (e) => {
  e.preventDefault();

  try {
    let donor = null;

    if (formData.source === "DONATED") {
      const donorResponse = await createDonor(donorData);

      donor = donorResponse.data;
    }

    const treePayload = {
      ...formData,
      donor: donor,
    };

    await createTree(treePayload);

    fetchTrees();

    setFormData({
      species: "",
      scientificName: "",
      section: "",
      latitude: "",
      longitude: "",
      source: "TEAM",
    });

    setDonorData({
      name: "",
      phone: "",
      email: "",
      occasion: "",
    });

    alert("Tree Added Successfully 🌳");
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Omkarvan 🌳</h1>

      <TreeForm
  formData={formData}
  donorData={donorData}
  handleChange={handleChange}
  handleDonorChange={handleDonorChange}
  getLocation={getLocation}
  addTree={addTree}
/>

      

      <TreeList trees={trees} />
    </div>
  );
}

export default App;