"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { carriers, type Carrier } from "@/data/carriers";

const PANEL_ID = "carrier-drawer";

const PORTALS: {
  key: keyof Pick<Carrier, "brokers" | "doctors" | "members">;
  name: string;
  tone: "broker" | "doctor" | "member";
}[] = [
  { key: "brokers", name: "broker portal", tone: "broker" },
  { key: "doctors", name: "doctor search", tone: "doctor" },
  { key: "members", name: "member portal", tone: "member" },
];

/**
 * Fixed bottom-right trigger that opens a left-edge drawer of carrier portal links.
 * The drawer stays mounted through the close transition so the slide, or a fade
 * when the user prefers reduced motion, can finish before it unmounts.
 */
export default function FluidNavigation() {
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  const closeRef = useRef<() => void>(() => {});

  const [open, setOpen] = useState(false);
  const [present, setPresent] = useState(false);
  const [visible, setVisible] = useState(false);

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openDrawer = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
    setPresent(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
    setVisible(false);
    triggerRef.current?.focus();
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      setPresent(false);
    }, motionDuration());
  }, []);

  closeRef.current = closeDrawer;

  const toggle = () => {
    if (open) closeDrawer();
    else openDrawer();
  };

  useEffect(() => clearCloseTimer, []);

  useEffect(() => {
    if (!open || !visible) return;
    closeBtnRef.current?.focus();
  }, [open, visible]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const items = focusable(panelRef.current);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
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
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="carrier-trigger"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label="Insurance carrier links"
        onClick={toggle}
      >
        <ChainMark />
      </button>

      {present && (
        <>
          <div
            className={`drawer-backdrop${visible ? " is-open" : ""}`}
            onClick={closeDrawer}
          />
          <div
            ref={panelRef}
            id={PANEL_ID}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-hidden={visible ? undefined : true}
            tabIndex={-1}
            className={`drawer-panel${visible ? " is-open" : ""}`}
          >
            <div className="drawer-head">
              <h2 id={titleId} className="sr-only">
                Insurance carriers
              </h2>
              <button
                ref={closeBtnRef}
                type="button"
                className="drawer-close"
                aria-label="Close insurance carriers"
                onClick={closeDrawer}
              >
                <CloseGlyph />
              </button>
            </div>
            <ul className="drawer-list">
              {carriers.map((carrier) => (
                <li key={carrier.name}>
                  <CarrierRow carrier={carrier} />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

function CarrierRow({ carrier }: { carrier: Carrier }) {
  return (
    <div className="carrier-row">
      <div className="carrier-logo">
        <CarrierLogo name={carrier.name} src={carrier.logo} />
      </div>
      <span className="carrier-name">{carrier.name}</span>
      <div className="carrier-actions">
        {PORTALS.map((portal) => (
          <a
            key={portal.key}
            href={carrier[portal.key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${carrier.name} ${portal.name}`}
            title={portal.name}
            className={`portal-link portal-link--${portal.tone}`}
          >
            <PortalIcon tone={portal.tone} />
          </a>
        ))}
      </div>
    </div>
  );
}

function CarrierLogo({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);
  const initial = name.trim().charAt(0).toUpperCase();

  if (failed) {
    return (
      <span aria-hidden="true" className="carrier-initial">
        {initial}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      className="carrier-logo-img"
      onError={() => setFailed(true)}
    />
  );
}

function PortalIcon({ tone }: { tone: "broker" | "doctor" | "member" }) {
  if (tone === "broker") return <BriefcaseIcon />;
  if (tone === "doctor") return <StethoscopeIcon />;
  return <PersonIcon />;
}

function ChainMark() {
  return (
    <svg viewBox="0 0 24 24" className="chain-mark" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </g>
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="close-glyph" aria-hidden="true">
      <path d="M3.5 3.5 12.5 12.5" />
      <path d="M12.5 3.5 3.5 12.5" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <path d="M3 12h18" />
    </svg>
  );
}

function StethoscopeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 3v2" />
      <path d="M11 3v2" />
      <path d="M5 4H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V6a2 2 0 0 0-2-2h-1" />
      <path d="M8 15a6 6 0 0 0 12 0v-3" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 19.25c1.15-2.55 3.45-3.75 6.5-3.75s5.35 1.2 6.5 3.75" />
    </svg>
  );
}

function motionDuration() {
  if (typeof window === "undefined") return 280;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 150 : 280;
}

function focusable(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("disabled") && element.tabIndex !== -1);
}
