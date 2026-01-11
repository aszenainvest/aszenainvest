import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  target: number | string;
  durationMs?: number;
  delayMs?: number;
  prefix?: string;
  suffix?: string;
  startOnVisible?: boolean;
}

function parseTarget(value: number | string): { number: number; prefix: string; suffix: string } {
  if (typeof value === 'number') return { number: value, prefix: '', suffix: '' };
  const match = String(value).trim().match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  if (!match) return { number: 0, prefix: '', suffix: '' };
  const [, pre, num, suf] = match;
  return { number: parseFloat(num), prefix: pre ?? '', suffix: suf ?? '' };
}

const AnimatedCounter = ({ target, durationMs = 2800, delayMs = 0, prefix, suffix, startOnVisible = true }: AnimatedCounterProps) => {
  const { number, prefix: autoPre, suffix: autoSuf } = parseTarget(target);
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(!startOnVisible);
  const startRef = useRef<number | null>(null);
  const elRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!startOnVisible) return setStarted(true);
    const node = elRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!started) return;
    let raf = 0;
    let timeout = 0 as unknown as number;
    setCurrent(0);
    startRef.current = null;
    const startNumber = 0;
    const endNumber = number;

    const step = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - (startRef.current ?? 0);
      const progress = Math.min(1, elapsed / durationMs);
      // smooth ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(startNumber + (endNumber - startNumber) * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    const start = () => {
      raf = requestAnimationFrame(step);
    };

    if (delayMs > 0) {
      timeout = window.setTimeout(start, delayMs) as unknown as number;
    } else {
      start();
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (timeout) clearTimeout(timeout as unknown as number);
    };
  }, [number, durationMs, delayMs, started]);

  const displayed = Number.isInteger(number) ? Math.round(current).toString() : current.toFixed(1);

  return (
    <span ref={elRef}>
      {(prefix ?? autoPre) + displayed + (suffix ?? autoSuf)}
    </span>
  );
};

export default AnimatedCounter;
