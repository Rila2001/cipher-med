import { useEffect, useMemo } from "react";
import { Activity, Brain, Cross, Heart, Pill, Stethoscope } from "lucide-react";

const ICONS = [Activity, Brain, Cross, Heart, Pill, Stethoscope];

export function ParticleBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        Icon: ICONS[i % ICONS.length],
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: 12 + Math.random() * 10,
        size: 12 + Math.random() * 12,
        opacity: 0.04 + Math.random() * 0.06,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {particles.map((p) => (
        <p.Icon
          key={p.id}
          className="absolute text-primary"
          style={{
            left: `${p.left}%`,
            bottom: "-20px",
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `particle-float ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
