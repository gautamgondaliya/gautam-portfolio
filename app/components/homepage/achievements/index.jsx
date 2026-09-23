import { achievements } from "@/utils/data/achievements";
import { HiOutlineExternalLink } from "react-icons/hi";
import Reveal from "../../helper/reveal";
import SectionHeading from "../../helper/section-heading";

function Achievements() {
  return (
    <section id="achievements" className="section">
      <SectionHeading
        number="05"
        eyebrow="Signals"
        title="Competitive programming and hackathons."
        description="Fast, correct problem solving under time pressure. The same muscle used for agent-loop debugging at 2am."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {achievements.map((a, i) => {
          const Wrapper = a.link ? "a" : "div";
          const props = a.link ? { href: a.link, target: "_blank", rel: "noopener noreferrer" } : {};
          return (
            <Reveal key={a.id} delay={i * 70}>
              <Wrapper {...props} className={`card block h-full p-6 ${a.link ? "card-hover" : ""}`}>
                <p className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {a.title}
                  {a.link ? <HiOutlineExternalLink size={14} /> : null}
                </p>
                <p className="mt-4 font-display text-2xl font-semibold text-white">{a.value}</p>
                <p className="mt-2 text-sm text-muted">{a.detail}</p>
              </Wrapper>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export default Achievements;
