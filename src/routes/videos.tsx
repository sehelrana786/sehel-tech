import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Video Lectures — Sehel Tech" },
      { name: "description", content: "Curated full-course YouTube lectures for Python, Java, C++ and HTML/CSS." },
      { property: "og:title", content: "Video Lectures — Sehel Tech" },
      { property: "og:description", content: "Free, curated programming courses in Hindi/Urdu and English." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Videos,
});

// Curated well-known full courses (YouTube video IDs).
const COURSES: Record<string, { id: string; title: string; by: string }[]> = {
  Python: [
    { id: "UrsmFxEIp5k", title: "Python Full Course (Hindi/Urdu)", by: "CodeWithHarry" },
    { id: "rfscVS0vtbw", title: "Learn Python – Full Course for Beginners", by: "freeCodeCamp" },
  ],
  Java: [
    { id: "UmnCZ7-9yDY", title: "Java Tutorial for Beginners (Hindi/Urdu)", by: "Apna College" },
    { id: "eIrMbAQSU34", title: "Java Tutorial for Beginners", by: "Programming with Mosh" },
  ],
  "C++": [
    { id: "j8nAHeVKL08", title: "C++ Full Course (Hindi/Urdu)", by: "CodeWithHarry" },
    { id: "vLnPwxZdW4Y", title: "C++ Tutorial for Beginners", by: "freeCodeCamp" },
  ],
  "HTML/CSS": [
    { id: "HcOc7P5BMi4", title: "HTML Full Course (Hindi/Urdu)", by: "CodeWithHarry" },
    { id: "mU6anWqZJcc", title: "Learn HTML & CSS – Full Course", by: "freeCodeCamp" },
  ],
};

function Videos() {
  const [lang, setLang] = useState("Python");
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">Video Lectures</h1>
      <p className="mt-1 text-muted-foreground">Hand-picked complete courses. Watch, then practise with your AI Mentor.</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {Object.keys(COURSES).map((l) => (
          <button key={l} onClick={() => setLang(l)} className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${l === lang ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-muted"}`}>
            {l}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {(COURSES[lang] ?? []).map((v) => (
          <article key={v.id} className="overflow-hidden rounded-2xl border bg-card shadow-soft">
            <div className="aspect-video">
              <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${v.id}`} title={v.title} loading="lazy" allowFullScreen allow="accelerometer; encrypted-media; picture-in-picture" />
            </div>
            <div className="p-4">
              <h3 className="font-bold">{v.title}</h3>
              <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">{v.by} · Open on YouTube</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
