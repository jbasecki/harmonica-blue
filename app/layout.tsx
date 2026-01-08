import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Harmonica Blue | A Sanctuary for Stashed Cognition",
  description: "Someone sent you a Harmonica Blue. Share a thought, a melody, or a film. Sharing makes a day fuller.",
  openGraph: {
    title: "Harmonica Blue",
    description: "A thought shared is a thought that lives on. It is priceless.",
    url: "https://harmonica-blue.vercel.app",
    siteName: "Harmonica Blue",
    images: [
      {
        url: "https://storage.googleapis.com/simple-bucket-27/mushroom-preview.jpg", // Your cinematic preview image
        width: 1200,
        height: 630,
        alt: "Harmonica Blue Sanctuary",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harmonica Blue",
    description: "Spread love and authenticity through a shared melody and thought.",
    images: ["https://storage.googleapis.com/simple-bucket-27/mushroom-preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#000' }}>{children}</body>
    </html>
  );
}
