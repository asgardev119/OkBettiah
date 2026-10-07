/* Pure helpers: validation + WhatsApp message/URL generation (no DOM) */
const WA = {
  cleanNumber(n) { return String(n || "").replace(/\D/g, ""); },
  validPhone(n) {
    const d = WA.cleanNumber(n);
    return /^[6-9]\d{9}$/.test(d) || /^91[6-9]\d{9}$/.test(d);
  },
  formatDate(iso) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  },
  url(text, cfg) {
    return `https://wa.me/${WA.cleanNumber(cfg.whatsappNumber)}?text=${encodeURIComponent(text)}`;
  },
  bookingMessage(b, cfg) {
    const lines = [
      `Hello ${cfg.name} 👋`, "", "I would like to book a service.", "", "Booking Details", "",
      `Service: ${b.service}`, `Fee: ${cfg.price}`, `Date: ${WA.formatDate(b.date)}`, `Time: ${b.time}`, `Area: ${b.area}`, "",
      `Name: ${b.name}`, `WhatsApp: ${b.phone}`, "", `Person needing help: ${b.who}`,
    ];
    if (b.notes && b.notes.trim()) lines.push("", "Additional details:", b.notes.trim());
    lines.push("", "Please confirm availability and pricing.", "", "Thank you.");
    return lines.join("\n");
  },
  contactMessage: (m, cfg) => `Hello ${cfg.name} 👋\n\nName: ${m.name}\n\nMessage:\n${m.message}\n\nThank you.`,
  generalMessage: (cfg) => `Hello ${cfg.name} 👋 I would like to know more about your services.`,
  urgentMessage: (cfg) => `Hello ${cfg.name} 👋\nI need assistance right now.\n\nMy location/area:\nMy requirement:\n\nPlease let me know if someone is available.`,
};
if (typeof module !== "undefined") module.exports = WA;
