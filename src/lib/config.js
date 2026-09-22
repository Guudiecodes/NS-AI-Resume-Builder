const config = {
  appName: "NS Resume Builder",
  auth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL || "http://localhost:3000",
    webhook_url: process.env.WEBHOOK_URL || process.env.NEXTAUTH_URL || "http://localhost:3000",
  },
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      basic: { id: "basic", name: "Starter Pack", credits: 90, price: 200 },
      standard: { id: "standard", name: "Popular Pack", credits: 270, price: 500 },
      pro: { id: "pro", name: "Pro Pack", credits: 720, price: 1200 },
      business: { id: "business", name: "Business Pack", credits: 2160, price: 3000 },
    }
  },
  ai: {
    apiKey: process.env.MUAPIAPP_API_KEY,
    generationCost: 18, // Deducted per AI resume generation
  }
};
export default config;