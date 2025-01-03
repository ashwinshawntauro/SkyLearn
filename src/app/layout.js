import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "../providers/AuthProvider";
import '@/../envConfig'
import { Toaster } from "@/components/ui/toaster"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export const metadata = {
  title: "SkyLearn",
  description: "Cloud enhanced E-Learning Platform",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children}) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
