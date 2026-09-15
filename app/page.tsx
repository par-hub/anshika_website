"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Celebration } from "./components/Celebration";
import { FloralDecorations } from "./components/FloralDecorations";
import { FloatingButterflies } from "./components/FloatingButterflies";
import { OutingDetails, type OutingPlan } from "./components/OutingDetails";
import { OutingQuestion } from "./components/OutingQuestion";
import { AmbientSparkles, LittleBow } from "./components/SparklesAndBows";

type StoryStage = "welcome" | "apology" | "appreciation" | "outing" | "celebration" | "details" | "confirmation";

const decorations = [
  { left: "9%", top: "16%", delay: 0.2, size: 12, type: "petal" },
  { left: "84%", top: "13%", delay: 0.7, size: 16, type: "petal" },
  { left: "79%", top: "76%", delay: 1.1, size: 10, type: "petal" },
  { left: "16%", top: "81%", delay: 1.5, size: 14, type: "petal" },
  { left: "12%", top: "43%", delay: 0.9, size: 9, type: "star" },
  { left: "87%", top: "52%", delay: 1.8, size: 9, type: "star" },
  { left: "22%", top: "11%", delay: 1.3, size: 11, type: "heart" },
];

const apologyLines = [
  "I know I made you cry, and I'm really sorry for that.",
  "I love you so much, and I'm genuinely thankful that you came into my life and made it so beautiful.",
  "Thank you for being a part of my life and for making it even more beautiful every day. \u{1F49C}",
  "I know I've made mistakes, and thank you for always being patient with me and overlooking them.",
];

const appreciationLines = [
  "Before I ask you what I want to ask, I just want you to know something.",
  "You have become such a beautiful part of my life.",
  "Thank you for all the little things you do, for the moments we share, and simply for being you.",
  "You came into my life and somehow made ordinary days feel a little more special.",
  "I don't say it enough, but I really appreciate having you in my life. \u{1F49C}",
];

const cardTransition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] } as const;

function Welcome({ onBegin }: { onBegin: () => void }) {
  return (
    <motion.section className="welcome-card" initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.99 }} transition={cardTransition}>
      <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.6 }}>
        <LittleBow /> A note from Parth
      </motion.p>
      <h1>Hi, Anshika.</h1>
      <p className="welcome-copy">I made a small space for a few things I&apos;ve been meaning to say.</p>
      <motion.button className="begin-button" type="button" onClick={onBegin} whileHover={{ y: -2, boxShadow: "0 16px 32px rgba(135, 117, 173, 0.4)" }} whileTap={{ scale: 0.98 }}>
        Begin <span aria-hidden="true">{"\u2192"}</span>
      </motion.button>
      <p className="hint">Take your time</p>
    </motion.section>
  );
}

function Apology({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.section className="apology-card" initial={{ opacity: 0, y: 20, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.99 }} transition={cardTransition} aria-labelledby="apology-title">
      <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <LittleBow /> A sincere note
      </motion.p>
      <motion.h1 id="apology-title" className="apology-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, ...cardTransition }}>
        Anshika,
      </motion.h1>
      <div className="apology-copy">
        {apologyLines.map((line, index) => (
          <motion.p key={line} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 + index * 0.16, ...cardTransition }}>
            {line}
          </motion.p>
        ))}
      </div>
      <motion.button className="begin-button apology-button" type="button" onClick={onContinue} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.08, ...cardTransition }} whileHover={{ y: -2, boxShadow: "0 16px 32px rgba(135, 117, 173, 0.4)" }} whileTap={{ scale: 0.98 }}>
        There&apos;s something I want to ask you <span aria-hidden="true">{"\u2192"}</span>
      </motion.button>
    </motion.section>
  );
}

function Appreciation({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.section className="appreciation-card" initial={{ opacity: 0, y: 20, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.99 }} transition={cardTransition} aria-labelledby="appreciation-title">
      <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <LittleBow /> From my heart
      </motion.p>
      <motion.h1 id="appreciation-title" className="apology-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, ...cardTransition }}>
        Anshika,
      </motion.h1>
      <div className="apology-copy">
        {appreciationLines.map((line, index) => (
          <motion.p key={line} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 + index * 0.15, ...cardTransition }}>
            {line}
          </motion.p>
        ))}
      </div>
      <motion.p className="appreciation-closing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.18, ...cardTransition }}>
        And now... I have one little question for you.
      </motion.p>
      <motion.button className="begin-button appreciation-button" type="button" onClick={onContinue} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, ...cardTransition }} whileHover={{ y: -2, boxShadow: "0 16px 32px rgba(135, 117, 173, 0.4)" }} whileTap={{ scale: 0.98 }}>
        Okay, here&apos;s my question <span aria-hidden="true">{"\u2192"}</span>
      </motion.button>
    </motion.section>
  );
}

function Confirmation({ plan }: { plan: OutingPlan }) {
  return (
    <motion.section className="confirmation-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={cardTransition}>
      <p className="eyebrow"><LittleBow /> From Parth</p>
      <h1>Perfect. {"\u{1F49C}"}</h1>
      <p className="confirmation-copy">Now it&apos;s a plan.</p>
      <dl className="plan-summary">
        <div><dt>{"\u{1F4CD}"} Place</dt><dd>{plan.place}</dd></div>
        <div><dt>{"\u{1F4C5}"} Date</dt><dd>{plan.date}</dd></div>
        <div><dt>{"\u{1F550}"} Time</dt><dd>{plan.time}</dd></div>
      </dl>
      <p className="confirmation-copy">I can&apos;t wait. {"\u{1F337}"}</p>
    </motion.section>
  );
}

export default function Home() {
  const [stage, setStage] = useState<StoryStage>("welcome");
  const [plan, setPlan] = useState<OutingPlan | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <main className={`welcome-page ${stage === "apology" ? "apology-background" : ""} ${stage === "appreciation" ? "appreciation-background" : ""}`}>
      <div className="ambient-glow glow-one" />
      <div className="ambient-glow glow-two" />
      <FloralDecorations />
      <FloatingButterflies />
      <AmbientSparkles />
      {decorations.map((item) => (
        <motion.span aria-hidden="true" className={`decoration ${item.type}`} key={`${item.left}-${item.top}`} style={{ left: item.left, top: item.top, width: item.size, height: item.size }} animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, 10, 0], opacity: [0.24, 0.62, 0.24] }} transition={{ duration: 5, delay: item.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
      <AnimatePresence mode="wait">
        {stage === "welcome" && <Welcome key="welcome" onBegin={() => setStage("apology")} />}
        {stage === "apology" && <Apology key="apology" onContinue={() => setStage("appreciation")} />}
        {stage === "appreciation" && <Appreciation key="appreciation" onContinue={() => setStage("outing")} />}
        {stage === "outing" && <OutingQuestion key="outing" onYes={() => setStage("celebration")} />}
        {stage === "celebration" && <Celebration key="celebration" onContinue={() => setStage("details")} />}
        {stage === "details" && <OutingDetails key="details" onSubmit={(outingPlan) => { setPlan(outingPlan); setStage("confirmation"); }} />}
        {stage === "confirmation" && plan && <Confirmation key="confirmation" plan={plan} />}
      </AnimatePresence>
    </main>
  );
}

