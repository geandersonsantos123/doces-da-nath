import { CurtainPreloader } from "@/components/branding/curtain-preloader";
import { CartExperience } from "@/components/cart/cart-experience";
import { CartProvider } from "@/components/cart/cart-provider";
import { FloatingCatalog } from "@/components/catalog/floating-catalog";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutNathSection } from "@/components/sections/about-nath-section";
import { AuthorityTicker } from "@/components/sections/authority-ticker";
import { BrandPillarsSection } from "@/components/sections/brand-pillars-section";
import { CatalogSection } from "@/components/sections/catalog-section";
import { EditorialTicker } from "@/components/sections/editorial-ticker";
import { FaqSection } from "@/components/sections/faq-section";
import { FestivalSlicesSection } from "@/components/sections/festival-slices-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowToOrderSection } from "@/components/sections/how-to-order-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { SweetIconTicker } from "@/components/sections/sweet-icon-ticker";
import { VipClubSection } from "@/components/sections/vip-club-section";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { SITE_CONTENT } from "@/data/site-content";
import { assertCatalogIsValid } from "@/lib/catalog-validation";

assertCatalogIsValid(categories, products);

export default function Home() {
  return (
    <CartProvider>
      <CurtainPreloader />
      <SiteHeader />

      <main id="top">
        <HeroSection />
        <AuthorityTicker />
        <CatalogSection />
        <FloatingCatalog categories={categories} products={products} />
        <EditorialTicker
          items={SITE_CONTENT.rollers.pillarsTop}
          ariaLabel="Pilares da Doces da Nath"
          tone="champagne"
        />
        <BrandPillarsSection />
        <EditorialTicker
          items={SITE_CONTENT.rollers.pillarsBottom}
          ariaLabel="Valores presentes em cada pedido"
          tone="light"
          direction="reverse"
        />
        <AboutNathSection />
        <EditorialTicker
          items={SITE_CONTENT.rollers.about}
          ariaLabel="Valores da confeitaria artesanal"
          tone="champagne"
          direction="reverse"
        />
        <FestivalSlicesSection />
        <VipClubSection />
        <SocialProofSection />
        <EditorialTicker
          items={SITE_CONTENT.rollers.order}
          ariaLabel="Motivos para fazer uma encomenda"
          tone="light"
        />
        <HowToOrderSection />
        <FaqSection />
        <SweetIconTicker />
        <FinalCtaSection />
        <SweetIconTicker
          direction="reverse"
          ariaLabel="Carinho, celebração e confeitaria artesanal"
        />
      </main>
      <SiteFooter />
      <CartExperience />
    </CartProvider>
  );
}
