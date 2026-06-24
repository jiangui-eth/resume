import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "DS / Tokens / Type Scale",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

const typeScales: { name: string; cls: string; spec: string }[] = [
  {
    name: "Display Large",
    cls: "text-display-large",
    spec: "57 / 64 / 400 / −0.25",
  },
  {
    name: "Display Medium",
    cls: "text-display-medium",
    spec: "45 / 52 / 400 / 0",
  },
  {
    name: "Display Small",
    cls: "text-display-small",
    spec: "36 / 44 / 400 / 0",
  },
  {
    name: "Headline Large",
    cls: "text-headline-large",
    spec: "32 / 40 / 400 / 0",
  },
  {
    name: "Headline Medium",
    cls: "text-headline-medium",
    spec: "28 / 36 / 400 / 0",
  },
  {
    name: "Headline Small",
    cls: "text-headline-small",
    spec: "24 / 32 / 400 / 0",
  },
  { name: "Title Large", cls: "text-title-large", spec: "22 / 28 / 400 / 0" },
  {
    name: "Title Medium",
    cls: "text-title-medium",
    spec: "16 / 24 / 500 / 0.15",
  },
  { name: "Title Small", cls: "text-title-small", spec: "14 / 20 / 500 / 0.1" },
  { name: "Body Large", cls: "text-body-large", spec: "16 / 24 / 400 / 0.5" },
  {
    name: "Body Medium",
    cls: "text-body-medium",
    spec: "14 / 20 / 400 / 0.25",
  },
  { name: "Body Small", cls: "text-body-small", spec: "12 / 16 / 400 / 0.4" },
  { name: "Label Large", cls: "text-label-large", spec: "14 / 20 / 500 / 0.1" },
  {
    name: "Label Medium",
    cls: "text-label-medium",
    spec: "12 / 16 / 500 / 0.5",
  },
  { name: "Label Small", cls: "text-label-small", spec: "11 / 16 / 500 / 0.5" },
];

export const AllScales: Story = {
  render: () => (
    <div className="flex flex-col gap-6 text-ds-on-surface">
      {typeScales.map(({ name, cls, spec }) => (
        <div
          key={name}
          className="flex items-baseline gap-6 border-b border-ds-outline-variant pb-4"
        >
          <div className="w-48 shrink-0">
            <div className="font-mono text-label-small text-ds-on-surface-variant">
              {name}
            </div>
            <div className="font-mono text-label-small text-ds-on-surface-variant/60">
              {spec}
            </div>
          </div>
          <div className={cls}>The quick brown fox</div>
        </div>
      ))}
    </div>
  ),
};
