import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Flame, Clock, BookOpen, Trash2 } from "lucide-react";
import { streak, useNotes, useProfile, useSession, type Note } from "@/lib/store";
import { NeedProfile } from "@/components/SiteHeader";

export const Route = createFileRoute("/notebook")({
  head: () => ({
    meta: [
      { title: "Notebook — Sehel Tech" },
      { name: "description", content: "Log your daily programming progress and keep your study streak." },
      { property: "og:title", content: "Notebook — Sehel Tech" },
      { property: "og:description", content: "A private daily coding journal saved on your device." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Notebook,
});

const today = () => new Date().toISOString().slice(0, 10);

function Notebook() {
  const [profile] = useProfile();
  const [session] = useSession();
  const [notes, setNotes] = useNotes();
  const [form, setForm] = useState({ date: today(), language: "Python", minutes: 30, learned: "" });

  if (profile === undefined || session === undefined || notes === undefined) return null;
  if (!profile || !session) return <NeedProfile />;

  const totalMin = notes.reduce((s, n) => s + n.minutes, 0);
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.learned.trim()) return;
    const note: Note = { ...form, id: crypto.randomUUID(), createdAt: Date.now() };
    setNotes([note, ...notes]);
    setForm({ ...form, learned: "" });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">My Notebook</h1>
      {profile.goal && <p className="mt-1 text-muted-foreground">Goal: {profile.goal}</p>}

      <div className="mt-6 grid grid-cols-3 gap-3">
        <Stat icon={Flame} label="Day streak" value={streak(notes)} />
        <Stat icon={Clock} label="Hours studied" value={(totalMin / 60).toFixed(1)} />
        <Stat icon={BookOpen} label="Entries" value={notes.length} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1.3fr]">
        <form onSubmit={add} className="space-y-3 rounded-2xl border bg-card p-5 shadow-soft">
          <h2 className="font-bold">What did you learn today?</h2>
          <div className="grid grid-cols-2 gap-2">
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="rounded-lg border bg-background px-2 py-2 text-sm" />
            <select value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} className="rounded-lg border bg-background px-2 py-2 text-sm">
              {["Python", "Java", "C++", "HTML/CSS"].map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
          <label className="block text-sm text-muted-foreground">Minutes studied
            <input type="number" min={0} max={1440} value={form.minutes} onChange={(e) => setForm({ ...form, minutes: Math.max(0, Number(e.target.value)) })} className="mt-1 w-full rounded-lg border bg-background px-2 py-2 text-foreground" />
          </label>
          <textarea value={form.learned} onChange={(e) => setForm({ ...form, learned: e.target.value })} rows={6} placeholder="Aaj maine for loop seekha…" className="w-full rounded-lg border bg-background px-3 py-2 text-sm" />
          <button className="w-full rounded-xl bg-primary py-2.5 font-semibold text-primary-foreground">Save note</button>
        </form>

        <div className="space-y-3">
          {notes.length === 0 && <p className="rounded-2xl border border-dashed p-8 text-center text-muted-foreground">No notes yet. Write your first one!</p>}
          {notes.map((n) => (
            <article key={n.id} className="rounded-2xl border bg-card p-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-secondary px-2 py-0.5 font-semibold text-secondary-foreground">{n.language}</span>
                <span className="text-muted-foreground">{n.date} · {n.minutes} min</span>
                <button aria-label="Delete note" onClick={() => setNotes(notes.filter((x) => x.id !== n.id))} className="ml-auto text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm">{n.learned}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Flame; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border bg-card p-4">
      <Icon className="h-5 w-5 text-accent" />
      <p className="mt-2 font-display text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
