import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, PlayCircle, NotebookPen, ShieldCheck } from "lucide-react";
import hero from "@/assets/hero-students.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sehel Tech — Your AI Programming Mentor" },
      { name: "description", content: "Learn Python, Java, C++ and HTML/CSS with an AI mentor that speaks Roman Urdu, Urdu and English." },
      { property: "og:title", content: "Sehel Tech — Your AI Programming Mentor" },
      { property: "og:description", content: "AI mentor, video lectures and a daily study notebook for students." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const FEATURES = [
  { icon: Bot, title: "AI Mentor", text: "Ask in Roman Urdu, Urdu or English. Get explanations, challenges and code fixes.", to: "/mentor" },
  { icon: PlayCircle, title: "Video Lectures", text: "Hand-picked full courses for Python, Java, C++ and HTML/CSS.", to: "/videos" },
  { icon: NotebookPen, title: "Daily Notebook", text: "Log what you learned each day and keep your study streak alive.", to: "/notebook" },
] as const;

function Home() {
  return (
    <div className="bg-hero">
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
            Free for students
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">
            Your AI <span className="text-primary">Programming</span> Mentor
          </h1>
          <p className="mt-2 font-urdu text-2xl text-muted-foreground" dir="rtl">سہیل ٹیک — کوڈنگ سیکھیں آسانی سے</p>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            Learn coding step by step, in your own language, at your own pace.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/mentor" className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-soft transition hover:opacity-90">
              Start learning
            </Link>
            <Link to="/profile" className="rounded-xl border bg-card px-6 py-3 font-semibold transition hover:bg-muted">
              Create profile
            </Link>
          </div>
        </div>
        <img src={hero} alt="Students learning to code together" width={1280} height={960} className="w-full rounded-3xl object-cover shadow-soft" />
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-16 md:grid-cols-3">
        {FEATURES.map((f) => (
          <Link key={f.to} to={f.to} className="group rounded-2xl border bg-card p-6 transition hover:-translate-y-1 hover:shadow-soft">
            <f.icon className="h-8 w-8 text-primary" />
            <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
          </Link>
        ))}
      </section>

      <p className="flex items-center justify-center gap-2 pb-10 text-sm text-muted-foreground">
        <ShieldCheck className="h-4 w-4" /> Your notes and profile stay private on your own device.
      </p>
    </div>
  );
}
