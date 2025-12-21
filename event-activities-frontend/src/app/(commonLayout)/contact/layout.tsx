import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch | Eventora",
  description: "Contact Eventora's support team. We're here to help with questions, feedback, or assistance. Email, phone, and live chat support available. Response within 24 hours.",
  keywords: ["contact", "support", "help", "customer service", "get in touch", "contact eventora", "support team"],
  openGraph: {
    title: "Contact Us - Get in Touch | Eventora",
    description: "Contact Eventora's support team. We're here to help with questions, feedback, or assistance.",
    type: "website",
    url: "https://eventora.com/contact",
  },
  twitter: {
    card: "summary",
    title: "Contact Us - Get in Touch | Eventora",
    description: "Contact Eventora's support team. We're here to help.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
