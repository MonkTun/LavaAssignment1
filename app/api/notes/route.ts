/**
 * DATABASE LAYER (Server-Side)
 *
 * Responsibilities:
 * 1. This file runs entirely on the SERVER.
 * 2. It holds the privileged database connection.
 * 3. It receives the clean data from the Service Layer/API call.
 * 4. It performs the actual SQL query (SELECT/INSERT) into the 'notes' table.
 */
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data: notes, error } = await supabase.from("notes").select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const { data, error } = await supabase.from("notes").insert(body).select();

  if (error) {
    return NextResponse.json(
      { error: error.message, details: error },
      { status: 500 },
    );
  }

  return NextResponse.json(data);
}
