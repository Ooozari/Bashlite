import { Geist, Geist_Mono, Nunito, Roboto } from "next/font/google";
import "./globals.css";
import ReduxProviderWrapper from "@/components/ReduxProviderWrapper";
import DashboardLayout from "@/components/DashboardLayout"; 

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CMS Dashboard",
  description: "Developed by Uzair Asif",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${geistSans.variable} ${geistMono.variable} ${roboto.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-nunito), sans-serif" }}
      >
        <ReduxProviderWrapper>
          <DashboardLayout>
            <main>{children}</main>
          </DashboardLayout>
        </ReduxProviderWrapper>
      </body>
    </html>
  );
}
