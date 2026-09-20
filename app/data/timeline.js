export const timelineSeed = [
  { id: "seed-1", type: "call", title: "Call with Sabrina Ahmed", date: "2026-09-19T15:30:00.000Z" },
  { id: "seed-2", type: "text", title: "Text with Tanvir Hasan", date: "2026-09-18T11:00:00.000Z" },
  { id: "seed-3", type: "video", title: "Video with Rafi Chowdhury", date: "2026-09-14T19:00:00.000Z" },
  { id: "seed-4", type: "call", title: "Call with Arian Kabir", date: "2026-09-10T16:00:00.000Z" },
  { id: "seed-5", type: "text", title: "Text with Fahim Rahman", date: "2026-09-08T09:30:00.000Z" },
  { id: "seed-6", type: "call", title: "Call with Shuvo Das", date: "2026-09-04T18:30:00.000Z" },
  { id: "seed-7", type: "video", title: "Video with Mehedi Hasan", date: "2026-09-02T20:00:00.000Z" },
  { id: "seed-8", type: "text", title: "Text with Sanjida Noor", date: "2026-08-30T10:30:00.000Z" },
];

export function getStoredTimeline() {
  if (typeof window === "undefined") return [];
  try {
    const saved = JSON.parse(localStorage.getItem("keenkeeper-timeline") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function sortTimeline(entries) {
  return [...entries].sort(
    (first, second) => new Date(second.date) - new Date(first.date),
  );
}
