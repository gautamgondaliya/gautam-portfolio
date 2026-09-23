import Reveal from "./reveal";

function SectionHeading({ number, eyebrow, title, description, action }) {
  return (
    <Reveal className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow flex items-center gap-3">
          {number ? <span className="text-muted">{number}</span> : null}
          <span className="h-px w-6 bg-accent/60" />
          {eyebrow}
        </p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
        {description ? <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}

export default SectionHeading;
