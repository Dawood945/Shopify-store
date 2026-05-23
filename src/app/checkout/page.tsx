import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";

export const metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <p className="section-label">Secure Checkout</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight-headline">
          Checkout
        </h1>
      </header>
      <CheckoutFlow />
    </div>
  );
}
