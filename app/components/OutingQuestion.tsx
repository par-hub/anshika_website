"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { LittleBow } from "./SparklesAndBows";

const noMessages = [
  `NO \u{1F62D}`,
  `Are you sure? \u{1F97A}`,
  `Really? \u{1F62D}`,
  `Nice try \u{1F602}`,
  `NO is running away \u{1F4A8}`,
];

type Position = { x: number; y: number };

export function OutingQuestion({ onYes }: { onYes: () => void }) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [attempts, setAttempts] = useState(0);
  const [position, setPosition] = useState<Position>({ x: 0, y: 12 });
  const reduceMotion = useReducedMotion();

  const centerButton = useCallback(() => {
    const zone = zoneRef.current;
    const button = noButtonRef.current;
    if (!zone || !button) return;

    setPosition({
      x: Math.max(10, (zone.clientWidth - button.offsetWidth) / 2),
      y: 12,
    });
  }, []);

  useEffect(() => {
    centerButton();
    window.addEventListener("resize", centerButton);
    return () => window.removeEventListener("resize", centerButton);
  }, [centerButton]);

  const moveNo = useCallback(() => {
    const zone = zoneRef.current;
    const button = noButtonRef.current;
    if (!zone || !button) return;

    const padding = 10;
    const maxX = Math.max(padding, zone.clientWidth - button.offsetWidth - padding);
    const maxY = Math.max(padding, zone.clientHeight - button.offsetHeight - padding);

    setAttempts((current) => current + 1);
    setPosition((prev) => {
      let nextX = padding + Math.random() * (maxX - padding);
      let nextY = padding + Math.random() * (maxY - padding);

      if (maxX - padding > 50 && Math.abs(nextX - prev.x) < 40) {
        nextX = prev.x > maxX / 2 ? padding + Math.random() * 30 : maxX - Math.random() * 30;
      }
      return { x: nextX, y: nextY };
    });
  }, []);

  const message = noMessages[Math.min(attempts, noMessages.length - 1)];

  return (
    <motion.section
      className="outing-card"
      initial={{ opacity: 0, y: 20, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby="outing-title"
    >
      <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.16 }}>
        <LittleBow /> One little question
      </motion.p>
      <motion.h1 id="outing-title" className="outing-intro" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.55 }}>
        Okay, Anshika...
      </motion.h1>
      <motion.p className="outing-subtitle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.43, duration: 0.55 }}>
        Here&apos;s my question.
      </motion.p>
      <motion.h2 className="outing-question" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58, duration: 0.6 }}>
        Will you go on an outing with me? {"\u{1F337}"}
      </motion.h2>

      <motion.div className="yes-action" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.78, duration: 0.55 }}>
        <motion.button
          className="yes-button"
          type="button"
          onClick={onYes}
          whileHover={{ y: -2, scale: 1.03, boxShadow: "0 18px 36px -4px rgba(126, 148, 201, 0.45)" }}
          whileTap={{ scale: 0.98 }}
        >
          YES {"\u{1F499}"}
        </motion.button>
      </motion.div>

      <motion.div className="no-runaway-zone" ref={zoneRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.94, duration: 0.5 }}>
        <motion.button
          className="no-button"
          ref={noButtonRef}
          type="button"
          tabIndex={-1}
          aria-label="No option moves away when approached"
          style={{ left: 0, top: 0 }}
          animate={{ x: position.x, y: position.y, rotate: attempts % 2 === 0 ? 0 : attempts % 3 === 0 ? -3 : 3 }}
          transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 250, damping: 19 }}
          onPointerEnter={moveNo}
          onPointerDown={(event) => {
            event.preventDefault();
            moveNo();
          }}
          onTouchStart={(event) => {
            event.preventDefault();
            moveNo();
          }}
          onClick={(event) => {
            event.preventDefault();
            moveNo();
          }}
        >
          {message}
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
