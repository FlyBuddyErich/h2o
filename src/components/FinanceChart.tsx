"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { useFinanceStore } from "../store/financeStore";
import { formatCurrency } from "../utils/formatters";

const FinanceChart = () => {
  const { chartData, period, selectedPoint, setSelectedPoint } =
    useFinanceStore();
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);
  const [selectedDotData, setSelectedDotData] = useState<any>(null);

  useEffect(() => {
    setSelectedPoint(null);
    setSelectedDotData(null);
  }, [period, setSelectedPoint]);

  const handleMouseEnter = (dataKey: string) => {
    setHoveredLine(dataKey);
  };

  const handleMouseLeave = () => {
    setHoveredLine(null);
  };

  const getLineOpacity = (dataKey: string) => {
    if (!hoveredLine) return 1;
    return hoveredLine === dataKey ? 1 : 0.3;
  };

  const handleDotClick = (data: any) => {
    setSelectedDotData(data);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-4xl">
          <p className="text-gray-600 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: ₽ {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[470px] flex flex-col pb-4">
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            onMouseMove={(e) => {
              if (e.activePayload) {
                setSelectedPoint({
                  value: e.activePayload[0].value,
                  x: e.chartX,
                  y: e.chartY,
                });
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#e0e0e0" }}
            />
            <YAxis hide={true} />
            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="revenue"
              name="Выручка"
              stroke="#73CF7A"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 8,
                onClick: (data) =>
                  handleDotClick({ ...data.payload, dataKey: "revenue" }),
              }}
              opacity={getLineOpacity("revenue")}
              onMouseEnter={() => handleMouseEnter("revenue")}
              onMouseLeave={handleMouseLeave}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              name="Затраты"
              stroke="#30C7DC"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 8,
                onClick: (data) =>
                  handleDotClick({ ...data.payload, dataKey: "expenses" }),
              }}
              opacity={getLineOpacity("expenses")}
              onMouseEnter={() => handleMouseEnter("expenses")}
              onMouseLeave={handleMouseLeave}
            />
            <Line
              type="monotone"
              dataKey="profit"
              name="Прибыль"
              stroke="#45AAF2"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 8,
                onClick: (data) =>
                  handleDotClick({ ...data.payload, dataKey: "profit" }),
              }}
              opacity={getLineOpacity("profit")}
              onMouseEnter={() => handleMouseEnter("profit")}
              onMouseLeave={handleMouseLeave}
            />
            <Line
              type="monotone"
              dataKey="debt"
              name="Задолженность"
              stroke="#F5E230"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 8,
                onClick: (data) =>
                  handleDotClick({ ...data.payload, dataKey: "debt" }),
              }}
              opacity={getLineOpacity("debt")}
              onMouseEnter={() => handleMouseEnter("debt")}
              onMouseLeave={handleMouseLeave}
            />
            <Line
              type="monotone"
              dataKey="total"
              name="Итог"
              stroke="#AC74FC"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 8,
                onClick: (data) =>
                  handleDotClick({ ...data.payload, dataKey: "total" }),
              }}
              opacity={getLineOpacity("total")}
              onMouseEnter={() => handleMouseEnter("total")}
              onMouseLeave={handleMouseLeave}
            />

            {selectedDotData && (
              <ReferenceDot
                x={selectedDotData.name}
                y={selectedDotData[selectedDotData.dataKey]}
                r={8}
                fill="#fff"
                stroke={
                  selectedDotData.dataKey === "revenue"
                    ? "#4ade80"
                    : selectedDotData.dataKey === "expenses"
                    ? "#3b82f6"
                    : selectedDotData.dataKey === "profit"
                    ? "#8b5cf6"
                    : selectedDotData.dataKey === "total"
                    ? "#a855f7"
                    : "#f59e0b"
                }
                strokeWidth={3}
              />
            )}

            {selectedPoint && (
              <text
                x={selectedPoint.x}
                y={selectedPoint.y - 15}
                textAnchor="middle"
                fill="#333"
                fontSize={12}
                fontWeight="bold"
              >
                ₽ {formatCurrency(selectedPoint.value)}
              </text>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap justify-between px-4 pb-"
        >
          {[
            {
              color: "#73CF7A",
              label: "Выручка",
              value: chartData[chartData.length - 1]?.revenue || 0,
              hasExclamation: false,
            },
            {
              color: "#30C7DC",
              label: "Затраты",
              value: chartData[chartData.length - 1]?.expenses || 0,
              hasExclamation: true,
            },
            {
              color: "#45AAF2",
              label: "Прибыль",
              value: chartData[chartData.length - 1]?.profit || 0,
              hasExclamation: true,
            },
            {
              color: "#F5E230",
              label: "Задолженность",
              value: chartData[chartData.length - 1]?.debt || 0,
              hasExclamation: false,
            },
            {
              color: "#AC74FC",
              label: "Итог",
              value: chartData[chartData.length - 1]?.total || 0,
              hasExclamation: false,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center relative"
                style={{ backgroundColor: item.color }}
              >
                {item.hasExclamation && (
                  <span className="text-white font-bold text-md">!</span>
                )}
              </div>
              <div className="flex flex-col">
                <div className="text-sm text-[#6D7986]">{item.label}</div>
                <div className="text-sm font-medium">
                  ₽ {formatCurrency(item.value)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FinanceChart;
