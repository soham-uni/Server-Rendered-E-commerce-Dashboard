"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

export default function DashboardCharts({ data }: any) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="h-64 flex items-center justify-center border border-dashed border-slate-700 rounded-lg text-slate-500">
        No inventory data available
      </div>
    );
  }

  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="w-full min-h-[260px] sm:min-h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <defs>
            <linearGradient id="emeraldGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#34d399" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="name"
            stroke="#94a3b8"
            tick={{ fill: "#cbd5e1", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#334155" }}
          />

          <YAxis
            stroke="#94a3b8"
            tick={{ fill: "#cbd5e1", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#334155" }}
          />

          <Tooltip
            cursor={{ fill: "rgba(52,211,153,0.08)" }}
            contentStyle={{
              backgroundColor: "#020617",
              border: "1px solid #34d399",
              borderRadius: "8px",
              color: "#e5e7eb"
            }}
          />

          <Bar
            dataKey="value"
            radius={[6, 6, 0, 0]}
            fill="url(#emeraldGlow)"
            isAnimationActive
          >
            {chartData.map((_, index) => (
              <Cell key={index} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
