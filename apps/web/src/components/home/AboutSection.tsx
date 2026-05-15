import Image from "next/image";
import profileData from "@/data/profile.json";

const STATS = [
  { value: "14x", label: "SEO Growth" },
  { value: "1.8s", label: "LCP Optimized" },
  { value: "80%", label: "Build Speedup" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="max-w-300 mx-auto px-6 py-20"
      aria-label="About"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Bio card — 8 cols */}
        <div className="md:col-span-8 glass-card p-10 flex flex-col justify-center">
          <h2 className="text-[32px] leading-[1.2] font-bold tracking-[-0.02em] mb-4 text-[#e3e2e2]">
            Precision in Every Pixel
          </h2>
          <p className="text-base leading-[1.6] text-[#c4c7c7] mb-4">
            {profileData.summary}
          </p>
          {/* Metrics row */}
          <div className="flex gap-10 mt-4">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-[32px] leading-[1.2] font-bold tracking-[-0.02em] text-[#508eff]">
                  {value}
                </p>
                <p className="font-mono text-sm font-medium leading-[1.4] tracking-[0.02em] text-[#8e9192]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Photo card — 4 cols */}
        <div className="md:col-span-4 glass-card overflow-hidden group min-h-70">
          <Image
            src={profileData.avatarUrl}
            alt={`${profileData.name} — ${profileData.headline}`}
            width={400}
            height={480}
            priority
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            style={{ height: "100%", minHeight: "280px" }}
          />
        </div>
      </div>
    </section>
  );
}
