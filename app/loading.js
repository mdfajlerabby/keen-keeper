import AppShell, { EmptyState } from "./components/AppShell";
export default function Loading() {
  return (
    <AppShell>
      <div className="mb-8 h-24 w-2/3 animate-pulse rounded-2xl bg-[#e4efeb]" />
      <EmptyState />
    </AppShell>
  );
}
