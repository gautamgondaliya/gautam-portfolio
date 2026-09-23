"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const THRESHOLD = 400;

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-5 z-40 rounded-full border border-line bg-surface p-3 text-ink shadow-lg transition-colors hover:border-accent hover:text-white"
    >
      <FaArrowUp size={14} />
    </button>
  );
}

export default ScrollToTop;
