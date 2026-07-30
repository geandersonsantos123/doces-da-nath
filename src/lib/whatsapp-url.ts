export const OFFICIAL_WHATSAPP_NUMBER = "5527995082631" as const;
export const OFFICIAL_WHATSAPP_BASE_URL =
  `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}` as const;

export function createWhatsAppOrderUrl(message: string): string {
  if (!message.trim()) {
    throw new Error("A mensagem do WhatsApp não pode estar vazia.");
  }

  return `${OFFICIAL_WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}
