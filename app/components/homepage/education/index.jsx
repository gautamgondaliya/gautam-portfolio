import { educations } from "@/utils/data/educations";
import Reveal from "../../helper/reveal";

function Education() {
  return (
    <section id="education" className="container-x pb-20 lg:pb-28">
      <Reveal>
        <div className="hairline" />
        <div className="grid gap-8 py-10 md:grid-cols-[180px_1fr]">
          <p className="eyebrow">Education</p>
          <div className="grid gap-6 sm:grid-cols-2">
            {educations.map((e) => (
              <div key={e.id} className="min-w-0">
                <p className="font-mono text-xs text-muted">{e.period}</p>
                <h3 className="mt-1 text-base font-semibold text-white">{e.degree}</h3>
                <p className="text-sm text-accent">{e.field}</p>
                <p className="mt-1 text-sm text-muted">
                  {e.institution} · {e.location}
                </p>
                <p className="mt-2 font-mono text-xs text-ink/90">{e.score}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hairline" />
      </Reveal>
    </section>
  );
}

export default Education;
