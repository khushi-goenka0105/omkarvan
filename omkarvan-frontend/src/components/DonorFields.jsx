function DonorFields({
  donorData,
  handleDonorChange,
}) {
  return (
    <>
      <input
        type="text"
        name="name"
        placeholder="Donor Name"
        value={donorData.name}
        onChange={handleDonorChange}
      />

      <br /><br />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={donorData.phone}
        onChange={handleDonorChange}
      />

      <br /><br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={donorData.email}
        onChange={handleDonorChange}
      />

      <br /><br />

      <input
        type="text"
        name="occasion"
        placeholder="Occasion"
        value={donorData.occasion}
        onChange={handleDonorChange}
      />

      <br /><br />
    </>
  );
}

export default DonorFields;