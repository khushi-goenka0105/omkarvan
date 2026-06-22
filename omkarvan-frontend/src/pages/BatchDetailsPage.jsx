import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

function BatchDetailsPage() {
  const { batchId } = useParams();

  const [trees, setTrees] = useState([]);

  useEffect(() => {
    fetchTrees();
  }, []);

  const fetchTrees = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/batches/${batchId}/trees`
      );

      setTrees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] border border-emerald-100 bg-white/90 p-6 shadow-sm shadow-emerald-100/60 backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Batch overview
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                🌿 Batch Details
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Review the full tree list for batch <span className="font-semibold text-slate-900">{batchId}</span> and access tree details using the code links.
              </p>
            </div>

            <Link
              to={`/print-labels/${batchId}`}
              className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              🖨 Print Labels
            </Link>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Trees</h2>
              <p className="mt-2 text-sm text-slate-500">
                Click a tree code to open its detail page.
              </p>
            </div>
            <div className="rounded-3xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {trees.length} tree{trees.length === 1 ? "" : "s"} in this batch
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {trees.map((tree) => (
              <article
                key={tree.id}
                className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <Link
                      to={`/tree/${tree.treeCode}`}
                      className="text-xl font-semibold text-emerald-800 transition hover:text-emerald-900 hover:underline"
                    >
                      {tree.treeCode}
                    </Link>
                    <p className="mt-2 text-sm text-slate-500">
                      {tree.species}
                    </p>
                  </div>

                  <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    {tree.status}
                  </span>
                </div>

                <div className="mt-6 space-y-3 text-sm text-slate-600">
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-800">Zone</p>
                    <p className="mt-2 text-sm text-slate-600">{tree.section}</p>
                  </div>
                  <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
  <p className="text-sm font-semibold text-slate-800">
    Species
  </p>

  <p className="mt-2 text-sm text-slate-600">
    {tree.species}
  </p>
</div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default BatchDetailsPage;