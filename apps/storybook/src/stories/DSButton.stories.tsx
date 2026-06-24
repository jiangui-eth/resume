import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@jiangui-resume/ui/components/Button/Button";

const meta: Meta<typeof Button> = {
  title: "DS / Base / Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "outlined", "text", "fab"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
  args: { children: "Button Label" },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Filled: Story = {
  args: { variant: "filled" },
};

export const Outlined: Story = {
  args: { variant: "outlined" },
};

export const Text: Story = {
  args: { variant: "text" },
};

export const FAB: Story = {
  args: { variant: "fab", children: "+" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="filled">Filled</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
      <Button variant="fab">+</Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="filled">Normal</Button>
      <Button variant="filled" disabled>
        Disabled
      </Button>
      <Button variant="filled" loading>
        Loading
      </Button>
    </div>
  ),
};
