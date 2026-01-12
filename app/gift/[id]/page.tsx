import { sql } from '@vercel/postgres';
import DiscoverySanctuary from '../../page';
import { notFound } from 'next/navigation';

export default async function GiftPage({ params }: { params: { id: string } }) {
  try {
    const { rows } = await sql`SELECT * FROM gifts WHERE id = ${params.id}`;
    const gift = rows[0];

    if (!gift) return notFound();

    // DELIVERS THE PACKAGE TO THE "MAIL SLOT" AT THE FRONT DOOR (../../page)
    return (
      <DiscoverySanctuary 
        initialData={{
          toName: gift.to_name,
          fromName: gift.from_name,
          text: gift.message,
          bgIndex: gift.bg_index,
          youtubeUrl: gift.youtube_url || '',
          isReceiver: true
        }} 
      />
    );
  } catch (error) {
    console.error("Delivery error:", error);
    return notFound();
  }
}
