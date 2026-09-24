/**
 * Personal website — Kevin (Khaled)
 * ----------------------------------------------------------------
 * Single-page React component. Sections: Hero / Work / Projects / Contact.
 * Nav buttons smooth-scroll to each section (no routing, no page reload).
 *
 * TO EDIT CONTENT:
 *   - WORK      -> array below, one entry per job
 *   - PROJECTS  -> array below, one entry per project
 *   - Hero name/tagline -> in the <Hero /> component
 *   - Contact emails/links -> in the <Contact /> component
 *
 * TO ADD YOUR ASSETS:
 *   - Photo: drop a file at /public/profile.jpg (circle crop is automatic).
 *     If the image fails to load, it falls back to your initials.
 *   - Resume: drop a file at /public/resume.pdf — the "Resume" button
 *     downloads it directly.
 *
 * Colors, type, and spacing are all defined as CSS variables at the top
 * of the <style> block below — change a variable once, it updates everywhere.
 */

import { useState, useEffect } from "react";
import { Download, ArrowLeft, ArrowRight } from "lucide-react";

function Github({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.809 1.304 3.495.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .321.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

// ---- Content -------------------------------------------------------
const NAV = [
  { id: "hero", label: "Me" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const TECH_COLORS = {
  "Machine Learing": "#0ba160",
  "Python": "#6fa8dc",
  "AES-256-CBC": "#e0a458",
  "SHA-256": "#e0a458",
  "React": "#7fd1d1",
  "RBAC": "#8fbf8f",
  "Session security": "#8fbf8f",
  "Anomaly detection": "#9d8cdb",
  "Time-series forecasting": "#9d8cdb",
  "JavaScript": "#e0c95e",
  "Browser Extension": "#e08a8a",
};

const STATUS_COLORS = {
  "Complete": "#00ff91",
  "In progress": "#a10b0b",
};

const WORK = [
  {
    id: "german-service-center",
    name: "German Service Center",
    role: "Software Engineering Intern",
    dates: "July 2025 - August 2025",
    bullets: [
      "Built an automated invoice estimation workflow with manager approval and auto-email to customers.",
      "Created a part-sourcing algorithm to estimate procurement timelines and find optimal vendors.",
      "Wrote Python scripts for daily database checkups and operational metrics.",
      "Documented system architecture for non-technical stakeholders.",
    ],
  },
  {
    id: "discrete-structures-ta",
    name: "University of New Brunswick",
    role: "Discrete Structures Teaching Assistant",
    dates: "January 2025 - April 2025",
    bullets: [
      "Personally nominated by Professor Connor Wilson to serve as his teaching assistant.",
      "Graded weekly assignments for 40-50 students with a focus on accuracy and consistency.",
      "Delivered feedback efficiently on a weekly turnaround with zero negative feedback from students.",
    ],
  },
];

const PROJECTS = [
  {
    id: "nadtfe",
    name: "NADTFE",
    full: "Network Anomaly Detection & Threat Forecasting Engine",
    status: "Complete",
    summary:
      "A machine learning system for detecting network intrusions and anomalous traffic patterns. Built with scikit-learn, FastAPI, React, Docker, and deployed on AWS EC2 with automated CI/CD pipelines.",
    tech: ["Machine Learing", "Python", "Anomaly detection", "Time-series forecasting"],
    link: "https://github.com/Khaled4262/Network-Anomaly-Detection-and-Threat-Forecasting-Engine",
  },
  {
    id: "githealth",
    name: "GitHealth",
    full: "GitHub-style habit tracker with streaks and a browser extension",
    status: "Complete",
    summary:
      "A GitHub-style contribution graph for daily health habits — click a square to lock in the day, build streaks, and watch a year of consistency take shape. Ships as a web app and a matching Chrome/Edge extension.",
    tech: ["React", "JavaScript", "Browser Extension"],
    link: "https://github.com/Khaled4262/githealth",
  },
  {
    id: "gradevault",
    name: "GradeVault",
    full: "Secure grading platform.",
    status: "Complete",
    summary:
      "A React frontend built around CWE-mapped controls — brute-force lockout, role-based access, and session timeout.",
    tech: ["React", "RBAC", "Session security"],
    link: "https://github.com/Khaled4262/grade-management-app",
  },
  {
    id: "securedropvault",
    name: "SecureDropVault",
    full: "Encrypted file-drop tool",
    status: "Complete",
    summary:
      "A file vault built for an academic project. Every drop is sealed with AES-256-CBC and checked against SHA-256 for tampering, including simulated tamper attacks to test the seals.",
    tech: ["Python", "AES-256-CBC", "SHA-256"],
    link: "https://github.com/Khaled4262/secure-drop-vault",
  },
];

const EMAILS = ["khaledtamimi1995.2@gmail.com", "khaled.altamimi@unb.ca"];
const GITHUB_URL = "https://github.com/Khaled4262";
const RESUME_URL = "/resume.pdf"; // replace with your actual file in /public

// ---- Small building blocks ------------------------------------------

function PhotoCircle() {
  const [errored, setErrored] = useState(false);
  return (
    <div className="photo-circle">
      {!errored ? (
        <img src="/profile.jpg" alt="Kevin (Khaled)" onError={() => setErrored(true)} />
      ) : (
        <span className="photo-fallback">K</span>
      )}
    </div>
  );
}

// ---- Sections ---------------------------------------------------------

function Hero() {
  return (
    <section className="hero" id="hero">
      <PhotoCircle />
      <div className="hero-info">
        <div className="hero-eyebrow"></div>
        <h1>Khaled Al Tamimi</h1>
        <p className="hero-tagline">
          4th year Computer Science student at UNB, specializing in Cybersecurity with a strong interest in Machine Learning.
        </p>
        <div className="fact-row">
          <span>Fredericton, NB</span>
          <span>BCS '27, UNB</span>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work">
      <div className="section-head">
        <h2>Work</h2>
      </div>
      {WORK.map((w) => (
        <div className="work-row" key={w.id}>
          <div className="work-header">
            <div className="work-name">{w.role}</div>
          </div>
          <div className="role-header-with-date">
            <div className="work-meta">{w.name}</div>
            <div className="work-dates">{w.dates}</div>
          </div>
          {w.bullets && w.bullets.length ? (
            <ul className="work-bullets">
              {w.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          ) : (
            <p className="work-placeholder">Add role, dates, and a short description here.</p>
          )}
        </div>
      ))}
    </section>
  );
}

function ProjectCard({ p }) {
  return (
    <div className={`project-row ${p.status === "Complete" ? "status-complete" : "status-progress"}`}>
      <div>
        <div className="project-name">{p.name}</div>
        <div className="project-full">{p.full}</div>
        <span className="project-status" style={{ color: STATUS_COLORS[p.status] || "var(--ink-dim)" }}>
          {p.status}
        </span>
      </div>
      <div>
        <p className="project-summary">{p.summary}</p>
        <div className="tech-tags">
          {p.tech.map((t) => {
            const color = TECH_COLORS[t] || "#9089a1";
            return (
              <span
                className="tech-tag"
                key={t}
                style={{ color, borderColor: `${color}66`, background: `${color}1a` }}
              >
                {t}
              </span>
            );
          })}
        </div>
        {p.link && (
          <a className="project-link" href={p.link} target="_blank" rel="noreferrer">
            View on GitHub
          </a>
        )}
      </div>
    </div>
  );
}

function Projects({ current, phase, onPrev, onNext, onOpenLibrary }) {
  return (
    <section id="projects">
      <div className="section-head">
        <h2>Projects</h2>
      </div>

      <div className={`project-card-wrap ${phase}`}>
        <ProjectCard p={PROJECTS[current]} />
      </div>

      <div className="project-controls">
        <div className="arrow-group">
          <button className="arrow-btn" onClick={onPrev} aria-label="Previous project">
            <ArrowLeft size={20} strokeWidth={2.75} />
          </button>
          <button className="arrow-btn" onClick={onNext} aria-label="Next project">
            <ArrowRight size={20} strokeWidth={2.75} />
          </button>
        </div>
        <button className="library-btn" onClick={onOpenLibrary}>
          Project library
        </button>
      </div>
    </section>
  );
}

function LibraryPage({ onHome }) {
  return (
    <div className="library-page">
      <button className="home-btn" onClick={onHome}>Home</button>
      <h2>Project library</h2>
      <div className="library-list">
        {PROJECTS.map((p) => (
          <div
            className="library-card"
            key={p.id}
            onClick={() => p.link && window.open(p.link, "_blank", "noreferrer")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" && p.link) window.open(p.link, "_blank", "noreferrer");
            }}>
            <div>
              <div className="project-name">{p.name}</div>
              <div className="project-full">{p.full}</div>
              <span className="project-status" style={{ color: STATUS_COLORS[p.status] || "var(--ink-dim)" }}>
                {p.status}
              </span>
            </div>
            <div>
              <p className="project-summary">{p.summary}</p>
              <div className="tech-tags">
                {p.tech.map((t) => {
                  const color = TECH_COLORS[t] || "#9089a1";
                  return (
                    <span
                      className="tech-tag"
                      key={t}
                      style={{ color, borderColor: `${color}66`, background: `${color}1a` }}
                    >
                      {t}
                    </span>
                  );
                })}
              </div>
              {p.link && <span className="project-link">View on GitHub →</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Contact() {
  return (
    <section id="contact">
      <div className="section-head">
        <h2>Contact</h2>
      </div>
      <div className="contact-row">
        <a className="icon-link" href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub">
          <Github size={22} />
        </a>
        {EMAILS.map((email) => (
          <a className="email-link" href={`mailto:${email}`} key={email}>
            <span className="email-icon" aria-hidden="true">✉</span>
            <span className="email-divider">|</span>
            {email}
          </a>
        ))}
        <a className="icon-link resume-link" href={RESUME_URL} download>
          <Download size={18} />
          <span>Resume</span>
        </a>
      </div>
    </section>
  );
}

// ---- Root ---------------------------------------------------------------

export default function PersonalWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [page, setPage] = useState("home"); // "home" | "library"
  const [currentProject, setCurrentProject] = useState(0);
  const [cardPhase, setCardPhase] = useState("idle"); // "idle" | "leaving" | "entering"
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const nextProject = () => {
    setCardPhase("leaving");
    setTimeout(() => {
      setCurrentProject((c) => (c + 1) % PROJECTS.length);
      setCardPhase("entering");
      setTimeout(() => setCardPhase("idle"), 20);
    }, 280);
  };

  const prevProject = () => {
    setCardPhase("leaving");
    setTimeout(() => {
      setCurrentProject((c) => (c - 1 + PROJECTS.length) % PROJECTS.length);
      setCardPhase("entering");
      setTimeout(() => setCardPhase("idle"), 20);
    }, 280);
  };

  return (
    <div className="site">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700&family=Manrope:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        :root {
          --bg: #000000;
          --bg-raised: #1a1620;
          --ink: #ece8f2;
          --ink-dim: #9089a1;
          --line: #292330;
          --line-bright: #3a3345;
          --accent: #9d8cdb;
          --accent-dim: #6f63a0;
          --nav-bg: rgba(15, 13, 20, 0.9);
        }

        :root[data-theme="light"] {
          --bg: #f7f5fb;
          --bg-raised: #ffffff;
          --ink: #1c1826;
          --ink-dim: #6e6578;
          --line: #e3dfec;
          --line-bright: #cfc7de;
          --accent: #7c4dd9;
          --accent-dim: #9c85cf;
          --nav-bg: rgba(247, 245, 251, 0.9);
        }

        html, body { background: var(--bg); }
        .site * { box-sizing: border-box; }
        .site {
          background: var(--bg);
          color: var(--ink);
          font-family: 'Manrope', -apple-system, sans-serif;
          line-height: 1.55;
          min-height: 100vh;
        }
        .site h1, .site h2, .site h3 {
          font-family: 'Unbounded', Georgia, sans-serif;
          font-weight: 600;
          margin: 0;
          color: var(--accent);
        }
        .site a { color: inherit; text-decoration: none; }
        .site :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

        .nav {
          position: sticky;
          top: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 28px;
          padding: 18px clamp(20px, 6vw, 64px);
          background: var(--nav-bg);
          backdrop-filter: blur(6px);
          transition: background 0.2s ease, border-color 0.2s ease;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s ease;
        }
        .nav.scrolled { border-bottom-color: var(--line); }
        .nav-links { display: flex; gap: 28px; }
        .nav-links button {
          position: relative;
          background: none;
          border: none;
          color: var(--ink-dim);
          font: inherit;
          font-size: 14.5px;
          cursor: pointer;
          padding: 4px 0;
        }
        .nav-links button::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 1px;
          background: var(--accent);
          transition: width 0.2s ease;
        }
        .nav-links button:hover { color: var(--ink); }
        .nav-links button:hover::after { width: 100%; }
        .theme-toggle {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 30;
          border: none;
          background: var(--bg-raised);
          box-shadow: 0 4px 14px rgba(157, 140, 219, 0.2), inset 0 0 0 1px var(--line-bright);
          color: var(--ink);
          font: inherit;
          font-size: 13px;
          padding: 11px 18px;
          border-radius: 999px;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, color 0.15s ease;
        }
        .theme-toggle:hover {
          background: var(--accent);
          color: #fff;
          box-shadow: 0 6px 20px rgba(157, 140, 219, 0.4);
          transform: translateY(-2px);
        }
        .theme-toggle:active { transform: translateY(0) scale(0.97); }
        .nav-toggle {
          display: none;
          width: 40px;
          height: 40px;
          align-items: center;
          justify-content: center;
          border: none;
          background: var(--bg-raised);
          box-shadow: 0 4px 14px rgba(157, 140, 219, 0.2), inset 0 0 0 1px var(--line-bright);
          color: var(--ink);
          border-radius: 50%;
          font-size: 16px;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, color 0.15s ease;
        }
        .nav-toggle:hover {
          background: var(--accent);
          color: #fff;
          box-shadow: 0 6px 20px rgba(157, 140, 219, 0.4);
          transform: translateY(-2px);
        }
        .nav-toggle:active { transform: translateY(0) scale(0.97); }
        .nav-mobile {
          display: flex;
          flex-direction: column;
          padding: 0 clamp(20px, 6vw, 64px) 14px;
          border-bottom: 1px solid var(--line);
        }
        .nav-mobile button {
          background: none; border: none; color: var(--ink-dim);
          text-align: left; padding: 10px 0; font: inherit; font-size: 15px;
        }

        section { padding: clamp(48px, 8vw, 96px) clamp(20px, 6vw, 64px); max-width: 900px; margin: 0 auto; }
        #work { padding-bottom: clamp(20px, 4vw, 40px); }
        #projects { padding-top: clamp(20px, 4vw, 40px); }

        .hero {
          display: flex;
          align-items: center;
          gap: 40px;
          padding-top: clamp(56px, 9vw, 110px);
        }
        .photo-circle {
          width: 148px;
          height: 148px;
          min-width: 148px;
          border-radius: 50%;
          overflow: hidden;
          background: var(--bg-raised);
          border: 1px solid var(--line-bright);
          box-shadow: 0 0 0 4px var(--accent), 0 0 26px rgba(157, 140, 219, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .photo-circle img { width: 100%; height: 100%; object-fit: cover; }
        .photo-fallback {
          font-family: 'Unbounded', sans-serif;
          font-size: 52px;
          color: var(--accent);
        }
        .hero-info { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .hero-eyebrow { font-size: 13.5px; color: var(--accent); margin-bottom: 10px; }
        .hero h1 { font-size: clamp(32px, 4.6vw, 46px); }
        .hero-tagline { margin-top: 12px; max-width: 42ch; color: var(--ink-dim); font-size: 16px; }
        .fact-row { display: flex; gap: 0; margin-top: 20px; font-size: 13.5px; color: var(--ink-dim); flex-wrap: wrap; justify-content: center; }
        .fact-row span { padding: 0 14px; border-left: 1px solid var(--line-bright); }
        .fact-row span:first-child { padding-left: 0; border-left: none; }


        .section-head h2 { font-size: 36px; }

        .work-row { padding: 18px 0; border-top: 1px solid var(--line); text-align: left; }
        .work-row:last-child { border-bottom: 1px solid var(--line); }
        .work-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 5px; flex-wrap: wrap; }
        .role-header-with-date { display: flex; align-items: flex-end; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
        .work-name { font-size: 20px; }
        .work-dates { font-size: 13px; color: var(--ink-dim); white-space: nowrap; }
        .work-meta { font-size: 13px; color: var(--ink-dim); margin-top: 4px; }
        .work-bullets { list-style: none; margin: 10px 0 0; padding: 0; max-width: 60ch; }
        .work-bullets li {
          position: relative;
          padding-left: 20px;
          font-size: 15px;
          color: var(--ink-dim);
          margin-bottom: 6px;
          line-height: 1.5;
        }
        .work-bullets li::before {
          content: "-";
          position: absolute;
          left: 0;
          color: var(--accent);
          font-family: 'Space Mono', monospace;
        }

       .project-row {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 24px;
          padding: 24px 0;
        }
        .project-name { font-size: 19px; margin-bottom: 3px; }
        .project-full { color: var(--ink-dim); font-size: 13px; }
        .project-status { display: inline-block; margin-top: 10px; font-size: 12px; color: var(--ink-dim); font-family: 'Space Mono', monospace; }
        .project-summary { max-width: 58ch; font-size: 15px; }
        .tech-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
        .tech-tag { font-size: 12px; padding: 4px 9px; border: 1px solid var(--line-bright); border-radius: 3px; color: var(--ink-dim); }
        .project-link { display: inline-block; margin-top: 12px; font-size: 13.5px; color: var(--accent); }
        .project-link:hover { text-decoration: underline; }

        .project-card-wrap {
          transition: opacity 0.28s ease, transform 0.28s ease;
          opacity: 1;
          transform: translateX(0);
        }
        .project-card-wrap.leaving { opacity: 0; transform: translateX(-28px); }
        .project-card-wrap.entering { opacity: 0; transform: translateX(28px); }

        .project-controls { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-top: 22px; }
        .arrow-group { display: flex; gap: 10px; }
        .arrow-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          background: var(--bg-raised);
          box-shadow: 0 4px 14px rgba(157, 140, 219, 0.25), inset 0 0 0 1px var(--line-bright);
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease, color 0.15s ease, background 0.15s ease;
        }
        .arrow-btn:hover {
          color: #fff;
          background: var(--accent);
          box-shadow: 0 6px 20px rgba(157, 140, 219, 0.45);
          transform: translateY(-2px) scale(1.05);
        }
        .arrow-btn:active { transform: translateY(0) scale(0.97); }
        .library-btn {
          border: none;
          background: var(--bg-raised);
          box-shadow: 0 4px 14px rgba(157, 140, 219, 0.2), inset 0 0 0 1px var(--line-bright);
          color: var(--ink);
          border-radius: 999px;
          padding: 12px 22px;
          font: inherit;
          font-size: 14px;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, color 0.15s ease;
        }
        .library-btn:hover {
          background: var(--accent);
          color: #fff;
          box-shadow: 0 6px 20px rgba(157, 140, 219, 0.4);
          transform: translateY(-2px);
        }
        .library-btn:active { transform: translateY(0) scale(0.97); }

        .library-page { max-width: 900px; margin: 0 auto; padding: 96px clamp(20px, 6vw, 64px) 80px; }
        .home-btn {
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 30;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        border: none;
        background: var(--bg-raised);
        box-shadow: 0 4px 14px rgba(157, 140, 219, 0.2), inset 0 0 0 1px var(--line-bright);
        color: var(--ink);
        border-radius: 999px;
        padding: 11px 20px;
        font: inherit;
        font-size: 14px;
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, color 0.15s ease;
        }
        .home-btn:hover {
          background: var(--accent);
          color: #fff;
          box-shadow: 0 6px 20px rgba(157, 140, 219, 0.4);
          transform: translateY(-2px);
        }
        .home-btn:active { transform: translateY(0) scale(0.97); }
        .library-page h2 { font-size: 26px; margin-bottom: 24px; }
        .library-list { display: flex; flex-direction: column; gap: 10px; }
        .library-card {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 24px;
          padding: 22px 18px;
          border: 1px solid transparent;
          border-radius: 10px;
          cursor: pointer;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .library-card:hover { border-color: var(--accent); background: rgba(157, 140, 219, 0.06); }

        .contact-row { display: flex; flex-wrap: wrap; align-items: center; gap: 20px; margin-top: 8px; }
        .icon-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-raised);
          box-shadow: 0 4px 14px rgba(157, 140, 219, 0.2), inset 0 0 0 1px var(--line-bright);
          color: var(--ink);
          padding: 10px 14px;
          border-radius: 999px;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, color 0.15s ease;
        }
        .icon-link:hover {
          background: var(--accent);
          color: #fff;
          box-shadow: 0 6px 20px rgba(157, 140, 219, 0.4);
          transform: translateY(-2px);
        }
        .icon-link:active { transform: translateY(0) scale(0.97); }
        .email-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14.5px;
          color: var(--ink-dim);
        }
        .email-link:hover { color: var(--accent); }
        .email-icon { font-size: 16px; }
        .email-divider { color: var(--line-bright); }
        .resume-link { font-size: 14px; }

        footer {
          border-top: 1px solid var(--line);
          padding: 22px clamp(20px, 6vw, 64px);
          font-size: 12px;
          color: var(--ink-dim);
          text-align: center;
        }

        @media (max-width: 700px) {
          .nav-links { display: none; }
          .nav-toggle { display: flex; }
          .hero { flex-direction: column; align-items: flex-start; text-align: left; }
          .project-row { grid-template-columns: 1fr; }
          .library-card { grid-template-columns: 1fr; }
        }
      `}</style>

      {page === "library" ? (
        <LibraryPage
          onHome={() => {
            setPage("home");
            window.scrollTo(0, 0);
          }}
        />
      ) : (
        <>
          <nav className={`nav${scrolled ? " scrolled" : ""}`}>
            <div className="nav-links">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => goTo(n.id)}>{n.label}</button>
              ))}
            </div>
            <button
              className="theme-toggle"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            >
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
            <button className="nav-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
              ☰
            </button>
          </nav>
          {menuOpen && (
            <div className="nav-mobile">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => goTo(n.id)}>{n.label}</button>
              ))}
            </div>
          )}

          <Hero />
          <Work />
          <Projects
            current={currentProject}
            phase={cardPhase}
            onPrev={prevProject}
            onNext={nextProject}
            onOpenLibrary={() => {
              setPage("library");
              window.scrollTo(0, 0);
            }}
          />
          <Contact />

          <footer>Al Tamimi Enterprises</footer>
        </>
      )}
    </div>
  );
}