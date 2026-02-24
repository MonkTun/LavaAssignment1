/**
 * BACKEND SERVICE LAYER (Client-Side)
 *
 * Responsibilities:
 * 1. Act as an abstraction layer between the UI (App Page) and the Server Function (API Endpoint).
 * 2. Handle HTTP request formatting (headers, method, body).
 * 3. Parse JSON responses and handle network errors.
 * 4. This is the code that runs in the browser.
 */

export async function fetchNotes() {
  const response = await fetch("/api/notes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  return response.json();
}

export async function createNote(title: string) {
  const response = await fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create note");
  }

  return response.json();
}
