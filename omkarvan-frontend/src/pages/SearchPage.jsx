import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";

function SearchPage() {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchTrees = async () => {

    try {

      const response =
        await axios.get(
          `${API_BASE_URL}/api/trees/search?query=${query}`
        );

      setResults(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-600 via-slate-900 to-slate-700 p-8 shadow-2xl shadow-slate-900/20 ring-1 ring-white/10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-emerald-200">Omkarvan search</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Find your tree profile
            </h1>
            <p className="mt-4 text-base leading-7 text-emerald-100/85">
              Search by Tree Code, species, donor, or location to instantly explore memorial garden information with confidence.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] bg-white p-6 shadow-lg ring-1 ring-slate-200/70 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto] items-center">
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                🔎
              </span>
              <input
                type="text"
                placeholder="Tree Code / Species / Donor"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-14 w-full rounded-3xl border border-slate-200 bg-slate-50 pl-12 pr-5 text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <button
              onClick={searchTrees}
              className="inline-flex h-14 items-center justify-center rounded-3xl bg-emerald-700 px-8 text-base font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              Search
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              {results.length > 0
                ? `${results.length} results found`
                : "Enter a query and tap Search to see matching trees."}
            </p>
            {results.length > 0 && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100">
                Premium search experience
              </span>
            )}
          </div>

          <div className="mt-6 grid gap-6">
            {results.map((tree) => (
  <Link
    key={tree.id}
    to={`/tree/${tree.treeCode}`}
    className="block overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-300"
  >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Tree code</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">{tree.treeCode}</h2>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200">
                    {tree.source}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-4 text-slate-700 ring-1 ring-slate-200">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Species</p>
                    <p className="mt-2 text-base font-medium text-slate-900">{tree.species}</p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 text-slate-700 ring-1 ring-slate-200">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Garden zone</p>
                    <p className="mt-2 text-base font-medium text-slate-900">{tree.section}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;