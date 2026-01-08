'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const WEEKLY_8 = [
  { id: '1', title: 'THE FATE OF OPHELIA', artist: 'Taylor Swift', ytId: 'ko70cExuzZM' },
  { id: '2', title: 'PURPLE RAIN', artist: 'Prince', ytId: 'TvnYmWpD_T8' },
  { id: '3', title: 'LET THE NEW BEGIN', artist: 'CHPTRS', ytId: 'SRgjRDXpQRg' },
  { id: '4', title: 'GOLDEN', artist: 'HUNTR/X', ytId: 'hohuFW0zQUw' },
  { id: '5', title: 'HEROES', artist: 'David Bowie', ytId: '1XgkuM2NHYI' },
  { id: '6', title: 'SUNRISE', artist: 'Norah Jones', ytId: 'fd02pgJX0s0' },
  { id: '7', title: 'MAN I NEED', artist: 'Olivia Dean', ytId: 'oiV_Y2RPQ_A' },
  { id: '8', title: 'SHOULD I STAY...', artist: 'The Clash', ytId: 'xMaE6toi4mk' },
];

export default function BluesLanding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const song = WEEKLY_8[currentIndex];
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', fontFamily: 'serif', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
      <p style={{ letterSpacing: '8px', fontSize: '0.9rem', marginBottom: '20px' }}>HOW TO GIFT A HARMONICA</p>

      {/* SONG CARD SLIDER */}
      <div style={{ position: 'relative', width: '300px', height: '450px', border: '2px solid #D4AF37', borderRadius: '50px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '40px', marginBottom: '30px' }}>
        <img 
          src={`${bucketUrl}/blue-box-gift.png`} 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} 
          alt="Sanctuary Card"
        />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: '1.5rem', letterSpacing: '4px', margin: 0 }}>{song.title}</h2>
          <p style={{ fontStyle: 'italic', fontSize: '0.9rem', opacity: 0.8 }}>{song.artist}</p>
        </div>
      </div>

      <Link href={`/composer?v=${song.ytId}`}>
        <button style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '15px 30px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '2px' }}>
          CONFIRM SELECTION & ENTER
        </button>
      </Link>
    </main>
  );
}
