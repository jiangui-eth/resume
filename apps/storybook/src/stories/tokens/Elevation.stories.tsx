import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "DS / Tokens / Elevation",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

const levels = [0, 1, 2, 3, 4, 5] as const;

export const AllLevels: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-8 bg-ds-background p-8">
      {levels.map((level) => (
        <div key={level} className="flex flex-col items-center gap-3">
          <div
            className={`elevation-${level} flex size-24 items-center justify-center rounded-ds-md bg-ds-surface`}
          >
            <span className="text-headline-small text-ds-on-surface">
              {level}
            </span>
          </div>
          <div className="text-center font-mono text-label-small text-ds-on-surface-variant">
            Level {level}
          </div>
        </div>
      ))}
    </div>
  ),
};
