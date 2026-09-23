import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Reveal from "../../helper/reveal";
import SectionHeading from "../../helper/section-heading";

function AboutSection() {
  return (
    <section id="about" className="section">
      <SectionHeading number="06" eyebrow="About" title="Who I am, in one screen." />

      <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
        <Reveal className="mx-auto w-60 lg:w-full">
          <div className="card-featured p-2">
            <Image
              src={personalData.profile}
              width={800}
              height={872}
              alt={personalData.name}
              className="aspect-[4/5] w-full rounded-xl object-cover"
            />
          </div>
          <p className="mt-3 text-center font-mono text-xs text-muted">{personalData.location}</p>
        </Reveal>

        <Reveal delay={80} className="min-w-0">
          <p className="text-base leading-relaxed text-ink/90 sm:text-lg">{personalData.summary}</p>

          <h3 className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Currently</h3>
          <ul className="mt-3 space-y-2.5">
            {personalData.currently.map((line) => (
              <li key={line} className="flex gap-3 text-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={personalData.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Full resume
            </a>
            <a href={personalData.systemDesign} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              System design notes
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default AboutSection;
