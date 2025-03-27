"use client";

import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useFinanceStore } from "../store/financeStore";
import avatar from "../assets/avatar.png";

const Header = () => {
  const { activeTab, setActiveTab } = useFinanceStore();

  return (
    <header className="bg-white border-b border-gray-200 py-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button className="p-4 text-gray-400">
            <ChevronLeft size={20} />
          </button>
          <button className="p-4 text-gray-400">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="flex border-b-2 border-gray-400">
            <div
              className={`tab ${activeTab === "employees" ? "active" : ""}`}
              onClick={() => setActiveTab("employees")}
            >
              Свод данных по сотрудникам
            </div>
            <div
              className={`tab ${activeTab === "company" ? "active" : ""}`}
              onClick={() => setActiveTab("company")}
            >
              Сводный отчет внутри компании
            </div>
            <div
              className={`tab ${activeTab === "sales" ? "active" : ""}`}
              onClick={() => setActiveTab("sales")}
            >
              Сводный отчет по сделкам
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pr-8">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <img
              src={avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pr-24 pl-6">
            <div className="font-medium">Kristina</div>
            <div className="text-xs text-gray-500">Менеджер продаж</div>
          </div>
          <ChevronDown size={16} className="text-gray-400 ml-8" />
        </div>
      </div>
    </header>
  );
};

export default Header;
