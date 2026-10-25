import type { Metadata } from "next";
import { Anek_Bangla, Hind_Siliguri, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const banglaDisplay = Anek_Bangla({
  variable: "--font-bangla-display",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const banglaBody = Hind_Siliguri({
  variable: "--font-bangla-body",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const num = Space_Grotesk({
  variable: "--font-num",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const shadhinataFont = localFont({
  src: [
    {
      path: "../public/fonts/Shadhinata220.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Shadhinata220.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-shadhinata",
  display: "swap",
});

const sweetArkopravo = localFont({
  src: "../public/fonts/SweetArkopravo.woff",
  variable: "--font-arkopravo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "প্রাইমারি গণিত অলিম্পিয়াড প্রস্তুতি কোর্স ২০২৬ | Banglar Math Olympiad",
  description:
    "১৯৯ টাকায় প্রি-বুক করো Banglar Math Olympiad ২০২৬ প্রস্তুতি কোর্স। ৭+ ঘণ্টার ক্লাস, রেকর্ডেড লেকচার, পূর্ণাঙ্গ মক টেস্ট আর ২৪/৭ প্রশ্ন সমাধান।",
  keywords: [
    "গণিত অলিম্পিয়াড",
    "Banglar Math Olympiad",
    "math olympiad Bangladesh",
    "প্রস্তুতি কোর্স",
    "প্রাইমারি গণিত",
  ],
  openGraph: {
    title: "প্রাইমারি গণিত অলিম্পিয়াড প্রস্তুতি কোর্স ২০২৬",
    description: "১৯৯ টাকায় সিট কনফার্ম করো। প্রি-বুকিং চলছে।",
    type: "website",
    locale: "bn_BD",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="bn"
      className={`${shadhinataFont.variable} ${sweetArkopravo.variable} ${banglaDisplay.variable} ${banglaBody.variable} ${num.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}
