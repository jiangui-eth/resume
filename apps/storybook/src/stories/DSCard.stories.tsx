import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@jiangui-resume/ui/components/Card/Card";

const meta: Meta<typeof Card> = {
  title: "DS / Base / Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["elevated", "filled", "outlined"] },
    clickable: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const CardContent = () => (
  <div className="p-6">
    <h3 className="mb-2 text-title-large text-ds-on-surface">Card Title</h3>
    <p className="text-body-medium text-ds-on-surface-variant">
      This is card content using DS typography tokens.
    </p>
  </div>
);

export const Elevated: Story = {
  args: { variant: "elevated", children: <CardContent /> },
};

export const Filled: Story = {
  args: { variant: "filled", children: <CardContent /> },
};

export const Outlined: Story = {
  args: { variant: "outlined", children: <CardContent /> },
};

export const Clickable: Story = {
  args: {
    variant: "elevated",
    clickable: true,
    children: <CardContent />,
    onClick: () => {},
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid max-w-2xl grid-cols-3 gap-4">
      <Card variant="elevated">
        <CardContent />
      </Card>
      <Card variant="filled">
        <CardContent />
      </Card>
      <Card variant="outlined">
        <CardContent />
      </Card>
    </div>
  ),
};
