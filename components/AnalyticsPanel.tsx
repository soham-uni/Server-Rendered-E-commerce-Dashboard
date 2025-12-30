"use client";

import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell,
  BarChart, Bar, ResponsiveContainer
} from "recharts";

const COLORS = ["#34d399", "#60a5fa", "#f472b6", "#facc15", "#a78bfa"];

/* ---------- Custom Tooltip ---------- */
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-[#020617] border border-emerald-400/50 rounded-lg px-3 py-2 shadow-lg text-sm">
      <p className="text-emerald-300 font-medium">{label}</p>
      <p className="text-slate-200">
        {payload[0].value}
      </p>
    </div>
  );
}

export default function AnalyticsPanel({ data }: any) {

  const pieData = Object.entries(data.byCategory || {}).map(
    ([name, value]) => ({ name, value: Number(value) })
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

      {/* Revenue Trend */}
      <Card title="Revenue Trend">
        <ChartBox>
          <LineChart data={data.revenueTrend}>
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip content={<ChartTooltip />} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#34d399"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ChartBox>
      </Card>

      {/* Category Distribution */}
      <Card title="Category Distribution">
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <ChartBox height={220} width={220}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={85}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ChartBox>

          <div className="space-y-2 text-sm">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                <span className="text-slate-300">{item.name}</span>
                <span className="text-slate-400">({item.value})</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Stock by Category */}
      <Card title="Stock by Category" full>
        <ChartBox>
          <BarChart data={pieData} barCategoryGap="20%">
            <defs>
              <linearGradient id="emeraldBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={0.15} />
              </linearGradient>
            </defs>

            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip content={<ChartTooltip />} />
            <Bar
              dataKey="value"
              fill="url(#emeraldBar)"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ChartBox>
      </Card>

      {/* Top Products */}
      <Card title="Top Products by Inventory Value" full>
        <ChartBox>
          <BarChart data={data.topProducts} layout="vertical">
            <defs>
              <linearGradient id="blueBar" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={1} />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.25} />
              </linearGradient>
            </defs>

            <XAxis type="number" stroke="#94a3b8" />
            <YAxis dataKey="name" type="category" stroke="#94a3b8" />
            <Tooltip content={<ChartTooltip />} />
            <Bar
              dataKey="value"
              fill="url(#blueBar)"
              radius={[0, 10, 10, 0]}
            />
          </BarChart>
        </ChartBox>
      </Card>

    </div>
  );
}

/* ---------- UI Helpers ---------- */

function Card({ title, children, full }: any) {
  return (
    <div className={`bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-5 ${full ? "lg:col-span-2" : ""}`}>
      <h3 className="font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function ChartBox({ children, height = 260, width = "100%" }: any) {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width={width} height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}
