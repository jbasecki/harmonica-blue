'use client';
import React, { Suspense } from 'react';
import { DiscoverySanctuary } from './DiscoverySanctuary';

export default function Home() { 
  return <Suspense fallback={null}><DiscoverySanctuary /></Suspense> 
}
