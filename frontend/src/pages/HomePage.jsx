import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

const HomePage = () => {
  return (
    <MainLayout>

      <div className="relative min-h-screen flex items-center justify-center px-6">

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-sm mb-8">
              AI Powered Productivity Platform
            </div>

            <h1 className="text-6xl lg:text-8xl font-black tracking-tight leading-none mb-8">
              Manage
              <br />

              <span className="gradient-text">
                Smarter.
              </span>
            </h1>

            <p className="text-slate-400 text-xl leading-relaxed max-w-xl mb-10">
              Modern AI-powered task
              management platform for
              teams, creators, startups,
              and developers.
            </p>

            <div className="flex flex-wrap gap-4">

              <Link
                to="/register"
                className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
              >
                Start Free
              </Link>

              <Link
                to="/dashboard"
                className="border border-white/10 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl font-semibold transition"
              >
                Live Dashboard
              </Link>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative">

            <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full"></div>

            <div className="relative glass rounded-[32px] p-8 shadow-2xl">

              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">
                  Workspace
                </h2>

                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>

              <div className="space-y-5">

                {[
                  {
                    title:
                      "Design Landing Page",
                    status:
                      "In Progress",
                  },
                  {
                    title:
                      "Integrate AI Tasks",
                    status:
                      "Completed",
                  },
                  {
                    title:
                      "Deploy Platform",
                    status: "Todo",
                  },
                ].map((task) => (
                  <div
                    key={task.title}
                    className="p-5 rounded-2xl bg-black/20 border border-white/10"
                  >
                    <div className="flex items-center justify-between">

                      <h3 className="font-semibold text-lg">
                        {task.title}
                      </h3>

                      <span className="text-cyan-300 text-sm">
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">

                <div className="p-4 rounded-2xl bg-black/20 border border-white/10">
                  <p className="text-slate-400 text-sm">
                    Tasks
                  </p>

                  <h3 className="text-3xl font-bold mt-2">
                    24
                  </h3>
                </div>

                <div className="p-4 rounded-2xl bg-black/20 border border-white/10">
                  <p className="text-slate-400 text-sm">
                    Teams
                  </p>

                  <h3 className="text-3xl font-bold mt-2">
                    12
                  </h3>
                </div>

                <div className="p-4 rounded-2xl bg-black/20 border border-white/10">
                  <p className="text-slate-400 text-sm">
                    Progress
                  </p>

                  <h3 className="text-3xl font-bold mt-2">
                    89%
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;