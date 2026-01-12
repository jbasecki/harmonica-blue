import { sql } from '@vercel/postgres';
import { notFound } from 'next/navigation';
import { DiscoverySanctuary } from '../../DiscoverySanctuary';

export default async function GiftPage({ params }: { params: { id: string } }) {
  try {
    const { rows } = await sql`SELECT * FROM vibes WHERE id = ${params.id}`;
    const gift = rows[0];

    if (!gift) return notFound();

    return (
      <DiscoverySanctuary
        initialData={{
          toName: gift.to_name || 'Friend',
          fromName: gift.from_name || 'Someone',
          text: gift.message || '',
          bgIndex: gift.bg_index || 0,
          youtubeUrl: gift.youtube_url || '',
        }}
      />
    );
  } catch (error) {
    console.error("Error loading gift:", error);
    return notFound();
  }
}
