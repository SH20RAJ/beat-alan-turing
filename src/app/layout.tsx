import type { Metadata } from "next";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";

export const metadata: Metadata = {
  title: "Can You Beat Alan Turing? | June Solstice Game Jam",
  description: "A polished psychological deduction game where you chat with multiple mind nodes to distinguish humans from AI. Dedicated to Alan Turing and inspired by the June Solstice.",
  keywords: ["Alan Turing", "Turing Test", "June Solstice", "Game Jam", "AI Deduction", "Gemini", "Next.js", "Puzzle Game"],
  authors: [{ name: "Turing Game Developer" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col solstice-bg-gradient scanline-container relative">
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}

