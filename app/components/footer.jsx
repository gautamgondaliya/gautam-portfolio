import { personalData } from "@/utils/data/personal-data";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col items-center justify-between gap-3 py-8 text-sm text-muted sm:flex-row">
        <p>
          © {year} {personalData.name}. Built with Next.js.
        </p>
        <div className="flex items-center gap-5">
          <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="link-muted">
            GitHub
          </a>
          <a href={personalData.linkedIn} target="_blank" rel="noopener noreferrer" className="link-muted">
            LinkedIn
          </a>
          <a href={personalData.leetcode} target="_blank" rel="noopener noreferrer" className="link-muted">
            LeetCode
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
