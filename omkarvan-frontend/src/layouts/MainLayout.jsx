import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: "📊",
  },
  {
    label: "Create Batch",
    path: "/batch",
    icon: "🌱",
  },
  {
    label: "Batches",
    path: "/batches",
    icon: "📦",
  },
  {
    label: "Search",
    path: "/search",
    icon: "🔍",
  },
  {
    label: "Print Labels",
    path: "/print-labels/1",
    icon: "🖨",
    hidden: true,
  },
];

function MainLayout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const activeItem = navItems.find(
    (item) => item.path === currentPath || (!item.hidden && currentPath.startsWith(item.path) && item.path !== "/")
  );

  const pageTitle = activeItem ? activeItem.label : "Omkarvan";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:flex lg:min-h-screen">
        <aside className="w-full lg:w-80 xl:w-96 border-b border-slate-200 bg-slate-950 text-white shadow-2xl shadow-slate-900/10 lg:border-r lg:border-b-0">
          <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8 lg:py-10">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-6 shadow-[0_40px_120px_-65px_rgba(15,23,42,0.8)] backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-500/15 text-2xl shadow-inner shadow-emerald-500/10 ring-1 ring-white/10">
                  🌿
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">
                    Omkarvan
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold text-white">
                    Garden Management
                  </h1>
                </div>
              </div>

              <div className="mt-8 space-y-2 border-t border-white/10 pt-6 text-slate-300">
                <p className="text-sm leading-6">
                  Build meaningful memorial gardens with premium planning, batch workflows, and intuitive tree search.
                </p>
              </div>

              <nav className="mt-8 space-y-2">
                {navItems.filter((item) => !item.hidden).map((item) => {
                  const isActive =
                    item.path === currentPath ||
                    (item.path !== "/" && currentPath.startsWith(item.path));

                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      className={`group flex items-center gap-3 rounded-3xl border px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "border-emerald-400/30 bg-emerald-500/10 text-white shadow-lg shadow-emerald-500/10"
                          : "border-transparent text-slate-300 hover:border-slate-700 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-5 text-sm text-slate-400 shadow-lg shadow-slate-950/20">
                <p className="text-emerald-300">🌳 Omkarvan</p>
                <p className="mt-2 font-semibold text-white">Memorial Garden Platform</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <header className="border-b border-slate-200/10 bg-white/90 backdrop-blur-xl shadow-sm shadow-slate-900/5">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5 lg:px-8">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-600">
                  Welcome to Omkarvan
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">
                  {pageTitle}
                </h2>
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-6 py-8 lg:px-8 lg:py-10">
            <div className="rounded-[2rem] bg-white p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.16)] ring-1 ring-slate-200/70">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
