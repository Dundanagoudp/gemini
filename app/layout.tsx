import type { Metadata } from "next";
import "./globals.css";
import ContextProvider from "@/context/Context";

export const metadata: Metadata = {
  title: "Gemini Clone",
  description: "A simple and clean chatbot web app built using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}

