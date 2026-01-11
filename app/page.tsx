// Inside your DiscoverySanctuary function, apply these specific style updates:

{/* 1. SIGNATURE AREA: Tiles + Name sitting very closely underneath */}
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '5px' }}>
  <div style={{ display: 'flex', gap: '4px', marginBottom: '2px' }}>
     {tiles.map((ltr, i) => (
       <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '25px', border: '0.3px solid rgba(212, 175, 55, 0.5)', borderRadius: '2px' }} alt="Art" />
     ))}
  </div>
  {/* DRAMATICALLY SMALLER NAME - TRADITIONAL LABEL STYLE */}
  <div style={{ fontFamily: traditionalCursive, fontSize: '0.75rem', color: '#D4AF37', fontWeight: 300, opacity: 0.8, letterSpacing: '0.5px' }}>
    {toName}
  </div>
</div>

{/* 2. REFINED GLASS OVERLAY */}
<div style={{ 
  width: '80%', 
  maxWidth: '380px', 
  background: 'rgba(255, 255, 255, 0.04)', 
  backdropFilter: 'blur(18px)', 
  WebkitBackdropFilter: 'blur(18px)',
  borderRadius: '10px',
  padding: '15px 25px',
  border: '0.2px solid rgba(212, 175, 55, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}}>
  <textarea 
    disabled={isReceiver}
    value={text} 
    onChange={(e) => setText(e.target.value)}
    style={{ 
      width: '100%', 
      height: '70px', 
      background: 'transparent', 
      border: 'none', 
      textAlign: 'center', 
      // REDUCED TO "WHISPER" SIZE
      fontSize: '0.7rem', 
      fontFamily: traditionalCursive, 
      color: '#D4AF37', 
      fontWeight: 300,
      lineHeight: '1.6',
      outline: 'none', 
      resize: 'none',
      opacity: 0.75
    }} 
  />

  {!isReceiver && (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '5px' }}>
      
      {/* 10 BACKGROUND BUTTONS ONLY */}
      <div style={{ display: 'flex', gap: '3px', marginBottom: '5px' }}>
        {[...Array(10)].map((_, i) => (
          <button key={i} onClick={() => setBgIndex(i)} style={{ width: '14px', height: '14px', background: bgIndex === i ? '#D4AF37' : 'none', border: '0.3px solid rgba(212, 175, 55, 0.6)', color: bgIndex === i ? '#000' : '#D4AF37', fontSize: '0.3rem' }}>{i + 1}</button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '6px' }}>
         {Object.keys(QUOTES).map((cat) => (
           <button key={cat} onClick={() => setQuoteCat(cat as keyof typeof QUOTES)} style={{ background: 'none', border: '0.2px solid rgba(212, 175, 55, 0.4)', color: '#D4AF37', fontSize: '0.3rem', padding: '2px 6px' }}>{cat}</button>
         ))}
      </div>

      <button style={{ background: 'rgba(212, 175, 55, 0.7)', color: '#000', padding: '5px 25px', borderRadius: '12px', fontSize: '0.45rem', border: 'none', cursor: 'pointer', marginTop: '5px' }}>STASH & SEND</button>
    </div>
  )}
</div>
