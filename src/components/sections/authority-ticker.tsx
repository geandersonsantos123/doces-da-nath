import { EditorialTicker } from "@/components/sections/editorial-ticker";
import { SITE_CONTENT } from "@/data/site-content";

export function AuthorityTicker() {
  return (
    <EditorialTicker
      items={SITE_CONTENT.authority}
      ariaLabel="Diferenciais da Doces da Nath"
    />
  );
}
