"use client";

import LaserFlow from "@/components/laser-flow";

export function LaserFlowBackground() {
  return (
    <div
      style={{
        width: "100%",
        height: "800px",
        pointerEvents: "none",
      }}
    >
      <LaserFlow
        verticalBeamOffset={-0.48}
        horizontalBeamOffset={0.0}
        color="#00ffff"
        verticalSizing={6.0}
        horizontalSizing={2.5}
        fogIntensity={1.8}
        wispDensity={2.0}
        flowSpeed={0.3}
        fogFallSpeed={1.2}
        wispIntensity={18.0}
        falloffStart={0.8}
      />
    </div>
  );
}
