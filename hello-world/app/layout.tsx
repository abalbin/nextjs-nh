import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="p-2">
          <nav>
            <ul>
              <li>
                <a href="/">Inicio</a>
              </li>
              <li>
                <Link href="/ruta-1">Ruta 1</Link>
              </li>
              <li>
                <Link href="/ruta-2">Ruta 2</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="p-2">{children}</main>
      </body>
    </html>
  );
}
