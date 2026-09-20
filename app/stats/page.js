"use client";
import { useMemo, useState } from "react";
import AppShell, { SectionHeading } from "../components/AppShell";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { getStoredTimeline, timelineSeed } from "../data/timeline";

const chartColors = ["#245b50", "#45ae9b", "#e5ad51", "#8581c5"];
export default function StatsPage() {
  const [storedEntries] = useState(() => getStoredTimeline());
  const stats = useMemo(() => {
    const entries = [...timelineSeed, ...storedEntries];
    return [
      { label: "Calls", value: entries.filter((entry) => entry.type === "call").length },
      { label: "Texts", value: entries.filter((entry) => entry.type === "text").length },
      { label: "Videos", value: entries.filter((entry) => entry.type === "video").length },
    ];
  }, [storedEntries]);
  const total = stats.reduce((sum, item) => sum + item.value, 0);
  return (
    <AppShell>
      <SectionHeading title="Friendship Analytics" description="" />
      <div className="mx-auto w-full max-w-[960px]">
        <section className="min-h-[360px] rounded-[10px] border border-[#e7ebee] bg-white p-6 shadow-[0_2px_8px_rgba(40,60,70,0.06)] sm:p-8">
          <p className="text-base font-semibold text-[#245b50]">By Interaction Type</p>
          <div className="mt-8 flex flex-col items-center gap-8">
            <div className="relative h-56 w-full max-w-[420px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats} dataKey="value" nameKey="label" innerRadius={72} outerRadius={104} paddingAngle={3} stroke="none">
                    {stats.map((item, index) => (
                      <Cell key={item.label} fill={chartColors[index + 1]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <strong className="text-3xl font-black text-[#1d4e4a]">{total}</strong>
                <span className="text-sm text-[#819a95]">moments</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {stats.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 text-base text-[#63817a]"
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: chartColors[index + 1] }}
                  />
                  {item.label}
                  <strong className="ml-3 text-[#1d4e4a]">{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
