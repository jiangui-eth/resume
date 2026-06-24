import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "DS / Tokens / Shape Scale",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

const shapes: { name: string; cls: string; value: string }[] = [
  { name: "none", cls: "rounded-ds-none", value: "0px" },
  { name: "extra-small", cls: "rounded-ds-xs", value: "4px" },
  { name: "small", cls: "rounded-ds-sm", value: "8px" },
  { name: "medium", cls: "rounded-ds-md", value: "12px" },
  { name: "large", cls: "rounded-ds-lg", value: "16px" },
  { name: "extra-large", cls: "rounded-ds-xl", value: "28px" },
  { name: "full", cls: "rounded-ds-full", value: "9999px" },
];

export const AllShapes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      {shapes.map(({ name, cls, value }) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <div
            className={`${cls} size-20 border-2 border-ds-primary bg-ds-primary-container`}
          />
          <div className="text-center font-mono text-label-small text-ds-on-surface-variant">
            <div>{name}</div>
            <div className="opacity-60">{value}</div>
          </div>
        </div>
      ))}
    </div>
  ),
};
