"use client";
import { useState } from "react";
import AppShell, { SectionHeading } from "../components/AppShell";
import callIcon from "../../assets/call.png";
import textIcon from "../../assets/text.png";
import videoIcon from "../../assets/video.png";
import { getStoredTimeline, sortTimeline, timelineSeed } from "../data/timeline";
const icons = {
  call: callIcon.src,
  text: textIcon.src,
  video: videoIcon.src,
  meetup: "🤝",
};
export default function TimelinePage() {
  const [entries] = useState(() => {
    return sortTimeline([...getStoredTimeline(), ...timelineSeed]);
  });
  const [filter, setFilter] = useState("all");
  const visible =
    filter === "all"
      ? entries
      : entries.filter((entry) => entry.type === filter);
  return (
    <AppShell>
      <SectionHeading title="Timeline" description="" />
      <div className="mb-10">
        <label htmlFor="timeline-filter" className="sr-only">
          Filter timeline
        </label>
        <select
          id="timeline-filter"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="h-[60px] w-full max-w-[370px] appearance-none rounded-[10px] border border-[#e1e7eb] bg-white px-5 pr-12 text-lg text-[#647994] shadow-[0_1px_4px_rgba(40,60,70,0.04)] outline-none transition focus:border-[#8fcfc1] focus:ring-2 focus:ring-[#dff3e9]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%238b96a5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            backgroundPosition: "right 18px center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <option value="all">Filter timeline</option>
          <option value="call">Call</option>
          <option value="text">Text</option>
          <option value="video">Video</option>
          <option value="meetup">Meetup</option>
        </select>
      </div>
      <div className="w-full space-y-5">
        {visible.map((entry) => (
          <article
            key={entry.id}
            className="flex min-h-[86px] items-center gap-5 rounded-[10px] border border-[#e7ebee] bg-white px-5 py-4 shadow-[0_1px_4px_rgba(40,60,70,0.05)] transition hover:-translate-y-0.5 hover:shadow-md sm:px-6"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f1f8f5] text-2xl text-[#3c9a87]">
              {entry.type === "meetup" ? (
                icons[entry.type]
              ) : (
                <img
                  src={icons[entry.type]}
                  alt=""
                  className="h-8 w-8 object-contain"
                />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-base text-[#6b7d8d]">
                <strong className="font-bold text-[#245b50]">
                  {entry.title.split(" with ")[0]}
                </strong>{" "}
                with {entry.title.split(" with ")[1]}
              </p>
              <p className="mt-1 text-sm text-[#81909f]">
                {new Date(entry.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <span className="ml-auto hidden rounded-full bg-[#f2f7f5] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#73908a] sm:inline">
              {entry.type}
            </span>
          </article>
        ))}
        {visible.length === 0 && (
          <p className="rounded-2xl bg-white p-8 text-center text-[#819a95]">
            No check-ins match this filter yet.
          </p>
        )}
      </div>
    </AppShell>
  );
}
