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
  const path = location.pathname.replace(/\/$/, "");
  const casePage =
    path === "/nabd" ? "nabd" : path === "/luna" ? "luna" : path === "/cafe-pos" ? "cafe" : null;
  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.motion = still ? "reduced" : "full";
    try {
      localStorage.setItem("portfolio-lang", lang);
    } catch {}
    document.title =
      casePage === "nabd"
        ? t("نبض — عبدالرحمن الفرجاني", "NABD — Abdulrahman Alferjani")
        : casePage === "luna"
          ? t("لونا ستور — عبدالرحمن الفرجاني", "Luna Store — Abdulrahman Alferjani")
          : casePage === "cafe"
            ? t("نظام إدارة الكافيه — عبدالرحمن الفرجاني", "Cafe Management System — Abdulrahman Alferjani")
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
  }, [lang, still, casePage]);
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
              href={`${casePage ? "/" : ""}#${id}`}
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
          <a className="contact-nav" href={`${casePage ? "/" : ""}#contact`}>
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
        {casePage ? (
          <ProjectDetail path={casePage} lang={lang} />
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
function NabdVisual({ lang }: { lang: Lang }) {
  return <div className="nabd-cover">
    <div className="nabd-cover-heading"><span>نبض</span><p>{lang === "ar" ? "منظومتان. دورة عمل واحدة." : "Two systems. One workflow."}</p><small>ISSUANCE / ADMINISTRATION</small></div>
    <img src="/assets/nabd-admin.webp" width="1280" height="720" loading="lazy" alt={lang === "ar" ? "لوحة إدارة نبض ببيانات تجريبية" : "NABD administration dashboard with demo data"} />
    <span className="nabd-demo-label">{lang === "ar" ? "واجهة أصلية · بيانات تجريبية" : "ORIGINAL INTERFACE · DEMO DATA"}</span>
  </div>;
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
            "ثلاثة مشاريع. ومساحة لما يأتي بعده.",
            "Three projects for now. Room for what comes next.",
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
          "منظومتان متصلتان لأعمال التأمين: إصدار الوثائق لدى الوكلاء، وإدارة الإنتاج والماليات والإجراءات داخل الشركة.",
          "Two connected insurance systems: policy issuance for agents, and production, finance and internal workflow management for the company.",
        )}
      </p>
      <div className="project-separator" aria-hidden="true">
        <span>02</span>
      </div>
      <motion.div ref={ref} style={{ rotate: still ? 0 : rotate }}>
        <a
          href="/luna/"
          className="project-link"
          aria-label={t("استكشف مشروع لونا ستور", "Explore the Luna Store project")}
        >
          <LunaVisual lang={lang} />
          <span className="project-open">
            <Arrow />
          </span>
        </a>
      </motion.div>
      <div className="project-caption">
        <div>
          <span className="eyebrow">E-COMMERCE + PAYMENTS / 02</span>
          <h3>
            {t("لونا ستور", "Luna Store")}
            <span>
              {" "}
              — {t("متجر. ونظام دفع يشبه البساطة.", "A store, and a payment flow that feels simple.")}
            </span>
          </h3>
        </div>
        <a href="/luna/" className="text-button">
          {t("قصة المشروع", "Explore the project")}
          <Arrow />
        </a>
      </div>
      <p className="project-description">
        {t(
          "متجر إلكتروني عربي لبيع المنتجات، مع سلة ودفع إلكتروني عبر بوابة MyPay.ly: إنشاء جلسة دفع، تحقق من التوقيع، وويب هوك يؤكد الدفع حتى لو لم يعد العميل.",
          "An Arabic e-commerce store with a cart and electronic payment through the MyPay.ly gateway: payment sessions, signature verification, and a webhook that confirms payment even if the customer never returns.",
        )}
      </p>
      <div className="project-separator" aria-hidden="true">
        <span>03</span>
      </div>
      <motion.div ref={ref} style={{ rotate: still ? 0 : rotate }}>
        <a
          href="/cafe-pos/"
          className="project-link"
          aria-label={t("استكشف مشروع نظام إدارة الكافيه", "Explore the cafe management project")}
        >
          <CafeVisual lang={lang} />
          <span className="project-open">
            <Arrow />
          </span>
        </a>
      </motion.div>
      <div className="project-caption">
        <div>
          <span className="eyebrow">POS + OPERATIONS / 03</span>
          <h3>
            {t("نظام إدارة الكافيه", "Cafe Management System")}
            <span>
              {" "}
              — {t("نقطة بيع. ومتابعة كاملة.", "Point of sale, and full oversight.")}
            </span>
          </h3>
        </div>
        <a href="/cafe-pos/" className="text-button">
          {t("قصة المشروع", "Explore the project")}
          <Arrow />
        </a>
      </div>
      <p className="project-description">
        {t(
          "نظام نقاط بيع عربي لإدارة المقاهي: المبيعات والنوبات والديون والمصروفات والتقارير، مع تطبيق موبايل وترخيص يمكن تفعيله عن بُعد.",
          "An Arabic point-of-sale system for cafes: sales, shifts, debts, expenses and reports, with a mobile app and remotely activated licensing.",
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
                <a href={`mailto:${contact.email}`}><bdi>{contact.email}</bdi> ↗</a>
              ) : (
                <span>{t("البريد — يُضاف قريبًا", "Email — coming soon")}</span>
              )}
              {contact.whatsapp ? (
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("واتساب", "WhatsApp")} · <bdi>0927592771</bdi> ↗
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
function ProjectDetail({ path, lang }: { path: "nabd" | "luna" | "cafe"; lang: Lang }) {
  if (path === "luna") return <LunaCase lang={lang} />;
  if (path === "cafe") return <CafeCase lang={lang} />;
  return <Project lang={lang} />;
}
function LunaVisual({ lang }: { lang: Lang }) {
  return <div className="nabd-cover">
    <div className="nabd-cover-heading"><span>لونا ستور 🌙</span><p>{lang === "ar" ? "متجر. ودفع إلكتروني واضح." : "A store, and clear online payment."}</p><small>SHOP · CART · MYPAY.LY</small></div>
    <img src="/assets/luna-cover.webp" width="1280" height="860" loading="lazy" alt={lang === "ar" ? "الصفحة الرئيسية لونا ستور كما تظهر عند فتح الموقع ببيانات تجريبية" : "Luna Store home page as it appears when opening the site with demo data"} />
    <span className="nabd-demo-label">{lang === "ar" ? "واجهة أصلية · بيانات تجريبية" : "ORIGINAL INTERFACE · DEMO DATA"}</span>
  </div>;
}
function LunaCase({ lang }: { lang: Lang }) {
  const t = (a: string, e: string) => (lang === "ar" ? a : e);
  const paySteps = [
    [t("السلة أولًا", "Cart first"), t("العميل يتصفح ويضيف للسلة دون تسجيل حساب. السلة محفوظة بمعرّف جلسة في قاعدة البيانات، فتبقى بعد تحديث الصفحة.", "Browsing and adding to the cart needs no account. The cart is stored against a database session id, so it survives a page refresh.")],
    [t("بيانات الطلب", "Order details"), t("الاسم والهاتف والعنوان فقط. يُنشأ الطلب برقم فريد ‎LUNA-YYYYMMDD-####‎ قبل الدفع، وتحفظ تفاصيل المنتجات كسطور فاتورة.", "Just name, phone and address. The order gets a unique number before payment, and the product lines are stored as invoice rows.")],
    [t("جلسة الدفع", "Payment session"), t("يُجهّز المتجر جلسة دفع بقيمة الطلب بالدينار الليبي، ثم ينقل العميل إلى صفحة MyPay.ly لإكمال الدفع.", "The store creates a payment session for the order total in Libyan dinars, then takes the customer to MyPay.ly to complete payment.")],
    [t("الدفع لدى البوابة", "At the gateway"), t("صفحة الدفع مُضافة من البوابة وتجمع: البطاقات البنكية، إدفعلي، يسر باي، صحاري باي، ومصرفي باي. لا تُخزَّن أي بيانات بطاقة في المتجر.", "The hosted page collects bank cards, Edfali, Yasser Pay, Sahari Pay and Masrvi Pay. No card data is ever stored by the store.")],
    [t("العودة والتحقق", "Return & verify"), t("بعد الدفع يعود العميل إلى صفحة الطلب. لا يُعتمد الحالة من الرابط وحده: يُقارن الرمز العائد برمز الجلسة المحفوظ، فإن لم يطابق يُعلّم الدفع كفاشل.", "The customer returns to the order page. The redirect alone is not trusted: the returned token is compared with the saved session token, and a mismatch marks the payment failed.")],
    [t("ويب هوك كخط أمان", "Webhook safety net"), t("حتى لو لم يُكمل العميل العودة، تستقبل الخدمة إشعارًا من البوابة بتوقيع HMAC-SHA256 يُتحقق منه قبل تحديث حالة الطلب إلى «مدفوع».", "Even if the customer never returns, the server receives a webhook signed with HMAC-SHA256, verified before the order flips to paid.")],
  ];
  const ease = [
    [t("بلا حساب", "No account needed"), t("لا تسجيل ولا كلمة مرور للعميل: تصفح، سلة، ثلاثة حقول، دفع. كل ما يحتاجه المشتري للوصول إلى الفاتورة هو رقم الطلب.", "No sign-up, no password: browse, cart, three fields, pay. The order number is all a customer needs to reach their invoice.")],
    [t("واجهة عربية أولاً", "Arabic-first interface"), t("تصميم كامل من اليمين لليسار بخط Cairo، نبرة موجّهة للمرأة، ألوان هادئة، وتنبيهات لحظية بالعربية لكل خطوة (أضيفت إلى السلة، نفدت الكمية…).", "A full RTL layout in the Cairo font, a warm feminine voice, soft colors, and instant Arabic toasts for every step (added to cart, out of stock…).")],
    [t("حالة واضحة في كل خطوة", "A clear state at every step"), t("فاتورة واحدة بثلاث حالات: مؤكّد، معلّق، أو فشل — بلون ورسالة وأزرار مختلفة. صفحة الفشل تحفظ الطلب وتعرض مؤقتًا لتجربة الدفع مرة أخرى.", "One invoice page with three states — confirmed, pending or failed — each with its own color, message and actions. The failure page keeps the order and offers a retry.")],
    [t("لوحة تحكم بسيطة", "A simple admin panel"), t("إدارة المنتجات بالصورة أو الإيموجي، إدارة الطلبات بحالات متحركة، وإحصاءات ولوحة تنبيه للمخزون المنخفض في شاشة واحدة.", "Products managed by image or emoji, orders moved through statuses, and a dashboard with stats plus a low-stock alert on one screen.")],
  ];
  return <article className="case-page">
    <section className="case-intro wrap">
      <a className="text-button" href="/#work">{t("→ العودة إلى الأعمال", "← Back to work")}</a>
      <div className="case-top"><div><p className="eyebrow">SELECTED WORK / 02 — E-COMMERCE & PAYMENTS</p><h1>{t("لونا ستور", "Luna Store")}<span className="accent">.</span></h1></div><p>{t("متجر صغير.\nودفع سهل.", "A small store.\nEasy payment.")}</p></div>
      <div className="case-facts"><span>{t("المجال", "FIELD")}<strong>{t("متجر إلكتروني ومدفوعات", "E-commerce & payments")}</strong></span><span>{t("التقنيات", "STACK")}<strong>{t("Flask · PostgreSQL · MyPay.ly", "Flask · PostgreSQL · MyPay.ly")}</strong></span><span>{t("الفكرة", "THE IDEA")}<strong>{t("من المنتج إلى الفاتورة دون تعقيد", "From product to invoice without friction")}</strong></span></div>
    </section>
    <section className="case-story wrap section">
      <div className="section-label">01 — {t("المشكلة والحل", "THE PROBLEM & SOLUTION")}</div>
      <div><h2>{t("من اختيار المنتج", "From choosing a product")}<br/><span className="accent">{t("إلى طلب واضح.", "to a clear order.")}</span></h2>
      <p>{t("لونا ستور يجمع تصفح المنتجات والسلة وإتمام الطلب في مسار عربي واضح. ينتقل العميل من اختيار المنتج إلى إدخال بياناته ثم الدفع عبر MyPay.ly، مع عرض حالة الطلب والفاتورة ومتابعته من لوحة الإدارة.", "Luna Store connects browsing, cart and checkout in a clear Arabic shopping journey. Customers choose products, enter their details and continue to MyPay.ly, with visible order and invoice states and an administration dashboard for follow-up.")}</p></div>
    </section>
    <section className="nabd-systems wrap">
      <div className="section-label">02 — {t("لقطات من الواجهة", "SCREENSHOTS")}</div>
      <figure className="system-showcase">
        <figcaption>
          <span className="eyebrow">01 / STOREFRONT</span>
          <h2>{t("المتجر: تصنيفات وبحث وشبكة منتجات", "The store: categories, search, product grid")}</h2>
          <p>{t("الواجهة تفتح على متجر جاهز للتصفح: شريط تصنيفات، بحث فوري، وشبكة منتجات بصور وشارات مخزون. لا حساب ولا تسجيل لبدء التصفح — السلة تُحفظ بمعرّف جلسة تلقائي.", "The interface opens on a store ready to browse: a category bar, instant search, and a product grid with images and stock badges. No account or sign-up to start — the cart is saved against an automatic session id.")}</p>
        </figcaption>
        <a href="/assets/luna-shop-v.webp" target="_blank" rel="noreferrer" aria-label={t("فتح لقطة الواجهة بحجمها الكامل", "Open full-size interface screenshot")}>
          <img src="/assets/luna-shop-v.webp" width="1280" height="860" loading="lazy" alt={t("صفحة المتجر: تصنيفات وبحث وشبكة منتجات ببيانات تجريبية", "Shop page: categories, search and a product grid with demo data")} />
          <span>{t("تكبير الواجهة ↗", "View full size ↗")}</span>
        </a>
      </figure>
      <figure className="system-showcase">
        <figcaption>
          <span className="eyebrow">02 / CHECKOUT</span>
          <h2>{t("طرق الدفع الخمس في مكان واحد", "The five payment methods in one place")}</h2>
          <p>{t("إتمام الشراء ثلاثة حقول فقط: الاسم والهاتف والعنوان. تحتها تُعرض طرق الدفع التي تتيحها بوابة MyPay.ly محليًا — البطاقات البنكية، إدفعلي، يسر باي، صحاري باي، ومصرفي باي — والمبلغ يُرسَل بالعملة LYD إلى جلسة الدفع.", "Checkout is just three fields: name, phone, address. Below them are the payment methods the local MyPay.ly gateway provides — bank cards, Edfali, Yasser Pay, Sahari Pay and Masrvi Pay — with the amount sent in LYD to the payment session.")}</p>
        </figcaption>
        <a href="/assets/luna-checkout-v.webp" target="_blank" rel="noreferrer" aria-label={t("فتح لقطة الواجهة بحجمها الكامل", "Open full-size interface screenshot")}>
          <img src="/assets/luna-checkout-v.webp" width="1280" height="860" loading="lazy" alt={t("إتمام الشراء: ثلاثة حقول وطرق الدفع الخمس ببيانات تجريبية", "Checkout: three fields and the five payment methods with demo data")} />
          <span>{t("تكبير الواجهة ↗", "View full size ↗")}</span>
        </a>
      </figure>
      <details className="case-more"><summary>{t("المزيد من واجهات المشروع", "More project screens")}<span aria-hidden="true">＋</span></summary><div className="case-more-content">
      <figure className="system-showcase">
        <figcaption>
          <span className="eyebrow">03 / INVOICE</span>
          <h2>{t("فاتورة واحدة بثلاث حالات", "One invoice, three states")}</h2>
          <p>{t("بعد الدفع يظهر الطلب بحالة واحدة واضحة: مؤكّد بعلامة نجاح وأزرار الطباعة، معلّق بانتظار تأكيد البوابة، أو فاشل مع بقاء الطلب وزر إعادة المحاولة. اللون والرسالة والأفعال تتغيّر مع الحالة دون صفحة منفصلة.", "After payment, the order shows one clear state: confirmed with a success mark and print actions, pending while the gateway confirms, or failed — keeping the order with a retry button. Color, message and actions change with the state, without a separate page.")}</p>
        </figcaption>
        <div className="showcase-frame trio">
          <a href="/assets/luna-invoice-paid.webp" target="_blank" rel="noreferrer" aria-label={t("فتح فاتورة مؤكّدة بحجمها الكامل", "Open full-size confirmed invoice")}>
            <img src="/assets/luna-invoice-paid.webp" width="683" height="1000" loading="lazy" alt={t("فاتورة بحالة مؤكدة", "Invoice in confirmed state")} />
            <span>{t("مؤكّدة", "Confirmed")}</span>
          </a>
          <a href="/assets/luna-invoice-pending.webp" target="_blank" rel="noreferrer" aria-label={t("فتح فاتورة معلّقة بحجمها الكامل", "Open full-size pending invoice")}>
            <img src="/assets/luna-invoice-pending.webp" width="689" height="1000" loading="lazy" alt={t("فاتورة بحالة معلقة", "Invoice in pending state")} />
            <span>{t("معلّقة", "Pending")}</span>
          </a>
          <a href="/assets/luna-payment-failed.webp" target="_blank" rel="noreferrer" aria-label={t("فتح صفحة فشل الدفع بحجمها الكامل", "Open full-size payment failure page")}>
            <img src="/assets/luna-payment-failed.webp" width="1000" height="711" loading="lazy" alt={t("صفحة فشل الدفع مع إعادة المحاولة", "Payment failure page with retry")} />
            <span>{t("فاشلة", "Failed")}</span>
          </a>
        </div>
      </figure>
      <figure className="system-showcase">
        <figcaption>
          <span className="eyebrow">04 / ADMIN</span>
          <h2>{t("لوحة الإدارة: الطلبات والمخزون في شاشة", "Admin: orders and stock on one screen")}</h2>
          <p>{t("إدارة المنتجات بالصورة أو الإيموجي، وحركة الطلبات بين الحالات، وإحصاءات مصغّرة مع تنبيه للمخزون المنخفض — كلها في لوحة واحدة تُدار من المتصفح.", "Products managed by image or emoji, orders moving between statuses, and compact stats with a low-stock alert — all in one browser dashboard.")}</p>
        </figcaption>
        <a href="/assets/luna-admin-v.webp" target="_blank" rel="noreferrer" aria-label={t("فتح لقطة الواجهة بحجمها الكامل", "Open full-size interface screenshot")}>
          <img src="/assets/luna-admin-v.webp" width="1280" height="860" loading="lazy" alt={t("لوحة إدارة المتجر بالإحصاءات والتنبيهات", "Store admin dashboard with stats and alerts")} />
          <span>{t("تكبير الواجهة ↗", "View full size ↗")}</span>
        </a>
      </figure>
      </div></details>
      <p className="screenshot-note">{t("لقطات من الواجهة الأصلية في بيئة عرض معزولة ببيانات تجريبية: منتجات وعملاء وأرقام طلبات افتراضية، لا سجلات تشغيلية حقيقية.", "Screenshots of the original interface in an isolated demo environment with synthetic data: demo products, customers and order numbers — not operational records.")}</p>
    </section>
    <section className="nabd-connection wrap section">
      <div className="section-label">03 — {t("رحلة الدفع", "THE PAYMENT JOURNEY")}</div>
      <div className="pay-steps">
        {paySteps.map(([h, p], i) => <div className="pay-step" key={h}><span className="pay-num">{String(i + 1).padStart(2, "0")}</span><div><h3>{h}</h3><p>{p}</p></div></div>)}
      </div>
      <p className="screenshot-note">{t("المتجر لا يخزّن بيانات بطاقات إطلاقًا؛ صفحة الدفع مُضافة من بوابة MyPay.ly، ودور الخادم محصور في إنشاء الجلسة والتحقق من النتيجة.", "The store never stores card data; the payment page is hosted by MyPay.ly, and the server's role is limited to creating the session and verifying the result.")}</p>
    </section>
    <section className="case-scope wrap">
      <div className="section-label">04 — {t("نقاط القوة", "WHAT MAKES IT USEFUL")}</div>
      <div className="scope-items nabd-strengths">{ease.map(([h, p], i) => <div key={h}><span>0{i + 1}</span><h3>{h}</h3><p>{p}</p></div>)}</div>
    </section>
    <div className="case-bottom wrap"><a className="button primary" href="/#contact">{t("عندك متجر يحتاج هكذا تجربة؟", "A store that needs this?")}<Arrow /></a><a className="text-button" href="/#work">{t("العودة إلى الأعمال", "Back to work")}<Arrow /></a></div>
  </article>;
}
function CafeVisual({ lang }: { lang: Lang }) {
  return <div className="nabd-cover">
    <div className="nabd-cover-heading"><span>POS</span><p>{lang === "ar" ? "نظام إدارة الكافيه" : "Cafe Management System"}</p><small>SALES · SHIFTS · DEBTS</small></div>
    <img src="/assets/cafe-cover.webp" width="1280" height="860" loading="lazy" alt={lang === "ar" ? "شاشة نقطة بيع نظام إدارة الكافيه ببيانات تجريبية" : "Cafe management point-of-sale screen with demo data"} />
    <span className="nabd-demo-label">{lang === "ar" ? "واجهة أصلية · بيانات تجريبية" : "ORIGINAL INTERFACE · DEMO DATA"}</span>
  </div>;
}
function CafeCase({ lang }: { lang: Lang }) {
  const t = (a: string, e: string) => (lang === "ar" ? a : e);
  const features = [
    [t("نقطة بيع سريعة", "Fast point of sale"), t("شاشة واحدة تجمع المنتجات والبحث والباركود والسلة. أربع طرق للإتمام: نقدي، إضافة إلى المديونية، موبا كاش، أو تسجيل كمعلّق.", "One screen for products, search, barcode and cart. Four ways to finish a sale: cash, add to debt, Mobicash, or record as unpaid.")],
    [t("نوبات وورديات", "Shift management"), t("بدء نوبة وإغلاقها بضغطة. عند الإغلاق تُحسب مبيعات ومصروفات وأوامر النوبة تلقائيًا، ويعرض سجل النوبات صافي كل وردية.", "Start and close a shift with one button. On closing, the shift's sales, expenses and orders are computed, and the shifts log shows each shift's net.")],
    [t("مديونية لكل عميل", "Debts per customer"), t("رصيد مفتوح لكل اسم: إضافة دين، سداد جزئي أو كامل أو دفعات محددة، مع تفاصيل وطباعة تقرير العميل.", "An open balance per customer: add a debt, pay part or all or selected rows, with details and a printable customer report.")],
    [t("مصروفات وتقارير", "Expenses & reports"), t("تسجيل المصروفات والمسحوبات بتصنيفات، وتقارير بأفضل المنتجات وساعة الذروة ورسوم بيانية، وكلها قابلة للطباعة.", "Log expenses and withdrawals by category, with top-product and peak-hour reports and charts — all printable.")],
    [t("موبايل بنفس البيانات", "Mobile on the same data"), t("تطبيق Flutter يتصل بخادم API محلي على نفس قاعدة البيانات، فيبيع الموظف من هاتفه ويرى التقارير نفسها لحظيًا.", "A Flutter app talks to a local API on the same database, so staff can sell from a phone and see the same live reports.")],
    [t("ترخيص يُدار عن بُعد", "Remotely managed licensing"), t("فترة تجريبية سبعة أيام، ووكيل صغير في جهاز العميل يربطه بلوحة تحكم المطوّر: تفعيل أو تعطيل الترخيص وتحديث البرنامج عن بُعد.", "A seven-day trial, plus a small agent on the customer's machine that connects to the developer's console: activate or disable the license, and push updates remotely.")],
  ];
  return <article className="case-page">
    <section className="case-intro wrap">
      <a className="text-button" href="/#work">{t("→ العودة إلى الأعمال", "← Back to work")}</a>
      <div className="case-top"><div><p className="eyebrow">SELECTED WORK / 03 — POS & OPERATIONS</p><h1>{t("نظام إدارة الكافيه", "Cafe System")}<span className="accent">.</span></h1></div><p>{t("يبيع.\nويحسب. ويُدير.", "It sells.\nCounts. And manages.")}</p></div>
      <div className="case-facts"><span>{t("المجال", "FIELD")}<strong>{t("نقاط بيع وإدارة مقاهي", "POS & cafe operations")}</strong></span><span>{t("التقنيات", "STACK")}<strong>{t("Flask · SQLite · Flutter", "Flask · SQLite · Flutter")}</strong></span><span>{t("الفكرة", "THE IDEA")}<strong>{t("نظام واحد للجهاز والهاتف", "One system for desktop and phone")}</strong></span></div>
    </section>
    <section className="case-story wrap section">
      <div className="section-label">01 — {t("المشكلة والحل", "THE PROBLEM & SOLUTION")}</div>
      <div><h2>{t("كل تفاصيل اليوم،", "The whole working day,")}<br/><span className="accent">{t("في مسار واحد.", "in one workflow.")}</span></h2>
      <p>{t("اليوم في المقاهي يتشتت: البيع هنا، الديون في دفتر، المصروفات في مكان آخر، وحساب الوردية في آخر النهار. نظام إدارة الكافيه يجمع هذه في شاشة واحدة تعمل على الجهاز نفسه دون إنترنت، مع تطبيق موبايل يقرأ ويكتب من قاعدة البيانات نفسها.", "A cafe day scatters: sales here, debts in a notebook, expenses elsewhere, and shift math at closing time. The Cafe Management System brings these into one screen that runs on the machine itself without internet, with a mobile app reading and writing the same database.")}</p></div>
    </section>
    <section className="nabd-systems wrap">
      <div className="section-label">02 — {t("لقطات من النظام", "SCREENSHOTS")}</div>
      <figure className="system-showcase">
        <figcaption>
          <span className="eyebrow">01 / POINT OF SALE</span>
          <h2>{t("شاشة البيع السريع", "The quick-sale screen")}</h2>
          <p>{t("شاشة واحدة تجمع شبكة المنتجات وشريط التصنيفات والبحث وحقل الباركود وعربة التسوق. أربع طرق لإتمام البيع — نقدي، إضافة إلى المديونية، موبا كاش، أو تسجيل كمعلّق — وشريط النوبة النشطة أعلى الشاشة يذكّر الموظف بأن كل بيع يُحتسب في ورديته.", "One screen gathers the product grid, the category bar, search, the barcode field and the cart. Four ways to finish a sale — cash, add to debt, Mobicash, or record as unpaid — and the active-shift banner on top reminds staff that every sale counts toward their shift.")}</p>
        </figcaption>
        <a href="/assets/cafe-cover.webp" target="_blank" rel="noreferrer" aria-label={t("فتح لقطة الواجهة بحجمها الكامل", "Open full-size interface screenshot")}>
          <img src="/assets/cafe-cover.webp" width="1280" height="860" loading="lazy" alt={t("شاشة البيع: منتجات وتصنيفات وسلة ونوبة نشطة ببيانات تجريبية", "POS screen: products, categories, cart and an active shift with demo data")} />
          <span>{t("تكبير الواجهة ↗", "View full size ↗")}</span>
        </a>
      </figure>
      <figure className="system-showcase">
        <figcaption>
          <span className="eyebrow">02 / DEBTS</span>
          <h2>{t("مديونية مفتوحة لكل عميل", "An open balance per customer")}</h2>
          <p>{t("بطاقة إحصاء تجمع إجمالي الديون وعدد المدينين، وقائمة قابلة للبحث والفلترة. لكل اسم رصيد مفتوح يقبل الإضافة والسداد الجزئي أو الكامل أو الدفعات المحددة، مع تفاصيل وطباعة تقرير العميل.", "A stats card totals debts and debtor count, with a searchable, filterable list. Each name carries an open balance that accepts additions and partial or full or selected-row payments, with details and a printable customer report.")}</p>
        </figcaption>
        <a href="/assets/cafe-debts-v.webp" target="_blank" rel="noreferrer" aria-label={t("فتح لقطة الواجهة بحجمها الكامل", "Open full-size interface screenshot")}>
          <img src="/assets/cafe-debts-v.webp" width="1280" height="860" loading="lazy" alt={t("إدارة المديونية: إحصاءات وقائمة مدينين ببيانات تجريبية", "Debt management: stats and a debtor list with demo data")} />
          <span>{t("تكبير الواجهة ↗", "View full size ↗")}</span>
        </a>
      </figure>
      <details className="case-more"><summary>{t("المزيد من واجهات المشروع", "More project screens")}<span aria-hidden="true">＋</span></summary><div className="case-more-content">
      <figure className="system-showcase">
        <figcaption>
          <span className="eyebrow">03 / REPORTS</span>
          <h2>{t("تقارير تُقرأ في ثوانٍ", "Reports readable in seconds")}</h2>
          <p>{t("أفضل الأصناف، ساعة الذروة، ورسوم بيانية للمبيعات والمصروفات — تُقرأ في ثوانٍ وتُطبع عند الحاجة، دون انتظار نهاية الشهر أو فتح برنامج آخر.", "Top products, peak hour, and sales and expense charts — readable in seconds and printable when needed, without waiting for month-end or opening another program.")}</p>
        </figcaption>
        <a href="/assets/cafe-reports-v.webp" target="_blank" rel="noreferrer" aria-label={t("فتح لقطة الواجهة بحجمها الكامل", "Open full-size interface screenshot")}>
          <img src="/assets/cafe-reports-v.webp" width="1280" height="860" loading="lazy" alt={t("تقرير المبيعات: رسوم بيانية وأصناف أكثر مبيعًا وتنبيهات ذكية", "Sales report: charts, top products and smart insights")} />
          <span>{t("تكبير الواجهة ↗", "View full size ↗")}</span>
        </a>
      </figure>
      <figure className="system-showcase">
        <figcaption>
          <span className="eyebrow">04 / EXPENSES</span>
          <h2>{t("مصروفات ومسحوبات بسجل واضح", "Expenses and withdrawals, clearly logged")}</h2>
          <p>{t("تسجيل المصروفات والمسحوبات بتصنيفات، وجدول قابل للفلترة والطباعة يمنع تشتّت الدفتر الورقي ويُظهر حركة الوردية في مكانها.", "Expenses and withdrawals logged by category in a filterable, printable table — replacing a scattered paper notebook and showing the shift's movement in place.")}</p>
        </figcaption>
        <a href="/assets/cafe-expenses-v.webp" target="_blank" rel="noreferrer" aria-label={t("فتح لقطة الواجهة بحجمها الكامل", "Open full-size interface screenshot")}>
          <img src="/assets/cafe-expenses-v.webp" width="1280" height="860" loading="lazy" alt={t("سجل المصروفات والمسحوبات ببيانات تجريبية", "Expenses and withdrawals log with demo data")} />
          <span>{t("تكبير الواجهة ↗", "View full size ↗")}</span>
        </a>
      </figure>
      </div></details>
      <p className="screenshot-note">{t("لقطات من الواجهة الأصلية في بيئة عرض معزولة ببيانات تجريبية (منتجات ومبالغ وأسماء افتراضية)، لا بيانات تشغيلية أو عملاء حقيقيون.", "Screenshots of the original interface in an isolated demo environment with synthetic data (demo products, amounts and names) — no operational records or real customers.")}</p>
    </section>
    <section className="nabd-connection wrap section">
      <div className="section-label">03 — {t("كيف يعمل؟", "HOW IT WORKS")}</div>
      <div className="connection-flow cafe-flow">
        <div><small>01</small><h3>{t("برنامج الجهاز", "Desktop app")}</h3><p>{t("Flask + SQLite محليًا، يعمل دون إنترنت", "Flask + SQLite locally, works offline")}</p></div>
        <div className="connection-routes">
          <p>{t("قاعدة بيانات واحدة: قراءة وكتابة من الجهازين", "One database: read and write from both devices")}</p>
          <p>{t("نسخ احتياطي مجدول يوميًا للقاعدة", "A scheduled daily backup of the database")}</p>
        </div>
        <div><small>02</small><h3>{t("تطبيق الموبايل", "Mobile app")}</h3><p>{t("Flutter يتصل بخادم API محلي", "Flutter over a local API server")}</p></div>
      </div>
      <p className="screenshot-note">{t("قاعدة البيانات بـSQLite بوضع WAL مع أقفال للعمليات الحساسة (الديون والمصروفات والإحصاءات) لتتحمّل دخول الموظفين المتزامن دون تكرار أو فقد.", "SQLite runs in WAL mode with locks around sensitive operations (debts, expenses, stats) so concurrent staff entries are handled without duplicates or loss.")}</p>
    </section>
    <section className="case-scope wrap">
      <div className="section-label">04 — {t("نقاط القوة", "WHAT MAKES IT USEFUL")}</div>
      <div className="scope-items nabd-strengths">{features.map(([h, p], i) => <div key={h}><span>0{i + 1}</span><h3>{h}</h3><p>{p}</p></div>)}</div>
    </section>
    <div className="case-bottom wrap"><a className="button primary" href="/#contact">{t("نظام يخدم عملك؟ لنتحدث", "A system for your business?")}<Arrow /></a><a className="text-button" href="/#work">{t("العودة إلى الأعمال", "Back to work")}<Arrow /></a></div>
  </article>;
}
function Project({ lang }: { lang: Lang }) {
  const t = (a: string, e: string) => (lang === "ar" ? a : e);
  const strengths = [
    [t("إصدار منظّم", "Structured issuance"), t("بيانات المؤمن له والمركبة، ترقيم تلقائي للوثيقة، احتساب القسط، ثم المعاينة والطباعة. مسار واضح بدل تشتّت الخطوات.", "Insured and vehicle details, automatic policy numbering, premium calculation, preview and printing—all in a clear sequence.")],
    [t("مزامنة دون تكرار", "Sync without duplicates"), t("الوثائق المعلّقة تبقى في قائمة الانتظار لإعادة المحاولة. يعتمد النقل على تحديث السجل نفسه، مع تأكيد الاستلام قبل إنهاء دورة المزامنة.", "Pending documents remain queued for retry. Transfers update the same record, with receipt confirmation before the sync cycle is completed.")],
    [t("الإنتاج متصل بالماليات", "Production meets finance"), t("يرتبط إنتاج كل وكيل بفترته المالية، مع احتساب الوثائق الملغاة وصافي القيمة. وتجمع الإدارة التسويات والدفعات والمتأخرات في سياق العمل نفسه.", "Each agent’s production is linked to its financial period, accounting for cancelled policies and net value. Administration brings settlements, payments and arrears into the same workflow.")],
    [t("صلاحيات وأثر واضح", "Permissions and traceability"), t("يصل الوكيل إلى وثائقه، وتتحقق المزامنة من ارتباطه وحالته. وتوفّر الإدارة صلاحيات للموظفين وسجلًا للتغييرات لمتابعة ما حدث ومَن نفّذه.", "Agents access their own policies, while synchronization checks their identity and status. Staff permissions and an administrative audit trail make changes easier to trace.")],
  ];
  return <article className="case-page">
    <section className="case-intro wrap">
      <a className="text-button" href="/#work">{t("→ العودة إلى الأعمال", "← Back to work")}</a>
      <div className="case-top"><div><p className="eyebrow">SELECTED WORK / 01 — INSURANCE SYSTEMS</p><h1>{t("نبض", "NABD")}<span className="accent">.</span></h1></div><p>{t("منظومتان.\nدورة عمل واحدة.", "Two systems.\nOne workflow.")}</p></div>
      <div className="case-facts"><span>{t("المجال", "FIELD")}<strong>{t("أعمال التأمين", "Insurance operations")}</strong></span><span>{t("المنظومتان", "THE TWO SYSTEMS")}<strong>{t("الإدارة + الإصدار", "Administration + Issuance")}</strong></span><span>{t("الفكرة", "THE IDEA")}<strong>{t("من الوثيقة إلى المتابعة المالية", "From policy to financial oversight")}</strong></span></div>
    </section>
    <section className="case-story wrap section">
      <div className="section-label">01 — {t("المشكلة والحل", "THE PROBLEM & SOLUTION")}</div>
      <div><h2>{t("المعلومة تُسجّل.", "Record the information.")}<br/><span className="accent">{t("ثم تصل لمن يحتاجها.", "Connect it to the next step.")}</span></h2>
      <p>{t("عندما ينفصل إصدار الوثائق عن الإدارة، تصبح متابعة إنتاج الوكلاء ومطابقة السجلات والماليات عملًا متكررًا. نبض يربط هذين الجانبين: منظومة للإصدار وأخرى لإدارة الشركة، تتبادلان البيانات اللازمة لاستكمال دورة العمل.", "When policy issuance is disconnected from administration, tracking agent production and reconciling financial records becomes repetitive work. NABD connects these sides through a dedicated issuance system and a company administration system that exchange the data needed to complete the workflow.")}</p></div>
    </section>
    <section className="nabd-systems wrap">
      <div className="section-label">02 — {t("داخل المنظومتين", "INSIDE THE TWO SYSTEMS")}</div>
      {[{id:"admin",title:t("الإدارة: الصورة الكاملة", "Administration: the full picture"),text:t("ملفات الوكلاء والعهد، الإنتاج والماليات، طلبات التسوية والاعتماد، المهام والنماذج والتقارير. مكان يجمع متابعة العمل داخل الشركة.", "Agent files and custody records, production and finance, settlement approvals, tasks, templates and reports. One place to follow the company’s internal work.")},{id:"issuer",title:t("الإصدار: من البيانات إلى الوثيقة", "Issuance: from details to policy"),text:t("واجهة للوكلاء لإصدار وثائق الطرف الثالث والتأمين الإجباري. تجمع بيانات العميل والمركبة ومدة التأمين، وتدعم المعاينة والطباعة وسجل الوثائق.", "An agent workspace for third-party and compulsory insurance policies, bringing together customer, vehicle and coverage details, with preview, printing and document records.")}].map((system,i)=><figure className="system-showcase" key={system.id}><figcaption><span className="eyebrow">0{i+1} / {system.id === "admin" ? "ADMINISTRATION" : "ISSUANCE"}</span><h2>{system.title}</h2><p>{system.text}</p></figcaption><a href={`/assets/nabd-${system.id}.webp`} target="_blank" rel="noreferrer" aria-label={t("فتح لقطة الواجهة بحجمها الكامل", "Open full-size interface screenshot")}><img src={`/assets/nabd-${system.id}.webp`} width="1280" height="720" loading="lazy" alt={system.title+t(" — بيانات تجريبية", " — demo data")}/><span>{t("تكبير الواجهة ↗", "View full size ↗")}</span></a></figure>)}
      <p className="screenshot-note">{t("لقطتان من واجهات المشروع الأصلية في بيئة عرض معزولة ببيانات تجريبية، وليستا بيانات تشغيلية أو وثائق عملاء.", "Two original project interfaces rendered in an isolated demo environment. All displayed data is illustrative, not operational records or customer policies.")}</p>
    </section>
    <section className="nabd-connection wrap section"><div className="section-label">03 — {t("كيف يرتبطان؟", "HOW THEY CONNECT")}</div><div className="connection-flow"><div><small>01</small><h3>{t("منظومة الإصدار", "Issuance system")}</h3><p>{t("الوثيقة تبدأ عند الوكيل", "The policy starts with the agent")}</p></div><div className="connection-routes"><p>{t("الوثائق والإنتاج: من الإصدار إلى الإدارة", "Issuance → policies & production → administration")}</p><p>{t("حالة الوكيل وصلاحيته: من الإدارة إلى الإصدار", "Administration → agent status & eligibility → issuance")}</p></div><div><small>02</small><h3>{t("منظومة الإدارة", "Administration system")}</h3><p>{t("المتابعة تستمر داخل الشركة", "Oversight continues within the company")}</p></div></div><p className="connection-summary">{t("تستقبل الإدارة الوثائق بعد التحقق من الوكيل. ويعيد الإصدار التحقق من حالته، بحيث لا يكون الربط مجرد نقل ملفات، بل جزءًا من متابعة العمل.", "Administration receives policies after validating the agent. Issuance checks the agent’s status in turn, making the connection part of the working process rather than a simple file transfer.")}</p></section>
    <section className="case-scope wrap"><div className="section-label">04 — {t("نقاط القوة", "WHAT MAKES IT USEFUL")}</div><div className="scope-items nabd-strengths">{strengths.map(([h,p],i)=><div key={h}><span>0{i+1}</span><h3>{h}</h3><p>{p}</p></div>)}</div></section>
    <div className="case-bottom wrap"><a className="button primary" href="/#contact">{t("لديك تحدٍّ مشابه؟ لنتحدث", "A similar challenge? Let’s talk")}<Arrow/></a><a className="text-button" href="/#work">{t("العودة إلى الأعمال", "Back to work")}<Arrow/></a></div>
  </article>;
}
