'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const [ytId, setYtId] = useState(searchParams.get('song') || 'ko70cExuzZM'); 
  const [text, setText] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // LOGIC: DUAL-TILE ALPHABET
  const toggleWord = (word: string) => {
    setSelectedWords(prev => prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]);
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
      
      {/* THE "INVISIBLE" YOUTUBE PLAYER */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
        <iframe 
          width="100%" height="100%" 
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=0&loop=1&playlist=${ytId}&controls=0&showinfo=0`} 
          frameBorder="0" allow="autoplay; encrypted-media" 
          style={{ transform: 'scale(1.5)', objectFit: 'cover' }}
        />
      </div>

      {/* OVERLAY: THE SANCTUARY INTERFACE */}
      <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'rgba(0,0,0,0.3)' }}>
        
        {/* GOLD ALPHABET TILES */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {selectedWords.map((word, i) => {
            const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
            const first = clean[0] || 'A';
            const penult = clean.length > 1 ? clean[clean.length - 2] : first;
            return (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <img src={`${bucketUrl}/${first}5.png`} style={{ width: '55px', height: '80px', border: '1px solid #D4AF37', borderRadius: '8px' }} />
                  <img src={`${bucketUrl}/${penult}5.png`} style={{ width: '55px', height: '80px', border: '1px solid #D4AF37', borderRadius: '8px' }} />
                </div>
                <p style={{ color: '#D4AF37', fontSize: '0.7rem', marginTop: '10px', letterSpacing: '2px' }}>{word.toLowerCase()}</p>
              </div>
            );
          })}
        </div>

        <textarea 
          placeholder="Add your words..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: '80%', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '2.5rem', textAlign: 'center', outline: 'none', fontStyle: 'italic', textShadow: '2px 2px 15px #000' }}
        />

        {text.length > 0 && (
          <button 
            onClick={() => window.location.href = 'https://buy.stripe.com/eVq00k2iM8hneYX73ofnO0d'} 
            style={{ marginTop: '50px', padding: '15px 70px', background: '#D4AF37', color: '#000', borderRadius: '40px', fontWeight: 'bold', border: 'none', cursor: 'pointer', letterSpacing: '4px' }}>
            PAY & SEND
          </button>
        )}
      </div>
    </main>
  );
}

export default function ComposerPage() { return <Suspense><ComposerContent /></Suspense>; }
