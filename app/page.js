import Image from "next/image";
import Navbar from "./components/Navbar";
import Button from "./components/Button";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <main className="flex-grow p-3">
        <Button className="p-2">Click Me!</Button>
      </main> 
      <Footer></Footer>
    </div>
  );
}
