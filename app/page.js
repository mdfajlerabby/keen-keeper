"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import friends from "./data/friends.json";
import AppShell, {
  EmptyState,
  SectionHeading,
  StatusPill,
} from "./components/AppShell";

function FriendCard({ friend }) {
  return (
    <Link
      href={`/friends/${friend.id}`}
      className="group flex min-h-[210px] flex-col items-center rounded-[10px] border border-[#e7ebee] bg-white px-4 py-6 shadow-[0_1px_4px_rgba(40,60,70,0.08)] hover:-translate-y-0.5 hover:shadow-md"
    >
      <img
        src={friend.picture}
        alt={friend.name}
        className="h-16 w-16 rounded-full object-cover transition group-hover:scale-105"
      />
      <h3 className="mt-4 text-base font-bold text-[#263649]">
        {friend.name}
      </h3>
      <p className="mt-2 text-sm text-[#8794a1]">
        {friend.days_since_contact}d ago
      </p>
      <div className="mt-1 flex flex-wrap justify-center gap-1">
        {friend.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#dff4e8] px-2 py-1 text-[10px] font-medium uppercase text-[#3b8262]"
          >
            {tag}
          </span>
        ))}
      </div>
      <StatusPill status={friend.status} className="mt-1" />
    </Link>
  );
}

export default function Home() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 350);
    return () => clearTimeout(timer);
  }, []);
  const overdue = friends.filter(
    (friend) => friend.status !== "on-track",
  ).length;
  return (
    <AppShell>
      <section className="mb-8 text-center">
        <h1 className="text-4xl font-black tracking-[-0.03em] text-[#253347] sm:text-6xl">
          Friends to keep close in your life
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-6 text-[#81909f]">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>
        <Link
          href="#friends"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-[5px] bg-[#245b50] px-5 py-3 text-sm font-bold text-white hover:bg-[#19493f]"
        >
          <span>+</span> Add a Friend
        </Link>
      </section>
      <section className="mx-auto mb-12 grid w-full max-w-[1120px] grid-cols-2 gap-5 sm:grid-cols-4">
        {[
          {
            label: "Total Friends",
            value: friends.length,
            color: "#ffffff",
          },
          {
            label: "On Track",
            value: friends.filter((f) => f.status === "on-track").length,
            color: "#ffffff",
          },
          {
            label: "Need Attention",
            value: overdue,
            color: "#ffffff",
          },
          {
            label: "This month",
            value: friends.length,
            color: "#ffffff",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-[10px] border border-[#e8edf0] bg-white p-7 text-center shadow-[0_1px_4px_rgba(40,60,70,0.05)]"
            style={{ backgroundColor: item.color }}
          >
            <p className="text-4xl font-black text-[#214e49]">{item.value}</p>
            <p className="mt-2 text-sm text-[#82909e]">{item.label}</p>
          </div>
        ))}
      </section>
      <div id="friends">
        <SectionHeading title="Your Friends" />
      </div>
      {!ready ? (
        <EmptyState />
      ) : (
        <div className="mx-auto grid w-full max-w-[1120px] grid-cols-2 gap-5 sm:grid-cols-4">
          {friends.map((friend) => (
            <FriendCard friend={friend} key={friend.id} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
