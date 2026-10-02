"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { carriers, type Carrier } from "@/data/carriers";

const LINK_ICON =
  "https://vibe.filesafe.space/1776361684841705077/assets/edfa1551-c8a2-4081-a870-f4905270765a.png";

const PANEL_ID = "fluid-nav-panel";
const TITLE_ID = "fluid-nav-title";
const CLOSE_MS = 420;

const PORTALS: { key: keyof Pick<Carrier, "brokers" | "doctors" | "members">; label: string }[] = [
  { key: "brokers", label: "Broker portal" },
  { key: "doctors", label: "Doctor search" },
  { key: "members", label: "Member portal" },
];

/**
 * Circular trigger that grows a glass carrier menu.
 * The panel stays mounted through the close transition so the
 * scale and the tile cascade can play in reverse.
 */
export default function FluidNavigation() {
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  const [rendered, setRendered] = useState(false);
  const [shown, setShown] = useState(false);
  const [closing, setClosing] = useState(false);
  const [dark, setDark] = useState(false);
  const [themeReady, setThemeReady] = useState(false);
  const [iconFailed, setIconFailed] = useState(false);

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const open = useCallback(() => {
    clearCloseTimer();
    setClosing(false);
    setRendered(true);
    // Two frames: first paint is the scaled-down panel, then we expand.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setShown(true));
    });
  }, []);

  const close = useCallback(() => {
    setShown(false);
    setClosing(true);
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      setRendered(false);
      setClosing(false);
      triggerRef.current?.focus();
    }, CLOSE_MS);
  }, []);

  const toggle = () => {
    if (shown) close();
    else open();
  };

  useEffect(() => {
    const stored = window.localStorage.getItem("fluid-theme");
    if (stored === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
    setThemeReady(true);
    return () => clearCloseTimer();
  }, []);

  useEffect(() => {
    if (!themeReady) return;
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem("fluid-theme", dark ? "dark" : "light");
  }, [dark, themeReady]);

  useEffect(() => {
    if (!rendered) return;

    const root = panelRef.current;
    root?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const items = focusable(panelRef.current);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      // Keep Tab inside the dialog, including when focus is still on the panel itself.
      const inside = panelRef.current.contains(active);
      if (!inside || active === panelRef.current) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [rendered, close]);

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-16">
      <button
        type="button"
        onClick={() => setDark((value) => !value)}
        aria-pressed={dark}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        className="fixed right-4 top-4 z-20 rounded-full border border-slate-300/80 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm backdrop-blur transition hover:border-tide-700/40 hover:text-tide-800 dark:border-white/15 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:text-white"
      >
        {dark ? "Light" : "Dark"}
      </button>

      <div className="flex w-full flex-col items-center">
        <div className={`relative z-50 ${shown ? "" : "orb-float"}`}>
          <button
            ref={triggerRef}
            type="button"
            className="orb"
            aria-expanded={shown}
            aria-controls={PANEL_ID}
            aria-haspopup="dialog"
            aria-label={shown ? "Close insurance carriers" : "Open insurance carriers"}
            onClick={toggle}
          >
            {iconFailed ? (
              <ChainMark />
            ) : (
              <img
                src={LINK_ICON}
                alt="Link"
                width={56}
                height={56}
                className="relative z-[1] h-12 w-12 object-contain drop-shadow-sm"
                onError={() => setIconFailed(true)}
              />
            )}
          </button>
        </div>

        <p className={shown ? "sr-only" : "mt-5 text-sm tracking-wide text-[var(--muted)]"}>Carrier portals</p>

        {rendered && (
          <>
            <div
              className="fixed inset-0 z-30 bg-[#0b3036]/15 backdrop-blur-[2px] dark:bg-black/40"
              onMouseDown={close}
            />
            <div
              ref={panelRef}
              id={PANEL_ID}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId || TITLE_ID}
              tabIndex={-1}
              className={`nav-panel relative z-40 mt-3 flex w-[min(1040px,calc(100vw-2rem))] max-h-[calc(100dvh-8.5rem)] flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/72 shadow-glass backdrop-blur-2xl outline-none dark:border-white/10 dark:bg-[#122226]/78 ${
                shown ? "is-open" : ""
              } ${closing ? "is-closing" : ""}`}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 px-5 pb-2 pt-4 sm:px-6">
                <h2 id={titleId || TITLE_ID} className="text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100">
                  Insurance carriers
                </h2>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close insurance carriers"
                  className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-900/5 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tide-800 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:outline-teal-200"
                >
                  <span aria-hidden="true" className="text-lg leading-none">
                    ×
                  </span>
                </button>
              </div>

              <div className="edge-fade min-h-0 flex-1 overflow-y-auto px-4 pb-5 sm:px-5">
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {carriers.map((carrier, index) => (
                    <li key={carrier.name} className="tile" style={{ ["--i" as string]: index }}>
                      <CarrierTile carrier={carrier} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CarrierTile({ carrier }: { carrier: Carrier }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-2 hover:ring-tide-700/35 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-white/[0.04] dark:hover:ring-teal-200/40">
      <div className="flex h-14 items-center justify-center rounded-xl bg-slate-50/90 px-2 dark:bg-white/5">
        <CarrierLogo name={carrier.name} src={carrier.logo} />
      </div>
      <h3 className="mt-2.5 text-center text-sm font-semibold tracking-tight text-slate-800 dark:text-slate-100">
        {carrier.name}
      </h3>
      <ul className="mt-2 space-y-0.5">
        {PORTALS.map((portal) => (
          <li key={portal.key}>
            <a
              href={carrier[portal.key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${carrier.name} ${portal.label.toLowerCase()}`}
              className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-tide-50 hover:text-tide-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tide-800 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-teal-100 dark:focus-visible:outline-teal-200"
            >
              <span>{portal.label}</span>
              <span aria-hidden="true" className="text-[10px] opacity-60">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}

function CarrierLogo({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);
  const initial = name.trim().charAt(0).toUpperCase();

  if (failed) {
    return (
      <span
        aria-hidden="true"
        className="grid h-11 w-11 place-items-center rounded-full border border-tide-700/25 bg-tide-50 text-sm font-semibold text-tide-800 dark:border-teal-100/20 dark:bg-white/10 dark:text-teal-50"
      >
        {initial}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      className="max-h-9 w-auto max-w-[7.5rem] object-contain transition duration-300 group-hover:-translate-y-px group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:transform-none"
      onError={() => setFailed(true)}
    />
  );
}

function ChainMark() {
  return (
    <svg viewBox="0 0 64 64" className="relative z-[1] h-10 w-10" aria-hidden="true">
      <defs>
        <linearGradient id="link-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7fbfc" />
          <stop offset="48%" stopColor="#6eafb8" />
          <stop offset="100%" stopColor="#145e68" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#link-metal)" strokeWidth="6" strokeLinecap="round">
        <rect x="6" y="24" width="32" height="16" rx="8" transform="rotate(-32 22 32)" />
        <rect x="26" y="24" width="32" height="16" rx="8" transform="rotate(32 42 32)" />
      </g>
    </svg>
  );
}

function focusable(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("disabled") && element.tabIndex !== -1);
}
