import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import {
  motion,
  MotionConfig,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValue,
  useMotionValueEvent,
  useInView,
  type MotionValue,
} from "motion/react";
import { contact, services, steps, type Lang } from "./content";
const Pet = lazy(() => import("./Pet"));
const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => (
  <span aria-hidden="true" className="arrow">
    {diagonal ? "↗" : "↗"}
  </span>
);
export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return localStorage.getItem("portfolio-lang") === "en" ? "en" : "ar";
    } catch {
      return "ar";
    }
  });
  const prefersReduced = useReducedMotion();
  const [manualStill, setManualStill] = useState(false);
  const still = Boolean(prefersReduced || manualStill);
  const [menu, setMenu] = useState(false);
  const detail = location.pathname.replace(/\/$/, "") === "/nabd";
  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.motion = still ? "reduced" : "full";
    try {
      localStorage.setItem("portfolio-lang", lang);
    } catch {}
    document.title = detail
      ? t("نبض — عبدالرحمن الفرجاني", "NABD — Abdulrahman Alferjani")
      : t(
          "عبدالرحمن الفرجاني — من التعقيد إلى الوضوح",
          "Abdulrahman Alferjani — From complexity to clarity",
        );
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        t(
          "عبدالرحمن الفرجاني — تطوير الأنظمة وتجارب رقمية تبدأ بفهم الأعمال.",
          "Abdulrahman Alferjani — business systems and digital experiences built on understanding.",
        ),
      );
  }, [lang, still, detail]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <MotionConfig reducedMotion={still ? "always" : "never"}>
      <a className="skip" href="#main">
        {t("انتقل إلى المحتوى", "Skip to content")}
      </a>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: still ? scrollYProgress : scaleX }}
      />
      <header className="header">
        <a
          className="brand"
          href="/"
          aria-label={t("عبدالرحمن — الرئيسية", "Abdulrahman — Home")}
        >
          <svg width="36" height="36" viewBox="0 0 64 64" aria-hidden="true">
            <path
              d="M10 49 31 12h7l16 37H42L33 28 22 49M15 38h36"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            />
          </svg>
          <span>
            Abdulrahman<span className="brand-sub">ALFERJANI / الفرجاني</span>
          </span>
        </a>
        <nav
          className={menu ? "nav open" : "nav"}
          aria-label={t("التنقل الرئيسي", "Main navigation")}
        >
          {[
            [t("من أنا", "About"), "about"],
            [t("طريقة تفكيري", "My process"), "process"],
            [t("أعمالي", "Work"), "work"],
          ].map(([label, id]) => (
            <a
              key={id}
              href={`${detail ? "/" : ""}#${id}`}
              onClick={() => setMenu(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="language"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            aria-label={t("Switch to English", "التبديل إلى العربية")}
          >
            {t("EN", "عربي")}
            <span>◎</span>
          </button>
          <a className="contact-nav" href={`${detail ? "/" : ""}#contact`}>
            {t("لنتحدث", "Let’s talk")} <Arrow />
          </a>
          <button
            className="menu-toggle"
            aria-expanded={menu}
            aria-label={t("القائمة", "Menu")}
            onClick={() => setMenu(!menu)}
          >
            {menu ? "×" : "☰"}
          </button>
        </div>
      </header>
      <main id="main">
        {detail ? (
          <Project lang={lang} />
        ) : (
          <>
            <Hero lang={lang} still={still} />
            <div className="ticker" aria-hidden="true">
              <div>
                <span>UNDERSTAND.</span>
                <b>✳</b>
                <span>SIMPLIFY.</span>
                <b>✳</b>
                <span>BUILD.</span>
                <b>✳</b>
                <span>MAKE IT WORK.</span>
                <b>✳</b>
              </div>
            </div>
            <About lang={lang} />
            <Process lang={lang} still={still} />
            <Work lang={lang} still={still} />
            <Services lang={lang} />
            <Contact lang={lang} still={still} />
          </>
        )}
      </main>
      <footer>
        <a className="footer-name" href="/">
          Abdulrahman Alferjani
          <span>{t("نفهم. نبسّط. نبني.", "Understand. Simplify. Build.")}</span>
        </a>
        <div className="footer-controls">
          <button
            onClick={() => setManualStill(!manualStill)}
            aria-pressed={still}
            disabled={!!prefersReduced}
          >
            {still
              ? t("الحركة مخفّضة", "Reduced motion")
              : t("تقليل الحركة", "Reduce motion")}
          </button>
          <a href="#main">{t("إلى الأعلى ↑", "Back to top ↑")}</a>
        </div>
        <small>
          © {new Date().getFullYear()} ·{" "}
          {t("صُنع بعناية", "Made with intention")}
        </small>
      </footer>
    </MotionConfig>
  );
}
function Hero({ lang, still }: { lang: Lang; still: boolean }) {
  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const sy = useTransform(scrollYProgress, [0, 1], [0, 35]);
  const ry = useTransform(scrollYProgress, [0, 1], [0, -75]);
  const mx = useMotionValue(0),
    my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 65, damping: 25 }),
    y = useSpring(my, { stiffness: 65, damping: 25 });
  return (
    <section className="hero wrap" ref={ref}>
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="status-dot" />
          {t(
            "مطور. أفهم الأعمال وأبني لها.",
            "DEVELOPER. THINKER. PROBLEM SOLVER.",
          )}
        </div>
        <p className="hello">
          {t("أهلًا، أنا عبدالرحمن", "Hey, I’m Abdulrahman")}
        </p>
        <h1>
          {t("أفهم التعقيد.", "I get complexity.")}
          <br />
          <span className="accent">
            {t("وأبني الوضوح.", "I build clarity.")}
            <svg
              viewBox="0 0 500 24"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M4 17Q240 -3 494 13M60 22Q265 6 435 19" />
            </svg>
          </span>
        </h1>
        <p className="hero-intro">
          {t(
            "أجمع بين التقنية وفهم الأعمال، لأحوّل الإجراءات المعقّدة إلى أنظمة وتجارب تعمل ببساطة.",
            "Bringing technology and business thinking together. Turning tangled workflows into systems that just make sense.",
          )}
        </p>
        <div className="hero-ctas">
          <a href="#work" className="button primary">
            {t("استكشف أعمالي", "Explore my work")}
            <Arrow />
          </a>
          <a href="#about" className="text-button">
            {t("القصة وراء الكود", "The person behind the code")}
            <span>↓</span>
          </a>
        </div>
        <div className="hero-meta">
          <span>01 / INTRODUCTION</span>
          <span>{t("مرّر لتكتشف", "SCROLL TO EXPLORE")} ↓</span>
        </div>
      </div>
      <div
        className="hero-scene"
        onPointerMove={(e) => {
          if (still || e.pointerType === "touch") return;
          let r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left - r.width / 2) * 0.035);
          my.set((e.clientY - r.top - r.height / 2) * 0.025);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
      >
        <div className="scene-grid" />
        <motion.div className="orbital" style={{ y: still ? 0 : ry }}>
          <svg viewBox="0 0 600 600" aria-hidden="true">
            <ellipse
              cx="300"
              cy="300"
              rx="280"
              ry="172"
              transform="rotate(-34 300 300)"
            />
            <ellipse
              cx="300"
              cy="300"
              rx="250"
              ry="250"
              strokeDasharray="2 12"
            />
            <path d="M45 300H555M300 45V555" strokeDasharray="3 14" />
          </svg>
        </motion.div>
        <div className="scene-word" aria-hidden="true">
          A<span>F.</span>
        </div>
        <motion.div
          className="person-plane"
          style={{ x: still ? 0 : x, y: still ? 0 : y }}
        >
          <div className="cube">
            <div className="cube-top" />
            <div className="cube-front">
              <span>
                IDEAS
                <br />
                INTO
                <br />
                REALITY.
              </span>
              <b>↗</b>
            </div>
            <div className="cube-side" />
          </div>
          <motion.img
            className="portrait"
            src="/assets/portrait.webp"
            width="1024"
            height="1536"
            alt={t(
              "عبدالرحمن الفرجاني جالسًا داخل مشهد تفاعلي",
              "Abdulrahman Alferjani seated in an interactive scene",
            )}
            fetchPriority="high"
            style={{ x: "-50%", y: still ? 0 : sy }}
          />
        </motion.div>
        <motion.div
          className="scene-label label-code"
          style={{ y: still ? 0 : ry }}
        >
          <span className="label-icon">{"{ }"}</span>
          <span>
            {t("الفكرة بداية", "IT STARTS WITH AN IDEA")}
            <strong>
              {t("والتفاصيل تصنع الفرق.", "Details make the difference.")}
            </strong>
          </span>
        </motion.div>
        <div className="scene-label label-note">
          <span className="status-dot" />
          <span>{t("إنسان خلف كل سطر كود", "A HUMAN BEHIND THE CODE")}</span>
        </div>
        <span className="scene-coordinate">AF — PERSONAL SPACE / 001</span>
        <div className="spark" aria-hidden="true">
          ✳
        </div>
      </div>
    </section>
  );
}
function About({ lang }: { lang: Lang }) {
  const t = (a: string, e: string) => (lang === "ar" ? a : e);
  return (
    <section id="about" className="about wrap section">
      <div className="section-label">
        <span>01 — {t("من أنا", "A LITTLE ABOUT ME")}</span>
        <span>↙</span>
      </div>
      <div className="about-body">
        <h2>
          {t("النظام الناجح يبدأ", "Good systems start")}
          <br />
          {t("بسؤال.", "with a question.")}{" "}
          <span className="muted">
            {t("ثم يأتي الكود.", "Then comes code.")}
          </span>
        </h2>
        <div className="about-bottom">
          <div className="signature">
            Abdulrahman
            <span>
              {t(
                "عقل فضولي، وحلول عملية.",
                "A curious mind. A practical approach.",
              )}
            </span>
          </div>
          <p>
            {t(
              "أنا عبدالرحمن الفرجاني. أهتم بما يحدث خلف الواجهة: كيف يعمل الفريق، وكيف تنتقل المعلومة، وأين يمكن أن تصبح الأمور أسهل. أجمع بين التطوير وفهم الإدارة والأعمال لبناء حلول تناسب من يستخدمها.",
              "I’m Abdulrahman Alferjani. I care about what happens behind an interface: how a team works, how information moves, and where things could be simpler. I connect development with business understanding to build for the people using it.",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
const scatter = [
  [-25, -30, -18],
  [22, -25, 12],
  [-15, 10, 22],
  [25, 15, -12],
  [-20, 30, 8],
  [20, 25, -22],
];
function FlowNode({
  i,
  progress,
  still,
  lang,
}: {
  i: number;
  progress: MotionValue<number>;
  still: boolean;
  lang: Lang;
}) {
  const x = useTransform(progress, [0, 0.74], [scatter[i][0], 0]),
    y = useTransform(progress, [0, 0.74], [scatter[i][1], 0]),
    rotate = useTransform(progress, [0, 0.74], [scatter[i][2], 0]);
  const labels =
    lang === "ar"
      ? ["الاحتياج", "المستخدم", "الإجراءات", "البيانات", "الواجهة", "الحل"]
      : ["NEED", "PEOPLE", "WORKFLOW", "DATA", "INTERFACE", "SOLUTION"];
  return (
    <motion.div
      className={`flow-node node-${i}`}
      style={{ x: still ? 0 : x, y: still ? 0 : y, rotate: still ? 0 : rotate }}
    >
      <span>0{i + 1}</span>
      <strong>{labels[i]}</strong>
      <i>{i === 5 ? "↗" : "+"}</i>
    </motion.div>
  );
}
function Process({ lang, still }: { lang: Lang; still: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 85, damping: 28 });
  const [step, setStep] = useState(0);
  useMotionValueEvent(p, "change", (v) =>
    setStep(Math.min(4, Math.floor(v * 5))),
  );
  const t = (a: string, e: string) => (lang === "ar" ? a : e);
  const lineOpacity = useTransform(p, [0, 0.25, 0.7], [0.05, 0.15, 0.85]);
  return (
    <section id="process" ref={ref} className="process">
      <div className="process-pin wrap">
        <div className="section-label">
          <span>02 — {t("طريقة تفكيري", "HOW I THINK")}</span>
          <span>
            {t("من التعقيد إلى الوضوح", "FROM COMPLEXITY TO CLARITY")}
          </span>
        </div>
        <div className="process-layout">
          <div className="process-copy">
            <h2>
              {t("كل شيء يبدأ", "A little chaos.")}
              <br />
              <span className="accent">
                {t("بفكّ التشابك.", "A clear way forward.")}
              </span>
            </h2>
            <p className="process-intro">
              {t(
                "مرّر لترى كيف تتحوّل الأجزاء المتفرقة إلى نظام مفهوم.",
                "Scroll to see scattered pieces become a system that makes sense.",
              )}
            </p>
            <div className="step-list">
              {steps.map((s, i) => (
                <div
                  className={`step ${still || i === step ? "active" : ""}`}
                  key={s[1]}
                >
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{s[lang === "ar" ? 0 : 1]}</h3>
                    <p>{s[lang === "ar" ? 2 : 3]}</p>
                  </div>
                  <span className="step-mark">{i === step ? "↗" : "·"}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flow-scene">
            <div className="flow-heading">
              <span className="status-dot" />
              {t("مساحة التفكير", "THE THINKING SPACE")}
              <span>{String(step + 1).padStart(2, "0")} / 05</span>
            </div>
            <div className="flow-grid">
              <motion.svg
                viewBox="0 0 600 470"
                preserveAspectRatio="none"
                style={{ opacity: still ? 0.8 : lineOpacity }}
                aria-hidden="true"
              >
                <path d="M160 90H440V235H160V380H440M300 90V380" />
                <circle cx="300" cy="235" r="10" />
              </motion.svg>
              {scatter.map((_, i) => (
                <FlowNode
                  key={i}
                  i={i}
                  progress={p}
                  still={still}
                  lang={lang}
                />
              ))}
            </div>
            <div className="flow-footer">
              <span>
                {step < 3
                  ? t(
                      "أجزاء كثيرة. احتمال واحد أفضل.",
                      "MANY PARTS. ONE BETTER POSSIBILITY.",
                    )
                  : t(
                      "الأجزاء نفسها. رؤية أوضح.",
                      "SAME PIECES. A CLEARER PICTURE.",
                    )}
              </span>
              <motion.div
                className="flow-meter"
                style={{ scaleX: still ? 1 : p }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function NabdVisual({ lang, large = false }: { lang: Lang; large?: boolean }) {
  const ar = lang === "ar";
  return (
    <div className={`nabd-visual ${large ? "large" : ""}`}>
      <div className="nabd-watermark">نبض</div>
      <div className="nabd-orbit" />
      <div className="nabd-diagram">
        <div className="diagram-head">
          <span className="nabd-logo">
            نبض<i>●</i>
          </span>
          <span>NABD / SYSTEM OVERVIEW</span>
          <span>↗</span>
        </div>
        <div className="diagram-content">
          <div className="diagram-sidebar">
            <b>▦</b>
            <span>☰</span>
            <span>▤</span>
            <span>◎</span>
          </div>
          <div className="diagram-main">
            <p>
              {ar
                ? "رؤية أوضح. إجراءات مترابطة."
                : "A clearer view. A connected workflow."}
            </p>
            <div className="diagram-path">
              <div>
                <small>01</small>
                <strong>{ar ? "الإدارة" : "Management"}</strong>
                <i>↗</i>
              </div>
              <b>→</b>
              <div>
                <small>02</small>
                <strong>{ar ? "الإصدار" : "Issuance"}</strong>
                <i>↗</i>
              </div>
              <b>→</b>
              <div>
                <small>03</small>
                <strong>{ar ? "العمليات" : "Operations"}</strong>
                <i>↗</i>
              </div>
            </div>
            <div className="diagram-lines">
              <div />
              <div />
              <div />
            </div>
            <div className="diagram-foot">
              <span className="status-dot" />
              {ar
                ? "الأشخاص + الإجراءات + المعلومات"
                : "PEOPLE + PROCESS + INFORMATION"}
            </div>
          </div>
        </div>
      </div>
      <span className="concept-label">
        {ar
          ? "تصوّر توضيحي • ليس لقطة من النظام"
          : "ILLUSTRATIVE CONCEPT • NOT A PRODUCT SCREENSHOT"}
      </span>
      <span className="visual-number">N° 01</span>
    </div>
  );
}
function Work({ lang, still }: { lang: Lang; still: boolean }) {
  const t = (a: string, e: string) => (lang === "ar" ? a : e);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 1]);
  return (
    <section className="work wrap section" id="work">
      <div className="section-label">
        <span>03 — {t("عمل أعتز به", "SELECTED WORK")}</span>
        <span>2026 / COLLECTION 01</span>
      </div>
      <div className="section-heading">
        <h2>
          {t("أفكار أخذت", "Ideas, made")}
          <br />
          <span className="accent">{t("شكلًا حقيقيًا.", "real.")}</span>
        </h2>
        <p>
          {t(
            "مشروع واحد الآن. ومساحة لما يأتي بعده.",
            "One project for now. Room for what comes next.",
          )}
        </p>
      </div>
      <motion.div ref={ref} style={{ rotate: still ? 0 : rotate }}>
        <a
          href="/nabd/"
          className="project-link"
          aria-label={t("استكشف مشروع نبض", "Explore the NABD project")}
        >
          <NabdVisual lang={lang} />
          <span className="project-open">
            <Arrow />
          </span>
        </a>
      </motion.div>
      <div className="project-caption">
        <div>
          <span className="eyebrow">BUSINESS SYSTEM / 01</span>
          <h3>
            {t("نبض", "NABD")}
            <span>
              {" "}
              — {t("تنظيم العمل. وتوضيح الصورة.", "Bringing work into focus.")}
            </span>
          </h3>
        </div>
        <a href="/nabd/" className="text-button">
          {t("قصة المشروع", "Explore the project")}
          <Arrow />
        </a>
      </div>
      <p className="project-description">
        {t(
          "نظام لإدارة أعمال شركات التأمين وتنظيم الإجراءات الداخلية، يشمل الإدارة والإصدار والعمليات ذات الصلة.",
          "A system for managing insurance-company operations and internal workflows, spanning management, issuance and related operations.",
        )}
      </p>
    </section>
  );
}
function Services({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(0);
  const t = (a: string, e: string) => (lang === "ar" ? a : e);
  return (
    <section className="services wrap section" id="capabilities">
      <div className="section-label">
        <span>04 — {t("ما أستطيع بناءه", "WHAT I CAN BUILD")}</span>
        <span>↙</span>
      </div>
      <div className="services-layout">
        <h2>
          {t("من «ماذا لو؟»", "From “what if?”")}
          <br />
          <span className="muted">
            {t("إلى «هذا يعمل».", "to “it works.”")}
          </span>
        </h2>
        <div className="service-list">
          {services.map((s, i) => (
            <div
              className={`service ${i === open ? "expanded" : ""}`}
              key={s[1]}
            >
              <button
                aria-expanded={i === open}
                aria-controls={`service-${i}`}
                onClick={() => setOpen(i === open ? -1 : i)}
              >
                <small>0{i + 1}</small>
                <span>{s[lang === "ar" ? 0 : 1]}</span>
                <b>{i === open ? "−" : "+"}</b>
              </button>
              <div id={`service-${i}`} hidden={i !== open}>
                <p>{s[lang === "ar" ? 2 : 3]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Contact({ lang, still }: { lang: Lang; still: boolean }) {
  const t = (a: string, e: string) => (lang === "ar" ? a : e);
  const [form, setForm] = useState(false),
    [status, setStatus] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: "200px" });
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = `${t("طلب مشروع", "Project brief")}\n\n${d.get("name")}\n${d.get("email")}\n${d.get("type")}\n\n${d.get("message")}`;
    if (contact.email) {
      location.href = `mailto:${contact.email}?subject=${encodeURIComponent("Project inquiry")}&body=${encodeURIComponent(body)}`;
      setStatus(
        t(
          "تم فتح تطبيق البريد لإكمال الإرسال.",
          "Your email app was opened to finish sending.",
        ),
      );
    } else {
      const u = URL.createObjectURL(
        new Blob([body], { type: "text/plain;charset=utf-8" }),
      );
      const a = document.createElement("a");
      a.href = u;
      a.download = "project-brief.txt";
      a.click();
      setTimeout(() => URL.revokeObjectURL(u), 1000);
      setStatus(
        t(
          "تم تنزيل ملخص طلبك. لم يُرسل إلى أي جهة.",
          "Your brief was downloaded. Nothing was sent.",
        ),
      );
    }
  }
  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="wrap">
        <div className="section-label">
          <span>
            05 — {t("لنصنع شيئًا مفيدًا", "LET’S MAKE SOMETHING USEFUL")}
          </span>
          <span>↗</span>
        </div>
        <div className="contact-main">
          <div>
            <p className="eyebrow">
              {t(
                "لديك فكرة؟ أو إجراء يستحق أن يصبح أسهل؟",
                "AN IDEA? A WORKFLOW THAT COULD BE BETTER?",
              )}
            </p>
            <h2>
              {t("خلّينا نخليها", "Let’s make")}
              <br />
              <span>
                {t("تشتغل.", "it work.")}
                <i aria-hidden="true">✳</i>
              </span>
            </h2>
            <button
              className="button dark"
              onClick={() => setForm(!form)}
              aria-expanded={form}
              aria-controls="brief-form"
            >
              {t("لنبدأ من فكرتك", "Start with your idea")}
              <Arrow />
            </button>
            <div className="contact-channels">
              {contact.email ? (
                <a href={`mailto:${contact.email}`}>Email ↗</a>
              ) : (
                <span>{t("البريد — يُضاف قريبًا", "Email — coming soon")}</span>
              )}
              {contact.whatsapp ? (
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp ↗
                </a>
              ) : (
                <span>
                  {t("واتساب — يُضاف قريبًا", "WhatsApp — coming soon")}
                </span>
              )}
            </div>
          </div>
          <div className="contact-aside">
            <span className="hand-note">
              {t(
                "الأفكار الجيدة تبدأ بمحادثة.",
                "Good ideas start with a conversation.",
              )}
            </span>
            {visible && (
              <Suspense fallback={<div className="pet-loading">…</div>}>
                <Pet lang={lang} still={still} />
              </Suspense>
            )}
          </div>
        </div>
        <div id="brief-form" hidden={!form}>
          <form onSubmit={submit} className="brief-form">
            <h3>
              {t("احكِ لي ما الذي تفكر فيه", "Tell me what you have in mind")}
            </h3>
            <p className="form-note">
              {contact.email
                ? t(
                    "سيفتح تطبيق البريد لديك لإرسال الطلب.",
                    "Your email app will open to send the brief.",
                  )
                : t(
                    "وسائل التواصل لم تُضف بعد. يمكنك تجهيز طلبك وتنزيله كملف نصي؛ لا تُرسل البيانات ولا تُخزّن على خادم.",
                    "Contact details are not connected yet. Prepare and download your brief as a text file; no data is sent or stored on a server.",
                  )}
            </p>
            <div className="form-grid">
              <label>
                {t("اسمك", "Your name")}
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                />
              </label>
              <label>
                {t("بريدك الإلكتروني", "Email address")}
                <input
                  type="email"
                  name="email"
                  dir="ltr"
                  autoComplete="email"
                  required
                  maxLength={200}
                />
              </label>
            </div>
            <label>
              {t("نوع المشروع", "Project type")}
              <select name="type">
                {services.map((s) => (
                  <option key={s[1]}>{s[lang === "ar" ? 0 : 1]}</option>
                ))}
                <option>{t("لنحدّد ذلك معًا", "Let’s figure it out")}</option>
              </select>
            </label>
            <label>
              {t("الفكرة أو المشكلة", "The idea or problem")}
              <textarea name="message" required rows={4} maxLength={5000} />
            </label>
            <button type="submit" className="button dark">
              {contact.email
                ? t("إكمال الطلب بالبريد", "Continue in email")
                : t("تنزيل ملخص الطلب ↓", "Download project brief ↓")}
            </button>
            <p role="status">{status}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
function Project({ lang }: { lang: Lang }) {
  const t = (a: string, e: string) => (lang === "ar" ? a : e);
  return (
    <article className="case-page">
      <section className="case-intro wrap">
        <a className="text-button" href="/#work">
          {t("→ العودة إلى الأعمال", "← Back to work")}
        </a>
        <div className="case-top">
          <div>
            <p className="eyebrow">SELECTED WORK / 01 — BUSINESS SYSTEM</p>
            <h1>
              {t("نبض", "NABD")}
              <span className="accent">.</span>
            </h1>
          </div>
          <p>
            {t(
              "إجراءات مترابطة.\nوصورة أوضح للعمل.",
              "Connected workflows.\nA clearer view of work.",
            )}
          </p>
        </div>
        <div className="case-facts">
          <span>
            {t("المجال", "FIELD")}
            <strong>
              {t("إدارة أعمال شركات التأمين", "Insurance business management")}
            </strong>
          </span>
          <span>
            {t("النطاق المعروف", "KNOWN SCOPE")}
            <strong>
              {t(
                "الإدارة · الإصدار · العمليات",
                "Management · Issuance · Operations",
              )}
            </strong>
          </span>
          <span>
            {t("حالة العرض", "PRESENTATION STATUS")}
            <strong>
              {t(
                "عرض تعريفي — الواجهات الفعلية لاحقًا",
                "Overview — actual screens to follow",
              )}
            </strong>
          </span>
        </div>
      </section>
      <div className="wrap">
        <NabdVisual lang={lang} large />
      </div>
      <section className="case-story wrap section">
        <div className="section-label">
          01 — {t("فكرة المشروع", "THE PROJECT")}
        </div>
        <div>
          <h2>
            {t("تنظيم ما يحدث", "Organizing what happens")}
            <br />
            <span className="accent">
              {t("خلف كل إجراء.", "behind every process.")}
            </span>
          </h2>
          <p>
            {t(
              "نبض نظام لإدارة أعمال شركات التأمين وتنظيم الإجراءات الداخلية. يضم جوانب الإدارة والإصدار والعمليات المرتبطة بها، مع تقديم العمل ضمن تجربة مترابطة.",
              "NABD is a system for managing insurance-company work and organizing internal procedures. Its scope covers management, issuance and related operations within a connected experience.",
            )}
          </p>
          <p>
            {t(
              "هذا العرض يقدّم الفكرة والنطاق المعروفين فقط. ستُضاف تفاصيل سير العمل وقرارات التصميم والتقنيات والنتائج بعد توثيقها، إلى جانب لقطات النظام الفعلية.",
              "This presentation covers the confirmed idea and scope. Documented workflows, design decisions, technologies and outcomes will be added alongside actual product screenshots.",
            )}
          </p>
        </div>
      </section>
      <section className="case-scope wrap">
        <div className="section-label">02 — {t("نطاق العمل", "THE SCOPE")}</div>
        <div className="scope-items">
          {[
            [
              t("الإدارة", "Management"),
              t(
                "تنظيم أعمال الشركة وإجراءاتها الداخلية.",
                "Organizing company work and internal procedures.",
              ),
            ],
            [
              t("الإصدار", "Issuance"),
              t(
                "جانب الإصدار ضمن منظومة العمل.",
                "The issuance side of the business workflow.",
              ),
            ],
            [
              t("العمليات", "Operations"),
              t(
                "العمليات ذات الصلة والإجراءات المرتبطة بها.",
                "Related operations and their connected procedures.",
              ),
            ],
          ].map(([h, p], i) => (
            <div key={h}>
              <span>0{i + 1}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="case-note wrap section">
        <span>↗</span>
        <div>
          <h2>{t("مساحة للتفاصيل الحقيقية.", "Room for the real details.")}</h2>
          <p>
            {t(
              "المخطط المعروض تصور توضيحي للفكرة، وليس واجهة فعلية أو بيانات تشغيلية. حالة الإطلاق، والتقنيات المستخدمة، والنتائج لم تُوثّق في هذه النسخة.",
              "The visual is an illustrative concept, not an actual interface or operational data. Release status, technology choices and outcomes are not yet documented in this edition.",
            )}
          </p>
        </div>
      </section>
      <div className="case-bottom wrap">
        <a className="button primary" href="/#contact">
          {t("لديك تحدٍّ مشابه؟ لنتحدث", "A similar challenge? Let’s talk")}
          <Arrow />
        </a>
        <a className="text-button" href="/#work">
          {t("العودة إلى الأعمال", "Back to selected work")}
          <Arrow />
        </a>
      </div>
    </article>
  );
}
