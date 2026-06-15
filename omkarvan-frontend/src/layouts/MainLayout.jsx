import { Link } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100">

      <div className="w-64 bg-green-700 text-white p-6">

        <h1 className="text-2xl font-bold mb-8">
          🌳 Omkarvan
        </h1>

        <nav className="space-y-4">

          <Link
            to="/"
            className="block hover:text-green-200"
          >
            Dashboard
          </Link>

          <Link
            to="/batch"
            className="block hover:text-green-200"
          >
            Create Batch
          </Link>

          <Link
            to="/batches"
            className="block hover:text-green-200"
          >
            Batches
          </Link>

          <Link
            to="/search"
            className="block hover:text-green-200"
          >
            Search
        </Link>

        </nav>
      </div>

      <div className="flex-1 p-8">
        {children}
      </div>

    </div>
  );
}

export default MainLayout;