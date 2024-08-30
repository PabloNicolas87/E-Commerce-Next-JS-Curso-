import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './layout.css'
import { CartProvider } from "./context/cartContext";

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
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar></Navbar>
              <main className="flex-grow flex flex-col">
                {children}
              </main> 
            <Footer></Footer>  
          </div>  
        </CartProvider>    
      </body>
    </html>
  );
}
