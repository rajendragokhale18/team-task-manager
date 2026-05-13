import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">

      {/* BACKGROUND GLOW */}

      <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full"></div>

      <Navbar />

      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;