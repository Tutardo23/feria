import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#7A1C32] text-[#F9F6F3] overflow-x-hidden">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
