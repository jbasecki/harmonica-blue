'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const [ytId, setYtId] = useState(searchParams.get('v') || 'TvnYmWpD_T8'); 
  const [text, setText] = useState('');
  const [quote, setQuote] = useState('');
  const [isSkipped, setIsSkipped] = useState(false);
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL || "https://storage.googleapis.com/simple-bucket-27";

  const handleQuotePick = () => {
    const quotes = [
      "A thought shared is a thought that lives on.", 
      "Sharing makes a day fuller.", 
      "Silence is a patterned gift.",
      "Stash your cognition here."
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  // Logic for Alphabet Abstracts
  const getAbstracts = (input: string) => {
    const clean = input.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return ['H', 'B']; // Default Harmonica Blue
    const first = clean[0];
    const penult = clean.length > 1 ? clean[clean.length - 2] : first;
    return [first, penult];
  };

  const abstracts = getAbstracts(text || quote);

  return (
    <main style={{ display: 'flex', height: '100vh', background: '#000', color: '#D4AF37', fontFamily: 'serif', overflow: 'hidden' }}>
      
      {/* LEFT: CINEMATIC SPACE */}
      <div style={{ flex: 1.5, position: 'relative', borderRight: '1px solid #333', background: '#050505' }}>
        {!isSkipped ? (
          <iframe 
            width="100%" height="100%" 
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&controls=0&mute=0&loop=1&playlist=${ytId}`} 
            frameBorder="0" allow="autoplay" 
          />
        ) : (
          <img src={`${bucketUrl}/poppy-bg.jpg`} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
        )}
        
        <div style={{ position: 'absolute', bottom: 0, width: '100%', background: 'rgba(0,0,0,0.8)', padding: '20px', textAlign: 'center' }}>
          <button onClick={() => setIsSkipped(!isSkipped)} style={{ background: 'none', border: '1px solid #D4AF37', color: '#D4AF37', padding: '5px 15px', borderRadius: '15px', cursor: 'pointer', fontSize: '0.7rem' }}>
            {isSkipped ? "RESTORE VIDEO" : "SKIP VIDEO / USE AMBIENT"}
          </button>
        </div>
      </div>

      {/* RIGHT: COMPOSER CONSOLE */}
      <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#000' }}>
        
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.7rem', opacity: 0.5, margin: 0 }}>artist: unknown</p>
          <div style={{ width: '100px', height: '30px', background: '#111', border: '1px solid #333', marginLeft: 'auto', marginTop: '5px' }}></div>
        </div>

        <div style={{ textAlign: 'center' }}>
          {/* WORDS AS ABSTRACTS */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
            {abstracts.map((ltr, i) => (
              <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '50px', height: '75px', border: '1px solid #D4AF37', borderRadius: '4px' }} alt={ltr} />
            ))}
          </div>
          <p style={{ fontSize: '0.6rem', letterSpacing: '2px', marginBottom: '30px' }}>WORDS AS ABSTRACTS</p>

          <textarea 
            placeholder={quote || "text or quote"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', height: '150px', background: '#111', border: '1px solid #333', color: '#D4AF37', padding: '20px', fontSize: '1.2rem', textAlign: 'center', borderRadius: '8px', outline: 'none' }}
          />
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
             <div style={{ background: '#111', width: '60px', height: '20px', fontSize: '0.6rem', padding: '3px' }}>to</div>
             <div style={{ background: '#111', width: '60px', height: '20px', fontSize: '0.6rem', padding: '3px' }}>from</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button onClick={handleQuotePick} style={{ background: 'none', border: '1px solid #444', color: '#888', padding: '10px', fontSize: '0.7rem', width: 'fit-content', cursor: 'pointer' }}>
            QUOTE PICKER
          </button>
          
          <button 
            onClick={() => window.location.href = 'https://buy.stripe.com/eVq00k2iM8hneYX73ofnO0d'} 
            style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '15px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', letterSpacing: '2px' }}>
            STASH & SEND ($0.99)
          </button>
        </div>
      </div>
    </main>
  );
}

export default function ComposerPage() { return <Suspense><ComposerContent /></Suspense>; }
