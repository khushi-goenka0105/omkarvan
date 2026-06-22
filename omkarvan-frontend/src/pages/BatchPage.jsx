import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

function BatchPage() {
  const [batchData, setBatchData] = useState({
    eventName: "",
    source: "TEAM",
    donorId: "",
    section: "",
  });

  const [speciesList, setSpeciesList] = useState([
    {
      species: "",
      quantity: 1,
    },
  ]);

  const [donors, setDonors] = useState([]);
  const [validationErrors, setValidationErrors] = useState({
    eventName: "",
    section: "",
    speciesList: [],
  });
  const [successData, setSuccessData] = useState(null);
  const [submissionError, setSubmissionError] = useState("");

  const validateForm = () => {
    let valid = true;
    const errors = {
      eventName: "",
      section: "",
      speciesList: [],
    };

    if (!batchData.eventName.trim()) {
      errors.eventName = "Event name is required.";
      valid = false;
    }

    if (!batchData.section.trim()) {
      errors.section = "Garden zone is required.";
      valid = false;
    }

    const speciesRowErrors = speciesList.map((item) => {
      const rowErrors = {
        species: "",
        quantity: "",
      };

      if (!item.species.trim()) {
        rowErrors.species = "Species name cannot be empty.";
        valid = false;
      }

      if (Number(item.quantity) < 1) {
        rowErrors.quantity = "Quantity must be at least 1.";
        valid = false;
      }

      return rowErrors;
    });

    errors.speciesList = speciesRowErrors;
    setValidationErrors(errors);
    return valid;
  };

  const generateBatch = async () => {
    try {
      const payload = {
        ...batchData,
        speciesList,
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/batches/generate`,
        payload
      );

      setSuccessData({
        title: "Batch Created Successfully 🌳",
        message: response.data,
        totalTrees,
        zone: batchData.section,
        source: batchData.source,
        speciesList,
      });
      setSubmissionError("");
    } catch (error) {
      console.error(error);
      setSubmissionError("Failed to generate batch. Please try again.");
    }
  };

  const handleGenerate = async () => {
    setSuccessData(null);
    setSubmissionError("");

    if (!validateForm()) {
      return;
    }

    await generateBatch();
  };

  const resetForm = () => {
    setBatchData({
      eventName: "",
      source: "TEAM",
      donorId: "",
      section: "",
    });
    setSpeciesList([
      {
        species: "",
        quantity: 1,
      },
    ]);
    setValidationErrors({
      eventName: "",
      section: "",
      speciesList: [],
    });
    setSuccessData(null);
    setSubmissionError("");
  };

  const removeSpecies = (index) => {
    if (speciesList.length <= 1) {
      return;
    }

    const updatedSpecies = speciesList.filter((_, i) => i !== index);
    setSpeciesList(updatedSpecies);

    const updatedErrors = {
      ...validationErrors,
      speciesList: validationErrors.speciesList.filter((_, i) => i !== index),
    };
    setValidationErrors(updatedErrors);
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/donors`);
      setDonors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalSpeciesTypes = speciesList.length;
  const totalTrees = speciesList.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0
  );
  const treeProgress = Math.min((totalTrees / 30) * 100, 100);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[2rem] bg-gradient-to-r from-emerald-700 via-slate-900 to-emerald-600 p-8 text-white shadow-2xl shadow-slate-900/20 ring-1 ring-white/10">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.32em] text-emerald-200">Plantation management</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              🌿 Create Plantation Batch
            </h1>
            <p className="max-w-3xl text-base leading-8 text-emerald-100/90">
              A plantation batch creates multiple trees at once for a garden zone. Configure event details, donor information, and species planning with clarity and confidence.
            </p>
          </div>
        </header>

        {successData && (
          <section className="mt-8 rounded-[2rem] bg-emerald-50 p-6 shadow-2xl ring-1 ring-emerald-200 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.8fr_1fr] items-start">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-emerald-700">Success</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900">{successData.title}</h2>
                <p className="mt-4 max-w-2xl text-slate-700">
                  {successData.message || "Your plantation batch has been created successfully."}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] bg-white p-4 shadow-sm ring-1 ring-slate-200">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Total Trees Generated</p>
                    <p className="mt-3 text-2xl font-semibold text-slate-900">{successData.totalTrees}</p>
                  </div>
                  <div className="rounded-[1.75rem] bg-white p-4 shadow-sm ring-1 ring-slate-200">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Selected Zone</p>
                    <p className="mt-3 text-2xl font-semibold text-slate-900">{successData.zone}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Next steps</p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full rounded-3xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  Create Another Batch
                </button>
                <button
                  type="button"
                  className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm"
                >
                  View Batch
                </button>
              </div>
            </div>
          </section>
        )}

        <main className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="space-y-8">
            <section className="rounded-[2rem] bg-white p-6 shadow-lg ring-1 ring-slate-200/70 sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Batch information</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">Event details</h2>
                </div>
                <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-100">
                  Create a grouped batch
                </span>
              </div>

              <div className="grid gap-6">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Event Name</span>
                  <input
                    type="text"
                    placeholder="Enter event name"
                    value={batchData.eventName}
                    onChange={(e) =>
                      setBatchData({
                        ...batchData,
                        eventName: e.target.value,
                      })
                    }
                    className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 shadow-sm transition focus:outline-none focus:ring-2 ${
                      validationErrors.eventName
                        ? "border-rose-300 bg-rose-50 focus:border-rose-500 focus:ring-rose-200"
                        : "border-slate-200 bg-slate-50 focus:border-emerald-500 focus:ring-emerald-200"
                    }`}
                  />
                  {validationErrors.eventName && (
                    <p className="mt-2 text-sm text-rose-600">{validationErrors.eventName}</p>
                  )}
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Garden Zone</span>
                  <select
                    value={batchData.section}
                    onChange={(e) =>
                      setBatchData({
                        ...batchData,
                        section: e.target.value,
                      })
                    }
                    className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 shadow-sm transition focus:outline-none focus:ring-2 ${
                      validationErrors.section
                        ? "border-rose-300 bg-rose-50 focus:border-rose-500 focus:ring-rose-200"
                        : "border-slate-200 bg-slate-50 focus:border-emerald-500 focus:ring-emerald-200"
                    }`}
                  >
                    <option value="">Select Garden Zone</option>
                    <option value="Tulsi Van">🌿 Tulsi Van</option>
<option value="Medicinal Garden">🌱 Medicinal Garden</option>
<option value="Butterfly Garden">🦋 Butterfly Garden</option>
<option value="Fruit Orchard">🍎 Fruit Orchard</option>
<option value="Flowering Avenue">🌸 Flowering Avenue</option>
<option value="Community Canopy Area">🌳 Community Canopy Area</option>
<option value="Lotus Pond">🪷 Lotus Pond</option>
<option value="Om Garden">🕉 Om Garden</option>
<option value="Boundary Plantation">🌲 Boundary Plantation</option>
<option value="Reflection Zone">🕊 Reflection Zone</option>
<option value="Waterbody">💧 Waterbody</option>
                  </select>
                  {validationErrors.section && (
                    <p className="mt-2 text-sm text-rose-600">{validationErrors.section}</p>
                  )}
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Source</span>
                  <select
                    value={batchData.source}
                    onChange={(e) =>
                      setBatchData({
                        ...batchData,
                        source: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  >
                    <option value="TEAM">TEAM</option>
                    <option value="DONATED">DONATED</option>
                  </select>
                </label>
              </div>
            </section>

            {batchData.source === "DONATED" && (
              <section className="rounded-[2rem] bg-white p-6 shadow-lg ring-1 ring-slate-200/70 sm:p-8">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Donor information</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">Donation details</h2>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-100">
                    Optional for donated batches
                  </span>
                </div>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Select Donor</span>
                  <select
                    value={batchData.donorId}
                    onChange={(e) =>
                      setBatchData({
                        ...batchData,
                        donorId: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  >
                    <option value="">Select Donor</option>
                    {donors.map((donor) => (
                      <option key={donor.id} value={donor.id}>
                        {donor.name}
                      </option>
                    ))}
                  </select>
                </label>
              </section>
            )}

            <section className="rounded-[2rem] bg-white p-6 shadow-lg ring-1 ring-slate-200/70 sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Species planning</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">Plantation mix</h2>
                </div>
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
                  className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  + Add Species
                </button>
              </div>

              <div className="space-y-4">
                {speciesList.map((item, index) => {
                  const rowErrors = validationErrors.speciesList[index] || {};
                  return (
                    <div
                      key={index}
                      className="relative grid gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[1.8fr_0.9fr]"
                    >
                      <button
                        type="button"
                        disabled={speciesList.length === 1}
                        onClick={() => removeSpecies(index)}
                        className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        ✕
                      </button>

                      <label className="block">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium text-slate-700">Species #{index + 1}</span>
                          {rowErrors.species && (
                            <span className="text-xs font-semibold text-rose-600">
                              {rowErrors.species}
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="Enter species"
                          value={item.species}
                          onChange={(e) => {
                            const updated = [...speciesList];
                            updated[index].species = e.target.value;
                            setSpeciesList(updated);
                          }}
                          className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 shadow-sm transition focus:outline-none focus:ring-2 ${
                            rowErrors.species
                              ? "border-rose-300 bg-rose-50 focus:border-rose-500 focus:ring-rose-200"
                              : "border-slate-200 bg-white focus:border-emerald-500 focus:ring-emerald-200"
                          }`}
                        />
                      </label>

                      <label className="block">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium text-slate-700">Quantity</span>
                          {rowErrors.quantity && (
                            <span className="text-xs font-semibold text-rose-600">
                              {rowErrors.quantity}
                            </span>
                          )}
                        </div>
                        <input
                          type="number"
                          placeholder="Quantity"
                          value={item.quantity}
                          min="1"
                          onChange={(e) => {
                            const updated = [...speciesList];
                            updated[index].quantity = Number(e.target.value);
                            setSpeciesList(updated);
                          }}
                          className={`mt-2 w-full rounded-3xl border px-4 py-3 text-slate-900 shadow-sm transition focus:outline-none focus:ring-2 ${
                            rowErrors.quantity
                              ? "border-rose-300 bg-rose-50 focus:border-rose-500 focus:ring-rose-200"
                              : "border-slate-200 bg-white focus:border-emerald-500 focus:ring-emerald-200"
                          }`}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <section className="rounded-[2rem] bg-emerald-950/95 p-6 text-white shadow-2xl ring-1 ring-white/10 sm:p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">Batch summary</p>
                    <h2 className="text-2xl font-semibold text-white">Drive overview</h2>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-emerald-100">
                    🌱 Live total
                  </div>
                </div>

                <div className="space-y-4 rounded-[1.75rem] bg-white/10 p-5 ring-1 ring-white/10">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-emerald-100/90">🌿 Species types</span>
                    <span className="text-2xl font-semibold text-white">{totalSpeciesTypes}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-emerald-100/90">🌳 Total trees</span>
                    <span className="text-2xl font-semibold text-white">{totalTrees}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-emerald-100/90">📍 Zone</span>
                    <span className="text-2xl font-semibold text-white">{batchData.section || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-emerald-100/90">📦 Source</span>
                    <span className="text-2xl font-semibold text-white">{batchData.source}</span>
                  </div>
                </div>

                <div className="rounded-[1.75rem] bg-white/10 p-5">
                  <div className="flex items-center justify-between text-sm text-emerald-100/80">
                    <span>Batch tree progress</span>
                    <span>{Math.round(treeProgress)}%</span>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-emerald-400 transition-all duration-300"
                      style={{ width: `${treeProgress}%` }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-emerald-100/80">Based on a launch target of 30 trees.</p>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] bg-white p-6 shadow-lg ring-1 ring-slate-200/70 sm:p-8">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Batch preview</p>
                <h2 className="text-2xl font-semibold text-slate-900">Live batch snapshot</h2>

                <div className="grid gap-3 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 text-slate-700">
                  <div className="flex items-center justify-between rounded-3xl bg-white px-4 py-3 shadow-sm">
                    <span className="text-sm font-medium text-slate-600">Garden Zone</span>
                    <span className="font-semibold text-slate-900">{batchData.section || "Not selected"}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-3xl bg-white px-4 py-3 shadow-sm">
                    <span className="text-sm font-medium text-slate-600">Source</span>
                    <span className="font-semibold text-slate-900">{batchData.source}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-3xl bg-white px-4 py-3 shadow-sm">
                    <span className="text-sm font-medium text-slate-600">Total Trees</span>
                    <span className="font-semibold text-slate-900">{totalTrees}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-3xl bg-white px-4 py-3 shadow-sm">
                    <span className="text-sm font-medium text-slate-600">Species Types</span>
                    <span className="font-semibold text-slate-900">{totalSpeciesTypes}</span>
                  </div>
                </div>

                <div className="rounded-[1.75rem] bg-slate-50 p-4">
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Preview list</p>
                  <ul className="mt-3 space-y-3">
                    {speciesList.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between rounded-3xl bg-white px-4 py-3 text-slate-700 shadow-sm"
                      >
                        <span>{item.species ? item.species : `Species #${index + 1}`}</span>
                        <span className="font-semibold text-slate-900">{item.quantity || 0}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </aside>
        </main>

        {submissionError && (
          <div className="mt-8 rounded-[1.75rem] bg-rose-50 p-5 text-rose-700 shadow-sm ring-1 ring-rose-200">
            {submissionError}
          </div>
        )}

        <div className="mt-8">
          <button
            type="button"
            onClick={handleGenerate}
            className="w-full rounded-[2rem] bg-emerald-700 px-8 py-5 text-xl font-semibold text-white shadow-2xl shadow-emerald-700/30 transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300 sm:w-auto sm:px-10"
          >
            Generate Batch 🌳
          </button>
        </div>
      </div>
    </div>
  );
}

export default BatchPage;
