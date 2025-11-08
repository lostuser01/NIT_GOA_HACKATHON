"use client";

import LaserFlow from "@/components/laser-flow";

export function LaserFlowBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <LaserFlow
        verticalBeamOffset={-0.45}
        horizontalBeamOffset={0.0}
        color="#3b82f6"
        verticalSizing={3.5}
        horizontalSizing={1.2}
        fogIntensity={0.35}
        wispDensity={1.2}
        flowSpeed={0.25}
        fogFallSpeed={0.8}
      />
    </div>
  );
}
