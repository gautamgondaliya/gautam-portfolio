"use client";

import { useEffect, useRef } from "react";

const GlowCard = ({ children, identifier }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    
    const container = containerRef.current;
    const cards = container.querySelectorAll(`.glow-card-${identifier}`);

    const config = {
      proximity: 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
    };

    const updateGlow = (e) => {
      cards.forEach((card) => {
        const bounds = card.getBoundingClientRect();
        const isHovering =
          e?.x > bounds.left - config.proximity &&
          e?.x < bounds.right + config.proximity &&
          e?.y > bounds.top - config.proximity &&
          e?.y < bounds.bottom + config.proximity;

        card.style.setProperty('--active', isHovering ? 1 : config.opacity);

        const center = [bounds.left + bounds.width / 2, bounds.top + bounds.height / 2];
        let angle = (Math.atan2(e?.y - center[1], e?.x - center[0]) * 180) / Math.PI;
        if (angle < 0) angle += 360;

        card.style.setProperty('--start', angle + 90);
      });
    };

    const restyleContainer = () => {
      container?.style.setProperty('--gap', config.gap);
      container?.style.setProperty('--blur', config.blur);
      container?.style.setProperty('--spread', config.spread);
      container?.style.setProperty('--direction', config.vertical ? 'column' : 'row');
    };

    restyleContainer();
    document.body.addEventListener("pointermove", updateGlow);

    return () => {
      document.body.removeEventListener("pointermove", updateGlow);
    };
  }, [identifier]);

  return (
    <div ref={containerRef} className={`glow-container-${identifier} glow-container`}>
      <article className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`}>
        <div className="glows"></div>
        {children}
      </article>
    </div>
  );
};

export default GlowCard;