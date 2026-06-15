import { Link } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-[#F8F6F1]">

      {/* Sidebar */}
      <div className="w-72 bg-[#234F32] text-white flex flex-col">

        <div className="p-8 border-b border-white/10">

          <h1 className="text-3xl font-bold">
            🌳 Omkarvan
          </h1>

          <p className="text-sm text-gray-300 mt-2">
            Memorial Garden Management
          </p>

        </div>

        <nav className="flex-1 p-6 space-y-3">

          <Link
            to="/"
            className="
              block
              px-4
              py-3
              rounded-xl
              hover:bg-white/10
              transition
            "
          >
            📊 Dashboard
          </Link>

          <Link
            to="/batch"
            className="
              block
              px-4
              py-3
              rounded-xl
              hover:bg-white/10
              transition
            "
          >
            🌱 Create Batch
          </Link>

          <Link
            to="/batches"
            className="
              block
              px-4
              py-3
              rounded-xl
              hover:bg-white/10
              transition
            "
          >
            📦 Batches
          </Link>

          <Link
            to="/search"
            className="
              block
              px-4
              py-3
              rounded-xl
              hover:bg-white/10
              transition
            "
          >
            🔍 Search
          </Link>

        </nav>

        <div className="p-6 border-t border-white/10">

          <div className="bg-white/10 rounded-xl p-4">

            <p className="text-sm text-gray-300">
              Garden Area
            </p>

            <p className="font-bold text-lg">
              25,000 sq ft
            </p>

            <p className="text-sm text-gray-300 mt-2">
              A place of remembrance,
              reflection and rejuvenation.
            </p>

          </div>

        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        {children}

      </div>

    </div>
  );
}

export default MainLayout;