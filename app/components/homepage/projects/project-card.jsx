import Image from "next/image";
import { BsGithub } from "react-icons/bs";
import { HiOutlineExternalLink } from "react-icons/hi";
import PipelineFlow from "../../helper/pipeline-flow";
import Reveal from "../../helper/reveal";
import AgentGraph from "./agent-graph";

function Links({ project, primary = true }) {
  if (!project.demo && !project.code) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {project.demo ? (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className={`${primary ? "btn-primary" : "btn-ghost"} !py-2.5`}
        >
          Live demo <HiOutlineExternalLink size={16} />
        </a>
      ) : null}
      {project.code ? (
        <a href={project.code} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2.5">
          <BsGithub size={16} /> Source
        </a>
      ) : null}
    </div>
  );
}

function Metrics({ metrics }) {
  return (
    <dl className="flex flex-wrap gap-x-10 gap-y-4">
      {metrics.map((m) => (
        <div key={m.label}>
          <dt className="font-display text-2xl font-semibold text-white">{m.value}</dt>
          <dd className="mt-0.5 text-xs text-muted">{m.label}</dd>
        </div>
      ))}
    </dl>
  );
}

function Stack({ stack }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {stack.map((s) => (
        <li key={s} className="chip">
          {s}
        </li>
      ))}
    </ul>
  );
}

function Visual({ project }) {
  if (project.visual === "image" && project.image) {
    return (
      <div className="browser-frame shadow-lift">
        <div className="bar">
          <span />
          <span />
          <span />
          <span className="ml-2 !h-auto !w-auto !rounded-md !bg-surface px-2 py-0.5 font-mono text-[10px] text-muted">
            {project.demo?.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
        </div>
        <Image
          src={project.image}
          alt={`${project.name} landing page`}
          width={1280}
          height={690}
          className="h-auto w-full"
          sizes="(min-width: 1024px) 520px, 100vw"
        />
      </div>
    );
  }
  return (
    <div className="browser-frame p-3 shadow-lift sm:p-4">
      <AgentGraph />
    </div>
  );
}

function FeaturedCard({ project, index }) {
  const flip = index % 2 === 1;
  return (
    <Reveal as="article" className="card-featured min-w-0 overflow-hidden">
      <div className={`grid min-w-0 gap-10 p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="min-w-0">
          <p className="eyebrow">
            {String(index + 1).padStart(2, "0")} · {project.type === "personal" ? "Personal product" : project.company} · {project.period}
          </p>
          <h3 className="mt-3 font-display text-3xl font-semibold text-white">{project.name}</h3>
          <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
          <p className="mt-4 text-lg font-medium text-ink">{project.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{project.problem}</p>

          <h4 className="mt-7 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Key decisions</h4>
          <ol className="mt-3 space-y-3">
            {project.decisions.map((d, i) => (
              <li key={d.title} className="grid grid-cols-[1.5rem_1fr] gap-2">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{d.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">{d.why}</p>
                </div>
              </li>
            ))}
          </ol>

          {project.highlights?.length ? (
            <details className="group mt-5">
              <summary className="cursor-pointer list-none font-mono text-xs text-muted transition-colors hover:text-white">
                <span className="group-open:hidden">+ production details</span>
                <span className="hidden group-open:inline">− production details</span>
              </summary>
              <ul className="mt-3 space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-ink/90">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent2" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <Visual project={project} />
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Pipeline</h4>
            <div className="mt-3">
              <PipelineFlow steps={project.pipeline} />
            </div>
          </div>
          <Metrics metrics={project.metrics} />
          <Stack stack={project.stack} />
          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
            <p className="text-xs text-muted">{project.role}</p>
            <Links project={project} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function CompactCard({ project, delay = 0 }) {
  return (
    <Reveal as="article" delay={delay} className="card card-hover flex min-w-0 flex-col gap-5 p-6 sm:p-7">
      <div>
        <p className="eyebrow">
          {project.company} · {project.period}
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold text-white">{project.name}</h3>
        <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
      </div>

      {project.headline ? (
        <div className="rounded-xl border border-line bg-surface-2 px-5 py-4">
          <p className="font-display text-3xl font-semibold text-white">{project.headline.value}</p>
          <p className="mt-1 text-sm text-muted">{project.headline.label}</p>
        </div>
      ) : null}

      <ul className="space-y-2">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-sm leading-relaxed text-ink/90">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent2" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div>
        <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Pipeline</h4>
        <div className="mt-3">
          <PipelineFlow steps={project.pipeline} />
        </div>
      </div>

      <Stack stack={project.stack} />

      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <p className="text-xs text-muted">{project.role}</p>
        <Links project={project} primary={false} />
      </div>
    </Reveal>
  );
}

function ProjectCard({ project, variant = "featured", index = 0, delay = 0 }) {
  return variant === "featured" ? (
    <FeaturedCard project={project} index={index} />
  ) : (
    <CompactCard project={project} delay={delay} />
  );
}

export default ProjectCard;
