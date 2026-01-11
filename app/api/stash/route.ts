import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const client = await db.connect();
  const { toName, fromName, message, bgIndex, youtubeUrl } = await request.json();

  try {
    // This creates the table if it doesn't exist yet
    await client.sql`
      CREATE TABLE IF NOT EXISTS gifts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        to_name TEXT,
        from_name TEXT,
        message TEXT,
        bg_index INTEGER,
        yt_url TEXT
      );
    `;

    // This stashes your data and returns a unique ID
    const result = await client.sql`
      INSERT INTO gifts (to_name, from_name, message, bg_index, yt_url)
      VALUES (${toName}, ${fromName}, ${message}, ${bgIndex}, ${youtubeUrl})
      RETURNING id;
    `;

    return NextResponse.json({ id: result.rows[0].id });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
