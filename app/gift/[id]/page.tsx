import { db } from '@vercel/postgres';
import DiscoverySanctuary from '../../components/DiscoverySanctuary';

export default async function GiftPage({ params }: { params: { id: string } }) {
  const client = await db.connect();
  
  // 1. Fetch the stashed gift data using the ID from the URL
  const { rows } = await client.sql`
    SELECT * FROM gifts WHERE id = ${params.id};
  `;

  // 2. Handle if the link is broken or doesn't exist
  if (!rows[0]) {
    return <div style={{ color: '#D4AF37', textAlign: 'center', marginTop: '20vh', fontFamily: 'serif' }}>
      This sanctuary has not been found.
    </div>;
  }

  const gift = rows[0];

  // 3. Render the sanctuary with the receiver view locked
  return (
    <DiscoverySanctuary 
      initialData={{
        toName: gift.to_name,
        fromName: gift.from_name,
        text: gift.message,
        bgIndex: gift.bg_index,
        youtubeUrl: gift.yt_url,
        isReceiver: true // This ensures they see the clean version
      }}
    />
  );
}
