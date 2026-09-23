import { skillGroups } from "@/utils/data/skills";
import Reveal from "../../helper/reveal";
import SectionHeading from "../../helper/section-heading";

// Full class names so Tailwind can see them at build time.
const dot = {
  cyan: "bg-cyan-400",
  violet: "bg-violet-400",
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
  pink: "bg-pink-400",
  sky: "bg-sky-400",
};

function Skills() {
  const [primary, ...rest] = skillGroups;

  return (
    <section id="skills" className="section">
      <SectionHeading
        number="03"
        eyebrow="Toolkit"
        title="Deep on the AI stack, fluent across the whole product."
        description="Grouped the way I use them. Nothing here is a tutorial-only skill; each has shipped in a project above."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Reveal className="card-featured p-6 sm:p-7 lg:col-span-3">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
              <span className={`h-2 w-2 rounded-full ${dot[primary.accent]}`} />
              {primary.name}
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Primary focus</p>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {primary.items.map((item) => (
              <li key={item} className="chip-strong !px-3 !py-1.5 !text-xs">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        {rest.map((group, i) => (
          <Reveal key={group.id} delay={i * 60} className="card card-hover p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
              <span className={`h-2 w-2 rounded-full ${dot[group.accent] ?? "bg-accent"}`} />
              {group.name}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Skills;
