import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pablo Nicolás Girone",
  description: "App Next",
  openGraph: {
    title: "Pablo Nicolás Girone",
    description: "Portfólio - Pablo Girone",
    type: "article",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
