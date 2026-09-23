"use client";

import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { MdOutlineFileDownload } from "react-icons/md";

const links = [
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/75 backdrop-blur-md">
      <nav className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight text-white">
          <span className="text-accent">~/</span>gautam
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <Link
                href={`/#${l.id}`}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  active === l.id ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="ml-3">
            <a href={personalData.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2">
              Resume <MdOutlineFileDownload size={16} />
            </a>
          </li>
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-ink md:hidden"
        >
          {open ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-line bg-bg md:hidden">
          <ul className="container-x flex flex-col py-2">
            {links.map((l) => (
              <li key={l.id}>
                <Link href={`/#${l.id}`} onClick={() => setOpen(false)} className="block px-2 py-3 text-sm text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="px-2 py-3">
              <a href={personalData.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full">
                Resume <MdOutlineFileDownload size={16} />
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
