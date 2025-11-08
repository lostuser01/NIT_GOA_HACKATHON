import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { Navigation } from "@/components/navigation";
import { Toaster } from "react-hot-toast";
import { LaserFlowBackground } from "@/components/laser-flow-background";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OurStreet - Local Issue Reporting & Impact Tracker",
  description:
    "Report civic issues, track resolutions, and improve your local community with real-time tracking and transparent governance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased font-sans`}
        style={{
          position: "relative",
          margin: 0,
          padding: 0,
          overflow: "auto",
        }}
      >
        {/* LaserFlow - Completely isolated fixed layer */}
        <div
          id="laser-flow-fixed-container"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1,
            pointerEvents: "none",
            overflow: "hidden",
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        >
          <LaserFlowBackground />
        </div>

        {/* Scrollable content wrapper */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              {/* Content Layer */}
              <div style={{ position: "relative", zIndex: 20 }}>
                <Navigation />
                {children}
              </div>

              {/* Toaster */}
              <div style={{ position: "relative", zIndex: 9999 }}>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: "var(--background)",
                      color: "var(--foreground)",
                      border: "1px solid var(--border)",
                    },
                  }}
                />
              </div>
            </AuthProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
