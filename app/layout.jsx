import './globals.css';
import { SiteProvider } from '@/context/SiteContext';

export const metadata = {
  title: 'DOXXANGEL STUDIOS',
  description: 'Design Engineering & Interactive Archive',
  icons: {
    icon: '/dx3.png',
    apple: '/dx3.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;0,400;0,500;1,300;1,400&family=Inter:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-black min-h-screen selection:bg-black selection:text-white antialiased">
        <SiteProvider>
          {children}
        </SiteProvider>
      </body>
    </html>
  );
}