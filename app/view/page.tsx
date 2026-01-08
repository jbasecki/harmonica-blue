'use client';
import React from 'react';
import Link from 'next/link';

export default function Entrance() {
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', fontFamily: 'serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      
      {/* HARMONICA LOGO */}
      <div style={{ marginBottom: '40px', fontSize: '2rem', letterSpacing: '8px' }}>
        HARMONICA BLUE
      </div>

      {/* THE MISSION STATEMENT */}
      <div style={{ maxWidth: '500px', textAlign: 'center', marginBottom: '40px' }}>
        <p style={{ fontSize: '1.4rem', fontStyle: 'italic', lineHeight: '1.6' }}>
          "Share a thought, a melody, a film, or a quote with someone. Sharing makes a day fuller."
        </p>
      </div>

      {/* THE BLUE BOX GIFT */}
      <div style={{ position: 'relative', width: '320px', height: '480px', border: '1px solid #D4AF37', borderRadius: '40px', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: '40px' }}>
        <img src={`${bucketUrl}/blue-box-gift.png`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="Gift" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '3px', margin: 0 }}>SANCTUARY ACCESS</p>
          <h1 style={{ fontSize: '1.8rem', margin: '10px 0' }}>ENTER THE GALLERY</h1>
        </div>
      </div>

      <Link href="/composer">
        <button style={{ marginTop: '40px', background: '#D4AF37', color: '#000', border: 'none', padding: '15px 40px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '2px' }}>
          CONFIRM SELECTION & ENTER
        </button>
      </Link>
    </main>
  );
}
