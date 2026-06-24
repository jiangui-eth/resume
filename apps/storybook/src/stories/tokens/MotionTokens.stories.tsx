import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta = {
  title: "DS / Tokens / Motion",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

const durations: { name: string; ms: string }[] = [
  { name: "short-1", ms: "50ms" },
  { name: "short-2", ms: "100ms" },
  { name: "short-3", ms: "150ms" },
  { name: "short-4", ms: "200ms" },
  { name: "medium-1", ms: "250ms" },
  { name: "medium-2", ms: "300ms" },
  { name: "medium-3", ms: "350ms" },
  { name: "medium-4", ms: "400ms" },
  { name: "long-1", ms: "450ms" },
  { name: "long-2", ms: "500ms" },
  { name: "long-3", ms: "550ms" },
  { name: "long-4", ms: "600ms" },
  { name: "extra-long-1", ms: "700ms" },
  { name: "extra-long-2", ms: "800ms" },
  { name: "extra-long-3", ms: "900ms" },
  { name: "extra-long-4", ms: "1000ms" },
];

const easings: { name: string; curve: string }[] = [
  { name: "emphasized-decelerate", curve: "cubic-bezier(0.05, 0.7, 0.1, 1)" },
  { name: "emphasized-accelerate", curve: "cubic-bezier(0.3, 0, 0.8, 0.15)" },
  { name: "standard", curve: "cubic-bezier(0.2, 0, 0, 1)" },
  { name: "standard-decelerate", curve: "cubic-bezier(0, 0, 0, 1)" },
  { name: "standard-accelerate", curve: "cubic-bezier(0.3, 0, 1, 1)" },
];

function DurationDemo({ name, ms }: { name: string; ms: string }) {
  const [active, setActive] = useState(false);
  return (
    <div className="flex items-center gap-4 border-b border-ds-outline-variant py-2">
      <div className="w-36 shrink-0 font-mono text-label-small text-ds-on-surface-variant">
        --ds-duration-{name}
      </div>
      <div className="w-16 text-label-small text-ds-on-surface-variant">
        {ms}
      </div>
      <div className="h-2 flex-1 overflow-hidden rounded-ds-full bg-ds-surface-variant">
        <div
          className="h-full rounded-ds-full bg-ds-primary"
          style={{
            width: active ? "100%" : "0%",
            transition: `width ${ms} var(--ds-easing-standard)`,
          }}
        />
      </div>
      <button
        type="button"
        className="text-label-small text-ds-primary underline"
        onClick={() => setActive((v) => !v)}
      >
        {active ? "Reset" : "Play"}
      </button>
    </div>
  );
}

export const Durations: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col">
      {durations.map((d) => (
        <DurationDemo key={d.name} {...d} />
      ))}
    </div>
  ),
};

export const Easings: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-4">
      {easings.map(({ name, curve }) => (
        <div
          key={name}
          className="rounded-ds-sm border border-ds-outline-variant p-4"
        >
          <div className="mb-1 font-mono text-label-medium text-ds-on-surface">
            --ds-easing-{name}
          </div>
          <div className="font-mono text-label-small text-ds-on-surface-variant">
            {curve}
          </div>
        </div>
      ))}
    </div>
  ),
};
