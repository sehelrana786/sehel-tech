// Local, on-device storage for the student profile and notebook.
// Everything is saved only in this browser (localStorage) — nothing leaves the device.
import { useEffect, useState } from "react";

export type Profile = { name: string; pin: string; routine: string; goal: string };
export type Note = { id: string; date: string; language: string; minutes: number; learned: string; createdAt: number };

const PROFILE_KEY = "sehel.profile";
const SESSION_KEY = "sehel.session";
const NOTES_KEY = "sehel.notes";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

/** Subscribe to local data; returns undefined until loaded in the browser (avoids SSR mismatch). */
export function useLocal<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T | undefined>(undefined);
  useEffect(() => {
    const load = () => setValue(read(key, fallback));
    load();
    listeners.add(load);
    return () => {
      listeners.delete(load);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const save = (v: T) => {
    localStorage.setItem(key, JSON.stringify(v));
    emit();
  };
  return [value, save] as const;
}

export const useProfile = () => useLocal<Profile | null>(PROFILE_KEY, null);
export const useSession = () => useLocal<boolean>(SESSION_KEY, false);
export const useNotes = () => useLocal<Note[]>(NOTES_KEY, []);

/** Simple on-device PIN hashing so the PIN isn't stored as plain text. */
export async function hashPin(pin: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("sehel:" + pin));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Consecutive-day study streak ending today or yesterday. */
export function streak(notes: Note[]) {
  const days = new Set(notes.map((n) => n.date));
  let count = 0;
  const d = new Date();
  if (!days.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
  while (days.has(d.toISOString().slice(0, 10))) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
}
