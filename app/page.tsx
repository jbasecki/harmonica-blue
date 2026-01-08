'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Entrance() {
  const [showIntro, setShowIntro] = useState(true);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // Logic to hide intro for returning visitors
  useEffect(() => {
    const hidden = localStorage.getItem('hideHarmonicaIntro');
    if (hidden) setShowIntro(false);
  }, []);

  const handleHideIntro = () => {
    localStorage.setItem('hideHarmonicaIntro', 'true');
    setShowIntro(false);
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', fontFamily: 'serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      
      {/* HARMONICA BLUE BRANDING */}
      <div style={{ marginBottom: '10px', fontSize: '2.5rem', letterSpacing: '10px', fontWeight: 'bold' }}>HB</div>
      <p style={{ letterSpacing: '5px', fontSize: '0.7rem', marginBottom: '40px' }}>HARMONICA BLUE</p>

      {showIntro && (
        <div style={{ maxWidth: '600px', textAlign: 'center', marginBottom: '30px' }}>
          <p style={{ fontSize: '1.2rem', fontStyle: 'italic', lineHeight: '1.6' }}>
            "Share a thought, a melody, a film, or a quote with someone. <br/>
            Sharing makes a day fuller."
          </p>
          <button 
            onClick={handleHideIntro}
            style={{ background: 'none', border: 'none', color: '#888', fontSize: '0.6rem', cursor: 'pointer', marginTop: '10px', textDecoration: 'underline' }}
          >
            Don't show this anymore
          </button>
        </div>
      )}

      {/* THE GIFT GATEWAY */}
      <div style={{ position: 'relative', width: '300px', height: '450px', border: '1px solid #D4AF37', borderRadius: '40px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img 
          src={`${bucketUrl}/blue-box-gift.png`} 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} 
          alt="Gift" 
        />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '20px' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '3px', margin: 0 }}>NEWCOMER GUIDANCE</p>
          <h1 style={{ fontSize: '1.5rem', margin: '5px 0' }}>THE GALLERY</h1>
        </div>
      </div>

      <Link href="/composer">
        <button style={{ marginTop: '40px', background: '#D4AF37', color: '#000', border: 'none', padding: '15px 40px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '2px' }}>
          START SHARING
        </button>
      </Link>
    </main>
  );
}
