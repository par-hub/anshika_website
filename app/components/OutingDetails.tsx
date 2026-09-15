"use client";

import { motion } from "framer-motion";
import { FormEvent, useRef, useState } from "react";
import { LittleBow } from "./SparklesAndBows";

export type OutingPlan = { place: string; date: string; time: string };

export function OutingDetails({ onSubmit }: { onSubmit: (plan: OutingPlan) => void }) {
  const [plan, setPlan] = useState<OutingPlan>({ place: "", date: "", time: "" });
  const [attempted, setAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const submissionIdRef = useRef(
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : "00000000-0000-4000-8000-000000000000"
  );

  const complete = Boolean(plan.place.trim() && plan.date && plan.time);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    setErrorMessage(null);

    if (!complete || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/submit-outing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          place: plan.place.trim(),
          date: plan.date,
          time: plan.time,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save");
      }

      onSubmit({ ...plan, place: plan.place.trim() });
    } catch {
      setErrorMessage("Something went wrong. Please try again in a moment. 💜");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.section className="details-card" initial={{ opacity: 0, y: 20, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} aria-labelledby="details-title">
      <p className="eyebrow"><LittleBow /> A date with Parth</p>
      <h1 id="details-title" className="details-title">Your choice {"\u{1F499}"}</h1>
      <p className="details-intro">Where should we go?</p>
      <form className="outing-form" onSubmit={submit} noValidate>
        <label htmlFor="place">{"\u{1F4CD}"} Where should we go?</label>
        <input id="place" name="place" type="text" value={plan.place} onChange={(event) => { setPlan({ ...plan, place: event.target.value }); setErrorMessage(null); }} placeholder="Tell me where you'd like to go..." autoComplete="off" disabled={isSubmitting} />

        <p className="details-intro schedule-prompt">When should we go?</p>
        <div className="date-time-grid">
          <div>
            <label htmlFor="date">{"\u{1F4C5}"} When should we go?</label>
            <input id="date" name="date" type="date" value={plan.date} onChange={(event) => { setPlan({ ...plan, date: event.target.value }); setErrorMessage(null); }} disabled={isSubmitting} />
          </div>
          <div>
            <label htmlFor="time">{"\u{1F550}"} What time?</label>
            <input id="time" name="time" type="time" value={plan.time} onChange={(event) => { setPlan({ ...plan, time: event.target.value }); setErrorMessage(null); }} disabled={isSubmitting} />
          </div>
        </div>
        {errorMessage ? (
          <p className="validation-message" role="alert" style={{ color: "#9e5572", fontWeight: 600 }}>{errorMessage}</p>
        ) : !complete ? (
          <p className="validation-message" aria-live="polite">{attempted ? "Just choose a place, date, and time to continue." : "Choose a place, date, and time to make it a plan."}</p>
        ) : null}
        <motion.button className="begin-button plan-button" type="submit" disabled={!complete || isSubmitting} whileHover={complete && !isSubmitting ? { y: -2, boxShadow: "0 16px 32px rgba(135, 117, 173, 0.4)" } : undefined} whileTap={complete && !isSubmitting ? { scale: 0.98 } : undefined}>
          {isSubmitting ? "Planning our outing... \u{1F49C}" : "Plan our outing \u{1F499}"}
        </motion.button>
      </form>
    </motion.section>
  );
}
