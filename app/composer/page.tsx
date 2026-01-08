'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const CINEMATICS = [
  { title: "Alan Watts", id: "60ItHLz5WEA" },
  { title: "Ocean", id: "V-_O7nl0Ii0" },
  { title: "Abstract Gold", id: "E6M8qYn7KzQ" },
  { title: "Rainy City", id: "mPZkdNFkNps" },
  { title: "Stars", id: "2v8v6V0H4-g" },
  { title: "Forest", id: "qRTVg8HHzUo" },
  { title: "Snow", id: "vz91QpgUjfc" },
  { title: "Desert", id: "98_qf-h3K_M" }
];

const CLASSICS_BLUES = [
  { title: "Sonny Boy Blues", id: "pA_v070D1iE" },
  { title: "Little Walter", id: "uiGPyH8CIUI" },
  { title: "Junior Wells", id: "29Ym29-mXvA" },
  { title: "Beethoven 9th", id: "t3217H8Jq6Y" },
  { title: "Clair de Lune", id: "W0LHTWG-UmQ" },
  { title: "Vivaldi Winter", id: "zp_S7pP_0I0" },
  { title: "Armstrong", id: "CWzrABouyeE" },
  { title: "Ella", id: "u2bigf337aU" }
];

function ComposerContent() {
  const searchParams = useSearchParams();
  const [ytId, setYtId] = useState(searchParams.get('v') || 'TvnYmWpD_T8');
  const [text, setText] = useState('');
  const [toName, setToName] = useState('');
  const [fromName, setFromName] = useState('');
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  const quotes = [
    "A thought shared is a thought that lives on.",
    "Silence is a patterned gift.",
    "Stash your cognition here.",
    "Music is the wine that fills the cup of silence."
  ];

  const handleQuotePick = () => setText(quotes[Math.floor(Math.random() * quotes.length)]);

  return (
    <main style={{ display: 'flex', height: '100vh', background: '#000', color: '#D4AF37', fontFamily: 'serif' }}>
      
      {/* LEFT: MEDIA SELECTOR */}
      <div style={{ flex: 1.5, position: 'relative', borderRight: '1px solid #333', overflowY: 'auto' }}>
        <iframe width="100%" height="60%" src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}`} frameBorder="0" />
        
        <div style={{ padding: '20px' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '2px' }}>CINEMATIC VISUALS</p>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
            {CINEMATICS.map(m => (
              <button key={m.id} onClick={() => setYtId(m.id)} style={{ minWidth: '100px', height: '60px', background: '#111', color: '#D4AF37', border: '1px solid #444', fontSize: '0.6rem', cursor: 'pointer' }}>{m.title}</button>
            ))}
          </div>

          <p style={{ fontSize: '0.7rem', letterSpacing: '2px', marginTop: '20px' }}>CLASSICS & BLUES</p>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
            {CLASSICS_BLUES.map(m => (
              <button key={m.id} onClick={() => setYtId(m.id)} style={{ minWidth: '100px', height: '60px', background: '#111', color: '#D4AF37', border: '1px solid #444', fontSize: '0.6rem', cursor: 'pointer' }}>{m.title}</button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: COMPOSER */}
      <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input placeholder="To:" value={toName} onChange={e => setToName(e.target.value)} style={{ background: '#111', border: '1px solid #333', color: '#D4AF37', padding: '10px', flex: 1 }} />
          <input placeholder="From:" value={fromName} onChange={e => setFromName(e.target.value)} style={{ background: '#111', border: '1px solid #333', color: '#D4AF37', padding: '10px', flex: 1 }} />
        </div>

        <textarea 
          placeholder="Stash your cognition..." 
          value={text} 
          onChange={e => setText(e.target.value)} 
          style={{ width: '100%', height: '200px', background: '#111', border: '1px solid #333', color: '#D4AF37', padding: '20px', fontSize: '1.2rem', borderRadius: '8px' }} 
        />
        
        <button onClick={handleQuotePick} style={{ background: 'none', border: '1px solid #444', color: '#888', padding: '10px', cursor: 'pointer', fontSize: '0.7rem' }}>QUOTE PICKER</button>
        
        <button 
          onClick={() => window.location.href = `https://buy.stripe.com/eVq00k2iM8hneYX73ofnO0d?client_reference_id=${toName}`} 
          style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '20px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', letterSpacing: '2px' }}>
          STASH & SEND ($0.99)
        </button>
      </div>
    </main>
  );
}

export default function ComposerPage() { return <Suspense><ComposerContent /></Suspense>; }
