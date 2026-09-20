"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../assets/logo.png";
import logoXl from "../../assets/logo-xl.png";
import instagram from "../../assets/instagram.png";
import facebook from "../../assets/facebook.png";
import twitter from "../../assets/twitter.png";

const nav = [
  ["⌂", "Home", "/"],
  ["◷", "Timeline", "/timeline"],
  ["◒", "Stats", "/stats"],
];
export function StatusPill({ status, className = "" }) {
  const colors = {
    overdue: "bg-[#ffe3df] text-[#c9564b]",
    "almost due": "bg-[#fff0d8] text-[#ad7830]",
    "on-track": "bg-[#dff3e9] text-[#368b74]",
  };
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[9px] font-bold tracking-tight ${colors[status]} ${className}`}
    >
      {status}
    </span>
  );
}
export function SectionHeading({ title, description, action, href }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-black tracking-[-0.03em] text-[#1b4642] sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-[#819a95]">{description}</p>
        )}
      </div>
      {action && (
        <Link
          href={href}
          className="shrink-0 text-sm font-bold text-[#45a793] hover:text-[#1d4e4a]"
        >
          {action} <span aria-hidden="true">↗</span>
        </Link>
      )}
    </div>
  );
}
export function EmptyState() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="h-72 animate-pulse rounded-[20px] bg-[#e4efeb]"
        />
      ))}
    </div>
  );
}
export default function AppShell({ children }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-[#f5f7f9]">
      <header className="border-b border-[#e5e9ed] bg-white">
        <div className="mx-auto flex w-[min(94vw,1760px)] items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center">
            <img src={logo.src} alt="KeenKeeper" className="h-8 w-auto sm:h-9" />
          </Link>
          <nav className="flex items-center gap-3">
            {nav.map(([icon, label, href]) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 rounded-[5px] px-3 py-2 text-sm font-bold transition-colors sm:px-4 ${pathname === href ? "bg-[#245b50] text-white" : "text-[#66788a] hover:bg-[#eaf4f0] hover:text-[#245b50]"}`}
              >
                <span className="text-lg font-bold">{icon}</span>
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-[min(94vw,1760px)] px-5 py-12 sm:px-8 sm:py-16">
        {children}
      </main>
      <footer className="bg-[#215947] text-white">
        <div className="mx-auto flex w-[min(94vw,1760px)] flex-col items-center px-5 py-14 text-center sm:px-8">
          <img src={logoXl.src} alt="KeenKeeper" className="h-10 w-auto" />
          <p className="mt-3 max-w-lg text-[10px] text-[#c1d5ce]">
            Your personal shelf of meaningful connections. Browse, tend, and
            nurture the relationships that matter most.
          </p>
          <p className="mt-4 text-xs font-medium">Social Links</p>
          <div className="mt-2 flex gap-2">
            <img src={instagram.src} alt="Instagram" className="h-5 w-5" />
            <img src={facebook.src} alt="Facebook" className="h-5 w-5" />
            <img src={twitter.src} alt="Twitter" className="h-5 w-5" />
          </div>
          <div className="mt-8 flex w-full justify-between border-t border-white/10 pt-4 text-[9px] text-[#a1bdb2]">
            <span>© 2026 KeenKeeper. All rights reserved.</span>
            <span>Privacy Policy　 Terms of Service　 Cookies</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
