import { Link, useNavigate } from "react-router-dom";

import {
  logoutUser,
  getCurrentUser,
} from "../services/authService";

const Navbar = () => {
  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-2xl bg-black/20">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-black tracking-tight"
        >
          <span className="gradient-text">
            FlowState
          </span>
        </Link>

        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="text-slate-300 hover:text-white transition"
          >
            Home
          </Link>

          {token ? (
            <>
              <Link
                to="/dashboard"
                className="text-slate-300 hover:text-white transition"
              >
                Dashboard
              </Link>

              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-sm">
                {user?.name}
              </div>

              <button
                onClick={handleLogout}
                className="bg-white text-black hover:bg-slate-200 px-5 py-2 rounded-full font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-300 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-black hover:bg-slate-200 px-5 py-2 rounded-full font-semibold transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;