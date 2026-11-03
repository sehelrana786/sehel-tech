import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { hashPin, useProfile, useSession } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & Sign in — Sehel Tech" },
      { name: "description", content: "Create your private student profile, saved on your own device." },
      { property: "og:title", content: "Profile — Sehel Tech" },
      { property: "og:description", content: "Sign in to keep your notes and progress saved." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProfilePage,
});

const input = "w-full rounded-lg border bg-background px-3 py-2 text-sm";

function ProfilePage() {
  const [profile, setProfile] = useProfile();
  const [session, setSession] = useSession();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", pin: "", routine: "", goal: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (profile) setForm({ name: profile.name, pin: "", routine: profile.routine, goal: profile.goal });
  }, [profile]);

  if (profile === undefined || session === undefined) return null;

  // Sign-in screen for an existing profile
  if (profile && !session) {
    return (
      <Card title={`Welcome back, ${profile.name}`}>
        <form onSubmit={async (e) => {
          e.preventDefault();
          if ((await hashPin(form.pin)) === profile.pin) { setSession(true); navigate({ to: "/notebook" }); }
          else setMsg("Wrong PIN, try again.");
        }} className="space-y-3">
          <input type="password" inputMode="numeric" placeholder="Your 4-digit PIN" value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value })} className={input} />
          {msg && <p className="text-sm text-destructive">{msg}</p>}
          <button className="w-full rounded-xl bg-primary py-2.5 font-semibold text-primary-foreground">Sign in</button>
        </form>
      </Card>
    );
  }

  return (
    <Card title={profile ? "Your profile" : "Create your profile"}>
      <form onSubmit={async (e) => {
        e.preventDefault();
        if (!form.name.trim()) return setMsg("Please enter your name.");
        if (!profile && !/^\d{4,8}$/.test(form.pin)) return setMsg("PIN must be 4–8 digits.");
        if (form.pin && !/^\d{4,8}$/.test(form.pin)) return setMsg("PIN must be 4–8 digits.");
        const pin = form.pin ? await hashPin(form.pin) : profile!.pin;
        setProfile({ name: form.name.trim(), pin, routine: form.routine, goal: form.goal });
        setSession(true);
        setMsg("Saved on this device ✓");
        if (!profile) navigate({ to: "/mentor" });
      }} className="space-y-3">
        <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
        <input type="password" inputMode="numeric" placeholder={profile ? "New PIN (leave empty to keep)" : "Choose a 4-digit PIN"} value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value })} className={input} />
        <textarea rows={3} placeholder="Daily routine, e.g. College 8–2, free after 7pm" value={form.routine} onChange={(e) => setForm({ ...form, routine: e.target.value })} className={input} />
        <input placeholder="Goal, e.g. Become a web developer" value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} className={input} />
        {msg && <p className="text-sm text-primary">{msg}</p>}
        <button className="w-full rounded-xl bg-primary py-2.5 font-semibold text-primary-foreground">Save</button>
      </form>
      {profile && (
        <button onClick={() => { setSession(false); navigate({ to: "/", replace: true }); }} className="mt-3 w-full rounded-xl border py-2.5 text-sm font-semibold hover:bg-muted">
          Sign out
        </button>
      )}
      <p className="mt-4 text-center text-xs text-muted-foreground">Your data is stored privately in this browser only.</p>
    </Card>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-hero px-4 py-14">
      <div className="mx-auto max-w-md rounded-2xl border bg-card p-6 shadow-soft">
        <h1 className="mb-5 text-2xl font-extrabold">{title}</h1>
        {children}
      </div>
    </div>
  );
}
