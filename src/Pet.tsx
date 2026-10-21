import { Arrow } from "./Icons";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  RuntimeLoader,
} from "@rive-app/react-canvas";
import type { Lang } from "./content";
RuntimeLoader.setWasmUrl("/assets/rive.wasm");
export default function Pet({ lang, still }: { lang: Lang; still: boolean }) {
  const [hidden, setHidden] = useState(false),
    [greet, setGreet] = useState(false),
    [hover, setHover] = useState(false),
    [failed, setFailed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "80px" });
  const { rive, RiveComponent } = useRive({
    src: "/assets/cute-cat.riv",
    stateMachine: "State Machine 1",
    autoplay: !still,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    onLoadError: () => setFailed(true),
  });
  useEffect(() => {
    if (!rive) return;
    if (still || hidden || !inView) rive.pause();
    else rive.play("State Machine 1");
  }, [rive, still, hidden, inView]);
  useEffect(() => {
    if (!rive) return;
    const inputs = rive.stateMachineInputs("State Machine 1");
    const mouth = inputs?.find((i) => i.name === "嘴巴");
    const energy = inputs?.find((i) => i.name === "强度");
    if (mouth) mouth.value = greet && !still;
    if (energy) energy.value = (hover || greet) && !still;
  }, [rive, greet, hover, still]);
  useEffect(() => {
    if (!greet) return;
    const id = setTimeout(() => setGreet(false), 2200);
    return () => clearTimeout(id);
  }, [greet]);
  if (hidden)
    return (
      <button
        className="pet-restore text-button"
        onClick={() => setHidden(false)}
      >
        {lang === "ar" ? "إظهار القط" : "Show cat"} <Arrow />
      </button>
    );
  return (
    <div className="pet-area" ref={ref}>
      <button
        className="pet-hide"
        onClick={() => setHidden(true)}
        aria-label={lang === "ar" ? "إخفاء القط" : "Hide cat"}
      >
        ×
      </button>
      <button
        className="pet-interaction"
        aria-label={
          lang === "ar" ? "إلقاء التحية على القط" : "Say hello to the cat"
        }
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        onClick={() => setGreet(true)}
      >
        {failed ? <span className="pet-fallback">◕‿◕</span> : <RiveComponent />}
      </button>
      <span className="pet-bubble" aria-live="polite">
        {greet
          ? lang === "ar"
            ? "مياو! سعيد بوجودك هنا."
            : "Meow! Good to have you here."
          : lang === "ar"
            ? "رفيق الاستراحة"
            : "The break-time companion"}
      </span>
      <a
        className="pet-credit"
        href="https://rive.app/marketplace/12890-24389-cute-cat/"
        target="_blank"
        rel="noreferrer"
      >
        Cute cat · cuiyateng
      </a>
      <a className="pet-license" href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0</a>
    </div>
  );
}
