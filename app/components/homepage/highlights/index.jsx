import { highlights } from "@/utils/data/highlights";
import Link from "next/link";
import Reveal from "../../helper/reveal";

function Highlights() {
  return (
    <section aria-label="Highlights" className="container-x pb-6">
      <Reveal>
        <div className="hairline" />
        <dl className="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {highlights.map((h) => (
            <Link key={h.id} href={h.href} className="group px-2 py-8 md:px-8">
              <dt className="font-display text-3xl font-semibold tracking-tight text-white transition-colors group-hover:text-accent sm:text-4xl">
                {h.value}
              </dt>
              <dd className="mt-2 text-sm text-muted">{h.label}</dd>
            </Link>
          ))}
        </dl>
        <div className="hairline" />
      </Reveal>
    </section>
  );
}

export default Highlights;
