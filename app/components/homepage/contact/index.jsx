import { personalData } from "@/utils/data/personal-data";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { SiLeetcode } from "react-icons/si";
import Reveal from "../../helper/reveal";
import ContactForm from "./contact-form";

function ContactSection() {
  return (
    <section id="contact" className="section">
      <Reveal className="card-featured overflow-hidden">
        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:p-14">
          <div className="min-w-0">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-muted">07</span>
              <span className="h-px w-6 bg-accent/60" />
              Contact
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Hiring for AI engineering?
              <br />
              <span className="text-muted">Let&apos;s talk.</span>
            </h2>
            <p className="mt-5 max-w-md text-muted">
              Open to Full Stack AI Engineer roles and hard agent or retrieval problems. I reply within a day.
            </p>

            <div className="mt-8 space-y-4">
              <a href={`mailto:${personalData.email}`} className="flex items-center gap-3 text-ink/90 hover:text-white">
                <HiOutlineMail className="text-accent" size={20} />
                <span>{personalData.email}</span>
              </a>
              <a href={`tel:${personalData.phoneHref}`} className="flex items-center gap-3 text-ink/90 hover:text-white">
                <HiOutlinePhone className="text-accent" size={20} />
                <span>{personalData.phone}</span>
              </a>
              <p className="flex items-center gap-3 text-ink/90">
                <HiOutlineLocationMarker className="text-accent" size={20} />
                <span>{personalData.location}</span>
              </p>
            </div>

            <div className="mt-8 flex items-center gap-5">
              <a href={personalData.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="link-muted">
                <BsGithub size={22} />
              </a>
              <a href={personalData.linkedIn} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="link-muted">
                <BsLinkedin size={22} />
              </a>
              <a href={personalData.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode" className="link-muted">
                <SiLeetcode size={22} />
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </Reveal>
    </section>
  );
}

export default ContactSection;
