import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "DS / Tokens / Color",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

const colorRoles: { name: string; bg: string; fg: string }[] = [
  { name: "primary", bg: "bg-ds-primary", fg: "text-ds-on-primary" },
  { name: "on-primary", bg: "bg-ds-on-primary", fg: "text-ds-primary" },
  {
    name: "primary-container",
    bg: "bg-ds-primary-container",
    fg: "text-ds-on-primary-container",
  },
  {
    name: "on-primary-container",
    bg: "bg-ds-on-primary-container",
    fg: "text-ds-primary-container",
  },
  { name: "secondary", bg: "bg-ds-secondary", fg: "text-ds-on-secondary" },
  { name: "on-secondary", bg: "bg-ds-on-secondary", fg: "text-ds-secondary" },
  {
    name: "secondary-container",
    bg: "bg-ds-secondary-container",
    fg: "text-ds-on-secondary-container",
  },
  {
    name: "on-secondary-container",
    bg: "bg-ds-on-secondary-container",
    fg: "text-ds-secondary-container",
  },
  { name: "tertiary", bg: "bg-ds-tertiary", fg: "text-ds-on-tertiary" },
  {
    name: "tertiary-container",
    bg: "bg-ds-tertiary-container",
    fg: "text-ds-on-tertiary-container",
  },
  { name: "error", bg: "bg-ds-error", fg: "text-ds-on-error" },
  {
    name: "error-container",
    bg: "bg-ds-error-container",
    fg: "text-ds-on-error-container",
  },
  { name: "surface", bg: "bg-ds-surface", fg: "text-ds-on-surface" },
  {
    name: "surface-variant",
    bg: "bg-ds-surface-variant",
    fg: "text-ds-on-surface-variant",
  },
  {
    name: "inverse-surface",
    bg: "bg-ds-inverse-surface",
    fg: "text-ds-inverse-on-surface",
  },
  { name: "outline", bg: "bg-ds-outline", fg: "text-ds-on-background" },
  {
    name: "outline-variant",
    bg: "bg-ds-outline-variant",
    fg: "text-ds-on-surface",
  },
];

function ColorSwatch({
  name,
  bg,
  fg,
}: {
  name: string;
  bg: string;
  fg: string;
}) {
  return (
    <div className={`${bg} ${fg} rounded-ds-sm p-4 font-mono text-body-small`}>
      <div className="font-medium">{name}</div>
      <div className="opacity-70">--ds-color-{name}</div>
    </div>
  );
}

export const SystemRoles: Story = {
  render: () => (
    <div className="grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4">
      {colorRoles.map((role) => (
        <ColorSwatch key={role.name} {...role} />
      ))}
    </div>
  ),
};
