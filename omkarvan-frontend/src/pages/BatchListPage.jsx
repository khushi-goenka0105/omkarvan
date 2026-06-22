import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

function BatchListPage() {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/batches`
      ); 

      setBatches(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-200/80">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">
                Plantation management
              </p>
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                  🌿 Plantation Batches
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  A premium overview of your batches, with fast access to batch details, zone insights, and source tracking.
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-900 shadow-sm ring-1 ring-emerald-200">
              {batches.length} batch{batches.length === 1 ? "" : "es"}
            </div>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {batches.map((batch) => (
            <article
              key={batch.id}
              className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
                    {batch.source}
                  </span>
                  <h2 className="mt-5 text-2xl font-semibold text-slate-900">
                    {batch.eventName}
                  </h2>
                  <p className="mt-3 text-sm text-slate-500">
                    Batch code <span className="font-semibold text-slate-900">{batch.batchCode}</span>
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 px-4 py-3 text-right text-sm font-semibold text-slate-800">
                  {batch.totalTrees}
                  <p className="mt-1 text-xs font-medium text-slate-500">Trees</p>
                </div>
              </div>

              <div className="mt-8 grid gap-3 rounded-[1.5rem] bg-slate-50 p-4 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-800">Zone</span>
                  <span className="text-slate-500">{batch.zone || "N/A"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-800">Source</span>
                  <span className="text-slate-500">{batch.source}</span>
                </div>
              </div>

              <Link
                to={`/batches/${batch.id}`}
                className="mt-6 inline-flex items-center justify-center rounded-3xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-emerald-800"
              >
                View Details →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BatchListPage;