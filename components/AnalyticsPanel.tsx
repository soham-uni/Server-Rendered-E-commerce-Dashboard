"use client";

import {
  LineChart, Line, XAxis, YAxis,
  PieChart, Pie, Cell,
  BarChart, Bar, ResponsiveContainer,
  Tooltip, TooltipProps
} from "recharts";

const COLORS = ["#34d399", "#60a5fa", "#f472b6", "#facc15", "#a78bfa"];

/* ---------- Typed Tooltip Wrapper (fixes TS 'unknown' error) ---------- */
function SafeTooltip(props: TooltipProps<any, any>) {
  return <Tooltip {...props} />;
}

export default function AnalyticsPanel({ data }: any) {

  const pieData = Object.entries(data.byCategory || {}).map(([name, value]) => ({
    name,
    value: Number(value),
  }));

  return (
    <div className="grid grid-cols-2 gap-8 mt-10">

      {/* Revenue Trend */}
      <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6">
        <h3 className="font-semibold mb-4">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data.revenueTrend}>
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <SafeTooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#34d399"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Category Distribution */}
      <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6">
        <h3 className="font-semibold mb-4">Category Distribution</h3>

        <div className="flex gap-8 items-center">
          <ResponsiveContainer width={240} height={240}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <SafeTooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-2 text-sm">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                <span className="text-slate-300">{String(item.name)}</span>
                <span className="text-slate-400">({item.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stock by Category (Full Width) */}
      <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6">
        <h3 className="font-semibold mb-4">Stock by Category</h3>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={pieData}>
            <XAxis dataKey="name" stroke="#b894b5ff" />
            <YAxis stroke="#94a3b8" />

            <SafeTooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #1e293b",
                borderRadius: "8px",
                color: "#e5e7eb",
              }}
              labelStyle={{ color: "#a7f3d0" }}
            />

            <defs>
              <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Bar dataKey="value" fill="url(#stockGradient)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Products (Full Width) */}
      <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6">
        <h3 className="font-semibold mb-4">Top Products by Inventory Value</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data.topProducts} layout="vertical">
            <XAxis type="number" stroke="#94a3b8" />
            <YAxis dataKey="name" type="category" stroke="#94a3b8" />
            <SafeTooltip />
            <Bar dataKey="value" fill="#60a5fa" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
