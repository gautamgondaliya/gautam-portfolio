import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { MdArrowForward, MdOutlineFileDownload } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";
import AgentTerminal from "./agent-terminal";

const socials = [
  { href: personalData.github, label: "GitHub", Icon: BsGithub },
  { href: personalData.linkedIn, label: "LinkedIn", Icon: BsLinkedin },
  { href: personalData.leetcode, label: "LeetCode", Icon: SiLeetcode },
  { href: `mailto:${personalData.email}`, label: "Email", Icon: HiOutlineMail },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="container-x grid min-w-0 items-center gap-14 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-28">
        <div className="min-w-0 animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 font-mono text-[11px] text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {personalData.availability}
          </span>

          <p className="mt-8 font-display text-lg font-medium text-ink sm:text-xl">
            {personalData.name} <span className="text-muted">·</span>{" "}
            <span className="text-accent">{personalData.designation}</span>
          </p>

          <h1 className="mt-4 font-display text-[2.4rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
            I build AI systems
            <br />
            that{" "}
            <span className="bg-gradient-to-r from-accent via-sky-300 to-accent2 bg-clip-text text-transparent">
              ship to production.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            LLM agents, RAG pipelines and real-time platforms, owned end to end from the agent graph to the cloud
            deploy. Recently: a 10-agent LangGraph code generator and a meeting-intelligence product with hybrid
            RAG. Previously: livestream infrastructure for 200,000+ concurrent viewers.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="#projects" className="btn-primary">
              See the work <MdArrowForward size={18} />
            </Link>
            <a href={personalData.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Resume <MdOutlineFileDownload size={18} />
            </a>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="link-muted"
              >
                <Icon size={21} />
              </a>
            ))}
            <span className="font-mono text-xs text-muted">{personalData.location}</span>
          </div>
        </div>

        <div className="min-w-0 animate-fade-up [animation-delay:150ms]">
          <AgentTerminal />
          <p className="mt-3 text-center font-mono text-[11px] text-muted">
            Replay of a run on my multi-agent platform. Review loop, sandbox tests, human approval gate.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
