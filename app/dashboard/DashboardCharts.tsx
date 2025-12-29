"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function DashboardCharts({ data }: any) {

  if (!data || typeof data !== "object") {
    return <div className="p-4 text-gray-400">Loading analytics...</div>;
  }
    
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="h-80 border rounded p-4">
      <h2 className="font-semibold mb-2">Stock by Category</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
