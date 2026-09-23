import { experiences } from "@/utils/data/experience";
import Reveal from "../../helper/reveal";
import SectionHeading from "../../helper/section-heading";

function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading
        number="04"
        eyebrow="Experience"
        title="Ownership from architecture to deployment."
        description="Systems with real traffic, real money and real users. Metrics are from load tests and production dashboards."
      />

      <ol className="relative border-l border-line">
        {experiences.map((exp, i) => (
          <Reveal as="li" key={exp.id} delay={i * 80} className="relative pb-14 pl-8 last:pb-0 sm:pl-10">
            <span
              className={`absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full border-2 border-bg ${
                exp.current ? "bg-accent shadow-[0_0_0_4px_rgba(34,211,238,0.15)]" : "bg-line-2"
              }`}
            />
            <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
              <div className="min-w-0">
                <p className="font-mono text-xs text-muted">
                  {exp.period}
                  {exp.current ? <span className="ml-2 text-accent">current</span> : null}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white">{exp.company}</h3>
                <p className="mt-0.5 text-sm text-muted">
                  {exp.title} · {exp.location}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {exp.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-ink/90">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent2" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {exp.stack.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {exp.impact ? (
                <div className="card h-fit px-5 py-4 lg:mt-8">
                  <p className="font-display text-3xl font-semibold text-white">{exp.impact.value}</p>
                  <p className="mt-1 text-xs text-muted">{exp.impact.label}</p>
                </div>
              ) : null}
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

export default Experience;
