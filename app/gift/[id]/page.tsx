import { db } from '@vercel/postgres';
// If your main file is just called 'page.tsx' in the 'app' folder, use this path:
import DiscoverySanctuary from '../../page'; 

export default async function GiftPage({ params }: { params: { id: string } }) {
  const client = await db.connect();
  
  // Fetch stashed data
  const { rows } = await client.sql`
    SELECT * FROM gifts WHERE id = ${params.id};
  `;

  if (!rows || rows.length === 0) {
    return (
      <div style={{ color: '#D4AF37', textAlign: 'center', marginTop: '30vh', background: '#000', height: '100vh' }}>
        <h1 style={{ letterSpacing: '10px' }}>HARMONICA</h1>
        <p style={{ fontStyle: 'italic', opacity: 0.6 }}>This sanctuary has not been found.</p>
      </div>
    );
  }

  const gift = rows[0];

  return (
    <DiscoverySanctuary 
      initialData={{
        toName: gift.to_name,
        fromName: gift.from_name,
        text: gift.message,
        bgIndex: gift.bg_index,
        youtubeUrl: gift.yt_url,
        isReceiver: true 
      }}
    />
  );
}
