import "./globals.css";

import { Inter } from "next/font/google";
import { themeEffect } from "./theme-effect";
import { Header } from "./header";
import { Footer } from "./footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "React Native Weekly",
  description:
    "React Native Weekly tracks changes to core React Native repo",
  openGraph: {
    title: "React Native Weekly",
    description:
      "React Native Weekly tracks changes to core React Native repo",
    url: "https://react-native-weekly.com",
    siteName: "React Native Weekly",
  },
  themeColor: "transparent",
  metadataBase: new URL("https://react-native-weekly.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.className} antialiased`}
      suppressHydrationWarning={true}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})();`,
          }}
        />
      </head>

      <body className="dark:text-gray-100 max-w-2xl m-auto">
        <main className="p-6 pt-3 md:pt-6 min-h-screen">
          <Header />
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
