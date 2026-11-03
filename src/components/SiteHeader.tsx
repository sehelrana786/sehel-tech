import { Link } from "@tanstack/react-router";
import { Moon, Sun, Code2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useProfile, useSession } from "@/lib/store";

const NAV = [
  { to: "/mentor", label: "AI Mentor" },
  { to: "/videos", label: "Videos" },
  { to: "/notebook", label: "Notebook" },
  { to: "/profile", label: "Profile" },
] as const;

export function SiteHeader() {
  const [dark, setDark] = useState(false);
  const [profile] = useProfile();
  const [session] = useSession();

  useEffect(() => {
    setDark(localStorage.getItem("sehel.theme") === "dark");
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("sehel.theme", next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Code2 className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-bold">Sehel Tech</span>
          </span>
        </Link>
        <nav className="ml-auto hidden gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <span className="ml-auto text-sm text-muted-foreground md:ml-2">
          {session && profile ? `Hi, ${profile.name.split(" ")[0]}` : ""}
        </span>
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="grid h-9 w-9 place-items-center rounded-lg border transition hover:bg-muted"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
      <nav className="flex justify-around border-t md:hidden">
        {NAV.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            className="flex-1 py-2 text-center text-xs font-medium text-muted-foreground"
            activeProps={{ className: "text-primary" }}
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

/** Shown on pages that need a local profile. */
export function NeedProfile() {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h2 className="text-2xl font-bold">Sign in first</h2>
      <p className="mt-2 text-muted-foreground">Create your free profile so your progress stays saved on this device.</p>
      <Link to="/profile" className="mt-6 inline-block rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">
        Go to Profile
      </Link>
    </div>
  );
}
