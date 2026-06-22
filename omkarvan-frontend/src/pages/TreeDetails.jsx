import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import hero from "../assets/hero.JPG";
import { API_BASE_URL } from "../config";

function TreeDetails() {
  const { treeCode } = useParams();

  const [tree, setTree] = useState(null);

  useEffect(() => {
    axios.get(
  `${API_BASE_URL}/api/trees/${treeCode}`
)
      .then((response) => {
        setTree(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [treeCode]);

  if (!tree) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="rounded-3xl bg-white px-8 py-12 shadow-xl ring-1 ring-slate-200">
          <p className="text-center text-base font-medium text-slate-600">Loading tree profile...</p>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-slate-100 to-slate-200 px-4 py-8 sm:px-6 lg:px-10">
    <div className="mx-auto max-w-5xl">

      <section className="overflow-hidden rounded-[2rem] bg-white/95 shadow-2xl shadow-slate-200/50 ring-1 ring-slate-200/70">

        <div className="relative">
          <img
            src={hero}
            alt="Omkarvan tree hero"
            className="h-64 w-full object-cover sm:h-80"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-950/10 to-slate-950/80" />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="inline-flex rounded-full bg-emerald-100/90 px-3 py-1 text-xs uppercase tracking-[0.32em] text-emerald-900 shadow-sm">
              🌿 Omkarvan Tree Profile
            </p>

            <h1 className="mt-4 text-4xl font-semibold text-white">
              {tree.species.charAt(0).toUpperCase() + tree.species.slice(1)}
            </h1>

            <p className="mt-2 text-lg italic text-white/80">
              {tree.scientificName || "Scientific name not available"}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">

  <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
      Tree Code
    </p>
    <p className="mt-3 text-lg font-semibold text-slate-900">
      {tree.treeCode}
    </p>
  </div>

  <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
      Scientific Name
    </p>
    <p className="mt-3 text-lg font-semibold text-slate-900">
      {tree.scientificName || "Not Available"}
    </p>
  </div>

  <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
      Source
    </p>
    <p className="mt-3 text-lg font-semibold text-slate-900">
      {tree.source}
    </p>
  </div>

  <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
      Status
    </p>
    <p className="mt-3 text-lg font-semibold text-slate-900">
      {tree.status}
    </p>
  </div>

  <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
      Plant Date
    </p>
    <p className="mt-3 text-lg font-semibold text-slate-900">
      {tree.plantDate || "Not Available"}
    </p>
  </div>

  <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
      Age
    </p>
    <p className="mt-3 text-lg font-semibold text-slate-900">
      {tree.plantDate
  ? `${Math.max(
      0,
      new Date().getFullYear() -
      new Date(tree.plantDate).getFullYear()
    )} years`
  : "Not Available"}
    </p>
  </div>

  <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
  <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
    Garden Zone
  </p>
  <p className="mt-3 text-lg font-semibold text-slate-900">
    {tree.section}
  </p>
</div>

</div>
</div>
</section>
</div>
</div>
);
}

export default TreeDetails;