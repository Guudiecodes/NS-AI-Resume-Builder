"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Footer from "@/components/Footer";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const PLANS = [
  {
    id: "basic",
    name: "Starter",
    price: "$2",
    perResume: "$0.40 / resume",
    generations: 5,
    description: "Try it out on a single resume.",
  },
  {
    id: "standard",
    name: "Popular",
    price: "$5",
    perResume: "$0.33 / resume",
    generations: 15,
    description: "For active job seekers tailoring resumes to multiple roles.",
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$12",
    perResume: "$0.30 / resume",
    generations: 40,
    description: "For power users who want room to iterate.",
  },
  {
    id: "business",
    name: "Business",
    price: "$30",
    perResume: "$0.25 / resume",
    generations: 120,
    description: "Best value for career coaches and recruiters.",
  },
];

const FEATURES = ["AI-optimized resume rewrites", "PDF & Word export", "No subscription required"];

export default function Pricing() {
  const { status } = useSession();
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handleCheckout = async (planId) => {
    if (status !== "authenticated") {
      toast.error("Sign in with Google to purchase credits.");
      return;
    }

    setLoadingPlan(planId);
    try {
      const { data } = await axios.post("/api/checkout", { planId });
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No redirection URL returned");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Couldn't start checkout. Try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col bg-bg-page text-primary-text overflow-hidden">
      <Toaster position="top-right" />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-16 sm:px-6 lg:px-8 flex flex-col gap-12 items-center overflow-y-auto scrollbar-subtle">
        <div className="text-center space-y-3 max-w-lg">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Buy resume credits</h1>
          <p className="text-sm text-secondary-text leading-relaxed">
            One-time credit packs power AI resume generations. No subscription, and credits never expire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "border-primary shadow-xl shadow-primary/10"
                  : "border-divider/60 bg-bg-card"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full tracking-wide">
                  Most popular
                </span>
              )}

              <div className={`p-6 pb-5 ${plan.popular ? "bg-primary/10" : ""}`}>
                <p className="text-xs font-bold uppercase tracking-wide text-secondary-text">
                  {plan.name}
                </p>
                <div className="mt-2">
                  <span className="text-4xl font-black tracking-tight">{plan.price}</span>
                </div>
                <p className="mt-1 text-xs font-semibold text-primary">{plan.perResume}</p>
              </div>

              <div className="flex flex-col flex-1 gap-4 p-6 pt-5">
                <div className="text-xs font-bold text-primary-text bg-bg-page/60 border border-divider/40 rounded-md px-3 py-2 text-center">
                  {plan.generations} resume generations
                </div>

                <p className="text-xs text-secondary-text leading-relaxed min-h-[2.5rem]">
                  {plan.description}
                </p>

                <ul className="space-y-2 border-t border-divider/30 pt-4 text-xs font-medium text-secondary-text">
                  {FEATURES.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <FaCheck className="text-primary text-[10px] shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleCheckout(plan.id)}
                  disabled={loadingPlan !== null}
                  className={`mt-auto w-full py-3 rounded-full text-xs font-bold transition-colors active:scale-[0.98] disabled:opacity-60 ${
                    plan.popular
                      ? "bg-primary text-white hover:bg-primary-hover"
                      : "bg-bg-page text-primary-text border border-divider hover:bg-bg-card"
                  }`}
                >
                  {loadingPlan === plan.id ? "Loading checkout…" : "Purchase credits"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-secondary-text text-center">
          Secure checkout powered by Stripe. Credits never expire.
        </p>
      </main>

      <Footer />
    </div>
  );
}