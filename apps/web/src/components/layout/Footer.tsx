import contactData from "@/data/contact.json";

const CURRENT_YEAR = new Date().getFullYear();

const SOCIAL_LINKS = [
  { label: "GitHub", href: contactData.github },
  { label: "LinkedIn", href: contactData.linkedin },
  { label: "Twitter", href: contactData.twitter },
  { label: "Email", href: `mailto:${contactData.email}` },
].filter((l) => l.href && l.href !== "mailto:");

export default function Footer() {
  return (
    <footer className="w-full py-10 px-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#121414] border-t border-[#444748]/20">
      {/* Left — brand + copyright */}
      <div className="flex flex-col items-center md:items-start gap-1">
        <span className="text-2xl font-bold leading-[1.3] tracking-[-0.01em] text-[#e3e2e2]">
          DevArchitect
        </span>
        <p className="font-mono text-sm font-medium leading-[1.4] tracking-[0.02em] text-[#8e9192]">
          © {CURRENT_YEAR} Senior Frontend Engineer. Built with precision.
        </p>
      </div>

      {/* Right — social links */}
      <nav aria-label="Social links">
        <ul className="flex items-center gap-10">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="font-mono text-sm font-medium leading-[1.4] tracking-[0.02em] text-[#8e9192] hover:text-[#aec6ff] transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
