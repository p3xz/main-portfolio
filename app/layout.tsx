import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import ScrollRestorationFix from '@/components/ScrollRestorationFix'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans"
});

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono"
});

export const metadata: Metadata = {
  metadataBase: new URL('https://namishhh.vercel.app'),
  title: {
    default: 'Namish Yadav',
    template: '%s | Namish Yadav',
  },
  description: 'Full-stack software engineer specializing in TypeScript, Next.js, Java, Python, and scalable backend architecture.',
  keywords: ['Namish Yadav', 'Software Engineer', 'Full Stack Developer', 'TypeScript', 'Next.js', 'React', 'Java', 'Python', 'Web Developer'],
  authors: [{ name: 'Namish Yadav', url: 'https://github.com/p3xz' }],
  creator: 'Namish Yadav',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://namishhh.vercel.app',
    title: 'Namish Yadav',
    description: 'Full-stack software engineer specializing in TypeScript, Next.js, Java, Python, and scalable backend architecture.',
    siteName: 'Namish Yadav',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Namish Yadav, Full-Stack Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Namish Yadav',
    description: 'Full-stack software engineer building scalable web applications and distributed systems.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Namish Yadav',
    url: 'https://namishhh.vercel.app',
    jobTitle: 'Full-Stack Software Engineer',
    sameAs: [
      'https://github.com/p3xz',
      'https://linkedin.com/in/namish-yadav-639769408',
      'https://instagram.com/nam7sh',
    ],
  }
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="font-sans antialiased bg-[#09090b] text-white min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollRestorationFix />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
