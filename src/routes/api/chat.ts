import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, type UIMessage } from "ai";
import { createResponsesCall } from "@/server/responses";

const LANGS = ["Python", "Java", "C++", "HTML/CSS"] as const;
const REPLY = ["Roman Urdu", "Urdu", "English"] as const;

// Streaming AI mentor endpoint. Keeps the AI key and model call on the server.
export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "AI is not configured" }, { status: 401 });

        const body = (await request.json()) as {
          messages?: UIMessage[];
          language?: string;
          replyIn?: string;
          studentName?: string;
          routine?: string;
        };
        if (!Array.isArray(body.messages) || body.messages.length === 0) {
          return Response.json({ error: "No messages" }, { status: 400 });
        }
        const language = LANGS.find((l) => l === body.language) ?? "Python";
        const replyIn = REPLY.find((r) => r === body.replyIn) ?? "Roman Urdu";
        const name = (body.studentName ?? "").slice(0, 60);
        const routine = (body.routine ?? "").slice(0, 400);

        const instructions = `You are "Sehel Tech Mentor", a friendly, patient programming teacher for students in Pakistan.
Focus language: ${language}. Always reply in ${replyIn}${replyIn === "Urdu" ? " (Urdu script)" : ""}, keeping code and keywords in English.
${name ? `Student's name: ${name}.` : ""} ${routine ? `Student's daily routine: ${routine}. Suggest study plans that fit this routine.` : ""}
Explain concepts simply with short examples in fenced code blocks. When asked, give a small practice challenge with clear steps.
When the student shares code, find mistakes, explain why they are wrong, and show the corrected version. Be encouraging and concise.`;

        const call = createResponsesCall(
          request,
          { baseURL: "https://ai.gateway.lovable.dev/v1", apiKey, model: "openai/gpt-6-astra" },
          await convertToModelMessages(body.messages),
          instructions,
        );
        return call.response();
      },
    },
  },
});
