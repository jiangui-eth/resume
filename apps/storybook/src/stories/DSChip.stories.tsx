import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "@jiangui-resume/ui/components/Chip/Chip";

const meta: Meta<typeof Chip> = {
  title: "DS / Base / Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["assist", "filter", "input", "suggestion"],
    },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { label: "Chip" },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Assist: Story = {
  args: { variant: "assist", label: "Assist" },
};

export const Filter: Story = {
  args: { variant: "filter", label: "Filter" },
};

export const FilterSelected: Story = {
  args: { variant: "filter", label: "Filter", selected: true },
};

export const Input: Story = {
  args: { variant: "input", label: "Design System", onRemove: () => {} },
};

export const Suggestion: Story = {
  args: { variant: "suggestion", label: "Suggestion" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Chip variant="assist" label="Assist" />
      <Chip variant="filter" label="Filter" />
      <Chip variant="filter" label="Selected" selected />
      <Chip variant="input" label="Design" onRemove={() => {}} />
      <Chip variant="suggestion" label="Suggestion" />
    </div>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Chip variant="assist" label="Disabled" disabled />
      <Chip variant="filter" label="Disabled" disabled selected />
    </div>
  ),
};
