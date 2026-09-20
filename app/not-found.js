import Link from "next/link";
import AppShell from "./components/AppShell";
export default function NotFound() {
  return (
    <AppShell>
      <div className="mx-auto max-w-xl py-24 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#45a793]">
          404
        </p>
        <h1 className="mt-4 text-5xl font-black text-[#1b4642]">
          That page wandered off.
        </h1>
        <p className="mt-4 leading-7 text-[#78928d]">
          We could not find the friend or page you were looking for.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#1d4e4a] px-6 py-3 text-sm font-bold text-white"
        >
          Back to your people
        </Link>
      </div>
    </AppShell>
  );
}
