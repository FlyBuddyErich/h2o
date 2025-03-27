"use client";

import { motion } from "framer-motion";
import SummaryCards from "./SummaryCards";
import FinanceChart from "./FinanceChart";
import ProblemZones from "./ProblemZones";
import { useFinanceStore } from "../store/financeStore";

const Dashboard = () => {
  const { period, setPeriod } = useFinanceStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto"
    >
      <h1 className="text-2xl font-semibold mb-6">Сводный отчет</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SummaryCards />
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Общая статистика</h2>
              <div className="flex gap-4">
                {" "}
                <button
                  className={`pb-1 text-sm transition-all cursor-pointer ${
                    period === "week"
                      ? "text-black border-b-3 border-[#54D3C2]"
                      : "text-gray-400"
                  }`}
                  onClick={() => setPeriod("week")}
                >
                  Неделя
                </button>
                <button
                  className={`pb-1 text-sm transition-all cursor-pointer ${
                    period === "month"
                      ? "text-black border-b-2 border-[#54D3C2]"
                      : "text-gray-400"
                  }`}
                  onClick={() => setPeriod("month")}
                >
                  Месяц
                </button>
                <button
                  className={`pb-1 text-sm transition-all cursor-pointer ${
                    period === "year"
                      ? "text-black border-b-2 border-[#54D3C2]"
                      : "text-gray-400"
                  }`}
                  onClick={() => setPeriod("year")}
                >
                  Год
                </button>
              </div>
            </div>

            <FinanceChart />
          </div>
        </div>

        <div className="lg:col-span-1">
          <ProblemZones />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
