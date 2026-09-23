import { GoogleTagManager } from "@next/third-parties/google";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { personalData } from "@/utils/data/personal-data";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["500", "600", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const title = `${personalData.name} · ${personalData.designation}`;
const description =
  "Full Stack AI Engineer building LLM agents, RAG pipelines and real-time platforms. 10-agent LangGraph code generator, AI meeting intelligence with hybrid RAG, and livestream systems serving 200,000+ concurrent users.";

export const metadata = {
  metadataBase: new URL(personalData.siteUrl),
  title: {
    default: title,
    template: `%s · ${personalData.name}`,
  },
  description,
  keywords: [
    "Gautam Gondaliya",
    "Full Stack AI Engineer",
    "LangGraph",
    "LangChain",
    "RAG",
    "pgvector",
    "Multi-agent systems",
    "Next.js",
    "NestJS",
    "FastAPI",
    "Node.js",
    "Python",
  ],
  authors: [{ name: personalData.name, url: personalData.siteUrl }],
  creator: personalData.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: personalData.siteUrl,
    title,
    description,
    siteName: personalData.name,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalData.name,
  jobTitle: personalData.designation,
  url: personalData.siteUrl,
  email: `mailto:${personalData.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Surat", addressRegion: "Gujarat", addressCountry: "IN" },
  sameAs: [personalData.github, personalData.linkedIn, personalData.leetcode],
  knowsAbout: ["LangGraph", "RAG", "LLM agents", "Next.js", "NestJS", "FastAPI", "PostgreSQL", "AWS"],
};

export default function RootLayout({ children }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM;

  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${mono.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
    </html>
  );
}
