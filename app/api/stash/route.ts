import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, toName, fromName, message, bgIndex, youtubeUrl } = body;

    // Validate required fields
    if (!id || !toName || !fromName || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert the gift into the vibes table
    await sql`
      INSERT INTO vibes (id, to_name, from_name, message, bg_index, youtube_url, paid, created_at)
      VALUES (
        ${id},
        ${toName},
        ${fromName},
        ${message},
        ${bgIndex || 0},
        ${youtubeUrl || ''},
        false,
        NOW()
      )
    `;

    return NextResponse.json({ 
      success: true, 
      id,
      message: 'Gift saved successfully!' 
    });

  } catch (error) {
    console.error('Error saving gift:', error);
    return NextResponse.json(
      { error: 'Failed to save gift' },
      { status: 500 }
    );
  }
}
