import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Bot, Send, Square, Trash2 } from "lucide-react";
import { useProfile, useSession } from "@/lib/store";
import { NeedProfile } from "@/components/SiteHeader";

export const Route = createFileRoute("/mentor")({
  head: () => ({
    meta: [
      { title: "AI Mentor — Sehel Tech" },
      { name: "description", content: "Chat with an AI programming mentor in Roman Urdu, Urdu or English." },
      { property: "og:title", content: "AI Mentor — Sehel Tech" },
      { property: "og:description", content: "Explanations, challenges and code corrections for Python, Java, C++ and HTML/CSS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MentorPage,
});

const LANGS = ["Python", "Java", "C++", "HTML/CSS"] as const;
const REPLY = ["Roman Urdu", "Urdu", "English"] as const;
const QUICK = ["Loops samjhao example ke saath", "Variables kya hote hain?", "Mujhe aaj ka practice challenge do", "Meri routine ke hisaab se study plan banao"];

function MentorPage() {
  const [profile] = useProfile();
  const [session] = useSession();
  const [language, setLanguage] = useState<string>("Python");
  if (profile === undefined || session === undefined) return null;
  if (!profile || !session) return <NeedProfile />;
  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {LANGS.map((l) => (
          <button
            key={l}
            onClick={() => setLanguage(l)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
              l === language ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-muted"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      {/* One saved conversation per language, remounted on switch */}
      <ChatWindow key={language} language={language} name={profile.name} routine={profile.routine} />
    </div>
  );
}

function ChatWindow({ language, name, routine }: { language: string; name: string; routine: string }) {
  const storeKey = `sehel.chat.${language}`;
  const initial = useMemo<UIMessage[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(storeKey) || "[]");
    } catch {
      return [];
    }
  }, [storeKey]);
  const [replyIn, setReplyIn] = useState<string>("Roman Urdu");
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const bodyRef = useRef({ language, replyIn, studentName: name, routine });
  bodyRef.current = { language, replyIn, studentName: name, routine };
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: () => bodyRef.current }),
    [],
  );
  const { messages, sendMessage, status, stop, setMessages } = useChat({
    id: storeKey,
    messages: initial,
    transport,
    onError: (e) => {
      const m = e.message || "";
      setError(m.includes("429") ? "Too many requests — wait a moment and try again." : m.includes("402") ? "AI credits have run out." : "Couldn't reach the mentor. Check your internet and try again.");
    },
  });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (status === "ready" || status === "error") localStorage.setItem(storeKey, JSON.stringify(messages));
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    if (!busy) inputRef.current?.focus();
  }, [messages, status, storeKey, busy]);

  const send = (text: string) => {
    if (!text.trim() || busy) return;
    setError(null);
    sendMessage({ text });
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col rounded-2xl border bg-card shadow-soft">
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-accent-foreground"><Bot className="h-5 w-5" /></span>
        <div className="flex-1">
          <p className="font-display font-bold">{language} Mentor</p>
          <p className="text-xs text-muted-foreground">Explains, challenges & corrects your code</p>
        </div>
        <select value={replyIn} onChange={(e) => setReplyIn(e.target.value)} className="rounded-lg border bg-background px-2 py-1.5 text-sm">
          {REPLY.map((r) => <option key={r}>{r}</option>)}
        </select>
        <button
          aria-label="Clear chat"
          onClick={() => { setMessages([]); localStorage.removeItem(storeKey); }}
          className="grid h-8 w-8 place-items-center rounded-lg hover:bg-muted"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-lg font-semibold">Assalam-o-Alaikum {name.split(" ")[0]}! 👋</p>
            <p className="text-sm text-muted-foreground">Kya seekhna chahte ho aaj?</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {QUICK.map((q) => (
                <button key={q} onClick={() => send(q)} className="rounded-full border bg-background px-3 py-1.5 text-sm hover:bg-muted">{q}</button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={m.role === "user" ? "flex justify-end" : ""}>
            <div className={m.role === "user" ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2 text-primary-foreground" : "prose-chat max-w-full text-sm leading-relaxed"}>
              {m.parts.map((p, i) =>
                p.type === "text" ? (
                  m.role === "user" ? <p key={i} className="whitespace-pre-wrap">{p.text}</p> : <ReactMarkdown key={i}>{p.text}</ReactMarkdown>
                ) : null,
              )}
            </div>
          </div>
        ))}
        {status === "submitted" && <p className="animate-pulse text-sm text-muted-foreground">Mentor soch raha hai…</p>}
        {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
        <div ref={endRef} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-end gap-2 border-t p-3">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
          rows={2}
          placeholder="Apna sawal ya code yahan likhein…"
          className="flex-1 resize-none rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        {busy ? (
          <button type="button" onClick={() => stop()} aria-label="Stop" className="grid h-11 w-11 place-items-center rounded-xl bg-muted"><Square className="h-4 w-4" /></button>
        ) : (
          <button type="submit" aria-label="Send" className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground"><Send className="h-4 w-4" /></button>
        )}
      </form>
    </div>
  );
}
