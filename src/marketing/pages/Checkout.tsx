'use client'

import { useState } from "react";

import { ChevronRight, ShoppingCart } from "lucide-react";

import { Navbar } from "@/marketing/components/site/Navbar";
import { Footer } from "@/marketing/components/site/Footer";
import { AuthModalProvider } from "@/contexts/AuthModalContext";
import OrderSummary from "@/features/web/checkout/components/OrderSummary";
import PaymentForm from "@/features/web/checkout/components/PaymentForm";

interface CouponData {
  codigo: string;
  descuento: number;
  total: number;
}

interface CheckoutProps {
  course: any;
}

export default function Checkout({ course }: CheckoutProps) {
  const [appliedCoupon, setAppliedCoupon] = useState<CouponData | null>(null);

  return (
    <AuthModalProvider>
      <div className="relative min-h-screen flex flex-col bg-[#f8fafc] font-gc-sans text-[#0f172a]">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden pt-16 pb-12 bg-gradient-to-br from-[#0c1938] via-[#040a1b] to-[#02050f] text-white">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }}
          />

          <div className="gc-container-custom relative z-10 px-4">
            <div className="flex items-center gap-1.5 text-[12px] text-gray-400 mb-6 flex-wrap select-none">
              <a href="/" className="hover:text-[#cca353] transition-colors">Inicio</a>
              <ChevronRight className="w-3 h-3 text-gray-600" />
              <a href={`/cursos/${course.slug}`} className="hover:text-[#cca353] transition-colors">{course.titulo}</a>
              <ChevronRight className="w-3 h-3 text-gray-600" />
              <span className="text-[#cca353] font-bold">Checkout</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#cca353]/15 border border-[#cca353]/25 flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-5 h-5 text-[#cca353]" />
              </div>
              <div>
                <h1 className="font-gc-sans font-black text-2xl md:text-3xl tracking-wide">
                  Finalizar inscripción
                </h1>
                <p className="text-sm text-gray-400 mt-0.5">
                  Estás a un paso de comenzar tu capacitación.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contenido */}
        <main className="gc-container-custom px-4 py-10 flex-grow w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="order-2 lg:order-1 lg:col-span-2">
              <PaymentForm
                courses={[course]}
                ebooks={[]}
                appliedCouponCode={appliedCoupon?.codigo}
                finalTotal={appliedCoupon ? appliedCoupon.total : undefined}
              />
            </div>

            <div className="order-1 lg:order-2 lg:col-span-1">
              <OrderSummary
                courses={[course]}
                ebooks={[]}
                appliedCoupon={appliedCoupon}
                onCouponApplied={setAppliedCoupon}
              />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AuthModalProvider>
  );
}
