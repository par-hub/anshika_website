"use client";

import { motion } from "framer-motion";
import { LittleBow } from "./SparklesAndBows";

export function Celebration({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.section className="celebration-card" initial={{ opacity: 0, y: 20, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} aria-labelledby="celebration-title">
      <div className="bouquet-presentation">
        <span className="bouquet-particle particle-one" aria-hidden="true" />
        <span className="bouquet-particle particle-two" aria-hidden="true" />
        <span className="bouquet-particle particle-three" aria-hidden="true" />
        <motion.img
          src="/bouquet.jpg"
          alt="A bouquet for Anshika"
          className="bouquet-image"
          initial={{ opacity: 0, scale: 0.8, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 18, delay: 0.16 }}
        />
      </div>
      <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <LittleBow /> For You
      </motion.p>
      <motion.h1 id="celebration-title" className="celebration-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.76, duration: 0.5 }}>
        Thank you, Anshika {"\u{1F49C}"}
      </motion.h1>
      <motion.p className="celebration-copy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.96, duration: 0.5 }}>
        You just made me really happy.
      </motion.p>
      <motion.p className="celebration-copy soft-copy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.14, duration: 0.5 }}>
        Now there&apos;s just one little thing left...
      </motion.p>
      <motion.button className="begin-button celebration-button" type="button" onClick={onContinue} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, duration: 0.5 }} whileHover={{ y: -2, boxShadow: "0 16px 32px rgba(135, 117, 173, 0.4)" }} whileTap={{ scale: 0.98 }}>
        Now you choose <span aria-hidden="true">{"\u2192"}</span>
      </motion.button>
    </motion.section>
  );
}
