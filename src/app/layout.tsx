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
        <Script
          id="preloader-session-state"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: preloaderSessionScript }}
        />
      </head>
      <body
        className={`${displayFont.variable} ${interfaceFont.variable} ${tickerFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
