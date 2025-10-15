import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { Handlee } from "next/font/google";

const handlee = Handlee({
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={handlee.className}>
      <body className="bg-[#7A1C32] text-[#F9F6F3] overflow-x-hidden">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
