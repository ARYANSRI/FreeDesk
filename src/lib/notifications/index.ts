/**
 * Resend Email & WhatsApp URL Generators
 * Automated email reminders and wa.me quick links will be implemented in Phase 5.
 */
export function buildWhatsAppLink(phone: string, text: string) {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
