"use client";

import Link from "next/link";
import { useState } from "react";
import AppShell, { StatusPill } from "./AppShell";
import callIcon from "../../assets/call.png";
import textIcon from "../../assets/text.png";
import videoIcon from "../../assets/video.png";

const actions = [
  { label: "Call", asset: callIcon.src },
  { label: "Text", asset: textIcon.src },
  { label: "Video", asset: videoIcon.src },
];

function logEntry(type, friend) {
  const current = JSON.parse(
    localStorage.getItem("keenkeeper-timeline") || "[]",
  );
  const entry = {
    id: `${Date.now()}`,
    type: type.toLowerCase(),
    title: `${type} with ${friend.name}`,
    date: new Date().toISOString(),
  };
  localStorage.setItem(
    "keenkeeper-timeline",
    JSON.stringify([entry, ...current]),
  );
}

export default function FriendDetail({ friend }) {
  const [toast, setToast] = useState("");
  function checkIn(type) {
    logEntry(type, friend);
    setToast(`${type} logged with ${friend.name}`);
    setTimeout(() => setToast(""), 2800);
  }
  return (
    <AppShell>
      <Link
        href="/"
        className="mb-6 inline-flex text-sm text-[#6d8983] hover:text-[#1d4e4a]"
      >
        ← Back to your people
      </Link>
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <section className="rounded-[10px] border border-[#e7ebee] bg-white p-6 text-center shadow-[0_1px_4px_rgba(40,60,70,0.08)]">
          <img
            src={friend.picture}
            alt={friend.name}
            className="mx-auto h-20 w-20 rounded-full object-cover"
          />
          <h1 className="mt-4 text-xl font-bold text-[#263649]">
            {friend.name}
          </h1>
          <StatusPill status={friend.status} className="mt-1" />
          <div className="mt-1 flex justify-center gap-1">
            {friend.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#dff4e8] px-2 py-1 text-[10px] font-medium uppercase text-[#3b8262]"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm italic leading-5 text-[#6d7f8e]">
            &quot;{friend.bio.slice(0, 30)}...&quot;
          </p>
          <a
            href={`mailto:${friend.email}`}
            className="mt-2 block text-sm text-[#8996a1]"
          >
            Preferred: email
          </a>
          <div className="mt-3 grid gap-1">
            <button className="border border-[#e7ebee] px-3 py-2.5 text-sm text-[#263649] hover:bg-[#f5f7f9]">
              ◷ &nbsp; Snooze 2 Weeks
            </button>
            <button className="border border-[#e7ebee] px-3 py-2.5 text-sm text-[#263649] hover:bg-[#f5f7f9]">
              ▣ &nbsp; Archive
            </button>
            <button className="border border-[#e7ebee] px-3 py-2.5 text-sm text-[#f05e5e] hover:bg-[#fff1f1]">
              ⌫ &nbsp; Delete
            </button>
          </div>
        </section>
        <section className="space-y-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              ["Days Since Contact", friend.days_since_contact],
              ["Goal (Days)", friend.goal],
              [
                "Next Due",
                new Date(friend.next_due_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }),
              ],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[10px] border border-[#e7ebee] bg-white p-5 text-center shadow-[0_1px_4px_rgba(40,60,70,0.06)]"
              >
                <p className="whitespace-nowrap text-2xl font-bold text-[#245b50]">{value}</p>
                <p className="mt-2 text-xs text-[#81909f]">{label}</p>
              </div>
            ))}
          </div>
          <div className="rounded-[10px] border border-[#e7ebee] bg-white p-5 shadow-[0_1px_4px_rgba(40,60,70,0.06)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-medium text-[#245b50]">
                  Relationship Goal
                </p>
                <h2 className="mt-2 text-sm text-[#66788a]">
                  Connect every{" "}
                  <strong className="text-[#263649]">{friend.goal} days</strong>
                </h2>
              </div>
              <button               className="rounded-[5px] border border-[#e0e6ea] px-3 py-2 text-sm text-[#263649]">
                Edit
              </button>
            </div>
          </div>
          <div className="rounded-[10px] border border-[#e7ebee] bg-white p-5 shadow-[0_1px_4px_rgba(40,60,70,0.06)]">
            <p className="text-base font-medium text-[#245b50]">
              Quick Check-In
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {actions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => checkIn(action.label)}
                  className="flex flex-col items-center justify-center gap-2 rounded-[6px] border border-[#e7ebee] px-3 py-4 text-sm text-[#263649] hover:bg-[#f5f7f9]"
                >
                  <img
                    src={action.asset}
                    alt=""
                    className="h-7 w-7 object-contain"
                  />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[#245b50] px-5 py-3 text-sm font-bold text-white shadow-xl"
        >
          ✓ {toast}
        </div>
      )}
    </AppShell>
  );
}
