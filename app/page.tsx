'use client';
import React, { useState, Suspense } from 'react';

const DEEP_QUOTES = [
  { label: "COSMOLOGY", text: "We are just an advanced breed of monkeys on a minor planet of a very average star. But we can understand the Universe. That makes us something very special. Quiet people have the loudest minds." },
  { label: "CINEMA", text: "I always tell the truth. Even when I lie. The work is the only thing that matters, the only thing that lives on after the career is long gone. Forget the career, do the work." },
  { label: "THE MISSION", text: "Share a thought, a melody, a film or a quote with someone. Sharing makes a day fuller. A thought shared is a thought that will live on. This is your sanctuary." }
];

const SUBJECTS = [
  { title: "OPHELIA", id: "ko70cExuzZM" },
  { title: "SONNY BOY", id: "pA_v070D1iE" },
  { title: "CLAIR DE LUNE", id: "W0LHTWG-UmQ" },
  { title: "ABSTRACT GOLD", id: "E6M8qYn7KzQ" }
];

function SanctuaryConsole() {
  const [text, setText] = useState(DEEP_QUOTES[0].text);
  const [ytId, setYtId] = useState('ko70cExuzZM'); 
  const [selectedWords, setSelectedWords] = useState(['HARMONICA', 'BLUE']);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // LOGIC: Converts a clicked word into a tile (First letter)
  const handleWordClick = (word: string) => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (cleanWord.length > 0) {
      // Keep only the last two words clicked
      const newSelection = [...selectedWords, cleanWord].slice(-2);
      setSelectedWords(newSelection);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', fontFamily: 'serif', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ marginBottom: '20px', opacity: 0.8 }}>
        <h1 style={{ fontSize: '0.9rem', letterSpacing: '8px', margin: 0 }}>HARMONICA-BLUE.APP</h1>
      </div>

      <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        
        {/* LEFT: ATMOSPHERIC INSET */}
        <div style={{ flex: 1.2 }}>
          <div style={{ width: '100%', aspectRatio: '4/3', border: '1px solid #444', borderRadius: '15px', overflow: 'hidden', background: '#050505' }}>
            <iframe 
               width="100%" height="100%"
               src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&modestbranding=1&rel=0&start=35&end=55`} 
               frameBorder="0" allow="autoplay"
            />
          </div>
          
          <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {DEEP_QUOTES.map((q, i) => (
              <button key={i} onClick={() => setText(q.text)} style={{ background: 'none', border: '1px solid #333', color: '#D4AF37', padding: '10px', fontSize: '0.6rem', cursor: 'pointer', borderRadius: '4px' }}>
                {q.label}
              </button>
            ))}
            {SUBJECTS.map((s) => (
              <button key={s.id} onClick={() => setYtId(s.id)} style={{ background: 'none', border: '1px solid #333', color: '#D4AF37', padding: '10px', fontSize: '0.6rem', cursor: 'pointer', borderRadius: '4px' }}>
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: COGNITION CONSOLE */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* DYNAMIC ALPHABET BOX */}
          <div style={{ border: '1px solid #444', borderRadius: '15px', padding: '20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
               {selectedWords.map((word, i) => (
                 <div key={i} style={{ textAlign: 'center' }}>
                   <img 
                     src={`${bucketUrl}/${word[0]}5.png`} 
                     style={{ width: '55px', border: '1px solid #D4AF37', borderRadius: '4px' }} 
                     alt={word} 
                   />
                   <p style={{ fontSize: '0.5rem', marginTop: '5px', opacity: 0.6 }}>{word}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* INTERACTIVE TEXT AREA */}
          <div style={{ border: '1px solid #444', borderRadius: '15px', padding: '20px', minHeight: '300px', lineHeight: '1.8' }}>
            {text.split(' ').map((word, i) => (
              <span 
                key={i} 
                onClick={() => handleWordClick(word)}
                style={{ cursor: 'pointer', fontSize: '1.2rem', fontStyle: 'italic', marginRight: '8px', transition: '0.2s' }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#FFF')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#D4AF37')}
              >
                {word}
              </span>
            ))}
          </div>

          <button style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '18px', fontWeight: 'bold', borderRadius: '40px', cursor: 'pointer', fontSize: '1rem', letterSpacing: '2px' }}>
            STASH & SEND
          </button>
        </div>
      </div>
    </main>
  );
}

export default function Home() { return <Suspense><SanctuaryConsole /></Suspense>; }
