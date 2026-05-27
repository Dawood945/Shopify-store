import { Suspense } from "react";
import { Footer } from "./Footer";
import { MobileBottomNav } from "./MobileBottomNav";
import { TopNavBar } from "./TopNavBar";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <TopNavBar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Suspense fallback={null}>
        <MobileBottomNav />
      </Suspense>
    </div>
  );
}
