import DonorFields from "./DonorFields";

function TreeForm({
  formData,
  donorData,
  handleChange,
  handleDonorChange,
  getLocation,
  addTree,
}) {
  return (
    <div>
      <h2>Add Tree</h2>

      <form onSubmit={addTree}>
        

      
        

        <input
          type="text"
          name="species"
          placeholder="Species"
          value={formData.species}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="scientificName"
          placeholder="Scientific Name"
          value={formData.scientificName}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="section"
          placeholder="Section"
          value={formData.section}
          onChange={handleChange}
        />
        <br /><br />

        <button
          type="button"
          onClick={getLocation}
      >
        📍 Get Current Location
      </button>

      <br /><br />

      <p>
        Latitude: {formData.latitude}
      </p>

      <p>
        Longitude: {formData.longitude}
      </p>

        <select
          name="source"
          value={formData.source}
          onChange={handleChange}
        >
          <option value="TEAM">TEAM</option>
          <option value="DONATED">DONATED</option>
        </select>

        <br /><br />

        {formData.source === "DONATED" && (
  <DonorFields
    donorData={donorData}
    handleDonorChange={handleDonorChange}
  />
)}

        <button type="submit">
          Add Tree
        </button>
      </form>

      <hr />
      
    </div>
  );
}

export default TreeForm;