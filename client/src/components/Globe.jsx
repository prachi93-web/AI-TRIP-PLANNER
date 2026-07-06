import React, { useRef, useEffect } from "react";
import Globe from "react-globe.gl";
import { Plane } from "lucide-react";

const GlobeComponent = () => {
  const globeRef = useRef();

  useEffect(() => {
    if (!globeRef.current) return;

    const controls = globeRef.current.controls();

    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.7;
    controls.enableZoom = false;
    controls.enablePan = false;

    globeRef.current.pointOfView(
      {
        lat: 20,
        lng: 78,
        altitude: 2.1,
      },
      0
    );
  }, []);

  return (
    <div className="relative flex items-center justify-center w-96 h-96">

      {/* Purple Glow */}
      <div className="absolute w-96 h-96 bg-purple-400/25 rounded-full blur-[120px]"></div>

      {/* Orbit Ring 1 */}
      <div className="absolute w-96 h-96 rounded-full border border-purple-300/40"></div>

      {/* Orbit Ring 2 */}
      <div className="absolute w-96 h-80 rounded-full border border-purple-300/30 rotate-12"></div>

      {/* Orbit Ring 3 */}
      <div className="absolute w-80 h-96 rounded-full border border-purple-300/20 -rotate-12"></div>

      {/* Decorative Dots */}
      <div className="absolute top-12 right-16 w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_20px_#a855f7] animate-pulse"></div>

      <div className="absolute bottom-16 left-16 w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_18px_#c084fc] animate-ping"></div>

      {/* Airplane */}
      <Plane
        size={22}
        className="absolute top-20 left-16 text-purple-600 rotate-45 animate-bounce"
      />

      {/* Globe */}
      <div className="relative z-10">
        <Globe
          ref={globeRef}
          width={520}
          height={520}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          backgroundColor="rgba(0,0,0,0)"
          atmosphereColor="#A855F7"
          atmosphereAltitude={0.22}
        />
      </div>
    </div>
  );
};

export default GlobeComponent;