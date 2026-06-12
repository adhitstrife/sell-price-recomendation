import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Public_Sans } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/lib/I18nProvider";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { RecipeProvider } from "@/contexts/RecipeContext";
import { AlertProvider } from "@/contexts/AlertContext";
import AppLayout from "@/components/AppLayout";

const headingFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-heading",
});

const bodyFont = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Kalkulator Harga Jual",
  description: "Hitung harga jual optimal untuk menu makanan Anda",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>
        <I18nProvider>
          <SettingsProvider>
            <RecipeProvider>
              <AlertProvider>
                <AppLayout>{children}</AppLayout>
              </AlertProvider>
            </RecipeProvider>
          </SettingsProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
