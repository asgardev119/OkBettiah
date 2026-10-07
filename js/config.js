/* ===== EDIT ME: business details & services ===== */
const BUSINESS_CONFIG = {
  name: "OkBettiah",
  tagline: "Need help in Bettiah? Just WhatsApp us.",
  price: "Rs 99 per hour", // shown on every service + added to the WhatsApp message
  city: "Bettiah",
  state: "Bihar",
  whatsappNumber: "916205525335", // <-- ONLY place to change: country code + number, digits only
};

const SERVICES = [
  { id: "hospital", icon: "🏥", accent: "#E5484D", title: "Hospital Assistance", cta: "Need Hospital Help",
    blurb: "Hospital visits, appointments, reports, medicines and patient support.",
    items: ["Doctor appointments & reports", "Medicine collection", "Patient & attendant support"],
    polite: "We would be honoured to stand beside your loved one at every step of the hospital visit." },
  { id: "elder", icon: "🧓", accent: "#8E4EC6", title: "Elder Care", cta: "Arrange Elder Care",
    blurb: "For families who live away from Bettiah.",
    items: ["Check-in visits & companionship", "Walks, park visits & shopping", "Medicine reminders"],
    polite: "We will treat your parents with the same respect and patience that you would." },
  { id: "errand", icon: "🏦", accent: "#0091FF", title: "Personal Errands", cta: "Book an Errand",
    blurb: "Bank, mall, market, railway station and bus station errands.",
    items: ["Bank work, bills & documents", "Railway & bus station help", "Market, mall & local shopping"],
    polite: "Please leave the queues and paperwork to us. We will handle them with care." },
  { id: "driver", icon: "🚗", accent: "#F76B15", title: "Driver Assistance", cta: "Request Driver Help",
    blurb: "Help with local travel and transport coordination.",
    items: ["Pick-up / drop", "Hospital transport coordination", "Family travel assistance"],
    polite: "Courteous, careful help for every local trip your family needs." },
  { id: "event", icon: "🎉", accent: "#D6409F", title: "Event Assistance", cta: "Get Event Support",
    blurb: "Extra hands for weddings and family functions.",
    items: ["Guest assistance", "Vendor coordination", "Last-minute arrangements"],
    polite: "Tell us how we can lighten the load, so you can simply enjoy the occasion." },
  { id: "urgent", icon: "⚡", accent: "#E0A100", title: "Urgent Local Assistance", cta: "Need Help Now", urgent: true,
    blurb: "When something needs handling quickly. Not an emergency service.",
    items: ["Same-day requests", "We check who is available"],
    polite: "We understand some things cannot wait. We will politely check who is available right now." },
  { id: "other", icon: "💬", accent: "#30A46C", title: "Something Else", cta: "Tell Us What You Need", wide: true,
    blurb: "Have a different need in Bettiah? Please tell us.",
    items: [], polite: "If it is not on this list, please ask. We would love to see how we can help." },
];

const FAQS = [
  ["Where do you provide services?", "Currently focused on Bettiah and nearby areas in West Champaran. Availability may depend on the location and type of service."],
  ["How do I book?", "Select a service on the website and continue to WhatsApp. Your booking details are prepared automatically."],
  ["Do I need an account or an app?", "No. No app. No account. Just WhatsApp."],
  ["Is my booking automatically confirmed?", "No. Your request is sent to the OkBettiah team, who confirm availability and the final details with you on WhatsApp."],
  ["What is the OTP for?", "After your booking is confirmed, our team shares a one-time OTP with you on WhatsApp. When the helper arrives, you tell them the OTP and they confirm it with our team. Once it is verified, the service time starts. Please do not share the OTP with anyone else."],
  ["How am I charged?", "Every service is Rs 99 per hour. Charges start only after the OTP is verified and are based on the time worked. We confirm the details with you on WhatsApp before the service begins."],
  ["Can I request a specific person?", "You may request a preference, but assignment depends on availability."],
  ["Do you provide medical treatment?", "No. Our helpers provide assistance and support. They are not doctors, nurses or emergency medical professionals unless specifically qualified and stated."],
];
