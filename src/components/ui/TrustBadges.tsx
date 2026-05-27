"use client";

export function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-widest text-visible-muted sm:gap-x-8 sm:gap-y-3 sm:text-xs">
      <span className="inline-flex items-center gap-1.5">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
        Cash on Delivery Available
      </span>
      <span className="inline-flex items-center gap-1.5">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path d="M12 6v6l4 2" /></svg>
        7-Day Returns
      </span>
      <span className="inline-flex items-center gap-1.5">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
        Secure Checkout
      </span>
      <span className="inline-flex items-center gap-1.5">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
        Fast Shipping
      </span>
    </div>
  );
}
