import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | Eventora",
  description: "Find answers to common questions about Eventora. Learn how to book events, become a host, manage payments, and get technical support. 24/7 customer service available.",
  keywords: ["faq", "help", "support", "questions", "how to book", "event hosting", "payment help", "customer support"],
  openGraph: {
    title: "FAQ - Frequently Asked Questions | Eventora",
    description: "Find answers to common questions about Eventora. Get help with booking, hosting, and payments.",
    type: "website",
    url: "https://eventora.com/faq",
  },
  twitter: {
    card: "summary",
    title: "FAQ - Frequently Asked Questions | Eventora",
    description: "Find answers to common questions about Eventora.",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
