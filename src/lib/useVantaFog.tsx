import { useEffect, useRef } from 'react';

function loadScript(src: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = (e) => reject(e);
    document.head.appendChild(s);
  });
}

export default function useVantaFog(ref: React.RefObject<HTMLElement | null>, opts: any = {}) {
  const vantaRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    async function init() {
      if (!ref?.current) return;
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js');
        if (!mounted) return;
        if ((window as any).VANTA && (window as any).VANTA.FOG) {
          const norm = (c: any, fallback: number) => {
            if (typeof c === 'number') return c;
            if (typeof c === 'string') {
              const s = c.replace(/^0x#?/, '').replace(/^#/, '');
              const parsed = parseInt(s, 16);
              return Number.isFinite(parsed) ? parsed : fallback;
            }
            return fallback;
          };

          const highlight = norm(opts.highlightColor, 0x122554);
          const midtone = norm(opts.midtoneColor, 0x122554);
          const lowlight = norm(opts.lowlightColor, 0xf9c93b);
          const base = norm(opts.baseColor, 0x122554);

          vantaRef.current = (window as any).VANTA.FOG({
            el: ref.current,
            highlightColor: highlight,
            midtoneColor: midtone,
            lowlightColor: lowlight,
            baseColor: base,
            blurFactor: opts.blurFactor ?? 0.56,
            speed: opts.speed ?? 1.0,
            zoom: opts.zoom ?? 1.0,
            mouseControls: opts.mouseControls ?? true,
            touchControls: opts.touchControls ?? true,
            gyroControls: opts.gyroControls ?? false,
            minHeight: opts.minHeight ?? 200,
            minWidth: opts.minWidth ?? 200,
          });
        }
      } catch (err) {
        // fail silently
        // console.warn('Vanta load failed', err);
      }
    }

    init();

    return () => {
      mounted = false;
      try {
        if (vantaRef.current && vantaRef.current.destroy) vantaRef.current.destroy();
      } catch (e) {
        // ignore
      }
    };
  }, [ref, opts]);
}
