import type { Metadata } from "next";
import { Barlow_Condensed, Cormorant_Garamond, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const interfaceFont = Manrope({
  variable: "--font-interface",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const tickerFont = Barlow_Condensed({
  variable: "--font-ticker",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const preloaderSessionScript = `
  try {
    if (window.sessionStorage.getItem("doces-da-nath:preloader-seen")) {
      document.documentElement.dataset.preloaderSeen = "true";
    }
  } catch {}
`;

const metaPixelId = "1345218744191399";
const metaPixelScript = `
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
  s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
  (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init','${metaPixelId}');
  fbq('track','PageView');
`;

const siteTitle = "Doces da Nath";
const siteDescription =
  "Bolos, doces e experiências artesanais preparados com cuidado pela Doces da Nath.";
const socialPreviewImage =
  "/assets/cloudinary/9e008be6-736f-4ae2-881f-c76420f940d1_smv0q2.webp";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: siteTitle,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: socialPreviewImage,
        width: 1600,
        height: 840,
        alt: "Doces da Nath com Nathaly Silva, bolo e doces artesanais",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [socialPreviewImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://connect.facebook.net"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.facebook.com" />
        <Script
          id="meta-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: metaPixelScript }}
        />
        <Script
          id="preloader-session-state"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: preloaderSessionScript }}
        />
      </head>
      <body
        className={`${displayFont.variable} ${interfaceFont.variable} ${tickerFont.variable}`}
      >
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element -- Meta Pixel requires its native no-script beacon. */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
