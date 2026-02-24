/**
 * UX LAYER: This component handles the visual presentation and user interactions.
 * It does NOT directly communicate with the database.
 *
 * Responsibilities:
 * 1. Maintain local UI state (notes list, loading status, input value).
 * 2. Render the UI (Input field, Buttons, List of notes).
 * 3. Call the "Backend Service Layer" (lib/api/notes.ts) when user performs actions.
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchNotes, createNote } from "@/lib/api/notes";

export default function Home() {
  const [notes, setNotes] = useState<any[]>([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoad = async () => {
    setLoading(true);
    try {
      const data = await fetchNotes();
      if (Array.isArray(data)) {
        setNotes(data);
      } else {
        console.error("Failed to load notes:", data);
        setNotes([]);
      }
    } catch (error) {
      console.error("Error loading notes:", error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!newNote.trim()) return;

    try {
      await createNote(newNote);
      setNewNote("");
      handleLoad(); // Reload notes after submission
    } catch (error) {
      console.error("Error submitting note:", error);
      alert(`Failed to submit note: ${error}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col gap-8">
        <h1 className="text-4xl font-bold mb-8">Notes App</h1>

        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter a note"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="text-black bg-white"
          />
          <Button onClick={handleSubmit} variant="secondary">
            Submit
          </Button>
        </div>

        <div className="flex flex-col gap-4 mt-8 w-full max-w-sm">
          <Button
            onClick={handleLoad}
            disabled={loading}
            variant="default"
            className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
          >
            {loading ? "Loading..." : "Load Notes"}
          </Button>

          <div className="mt-4 space-y-2 w-full">
            {notes.length === 0 && !loading && (
              <p className="text-center text-gray-500">No notes loaded.</p>
            )}
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-4 rounded border border-gray-800 bg-gray-900 w-full"
              >
                <p>{note.title || JSON.stringify(note)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
