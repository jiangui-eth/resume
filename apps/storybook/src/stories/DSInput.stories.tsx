import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@jiangui-resume/ui/components/Input/Input";

const meta: Meta<typeof Input> = {
  title: "DS / Base / Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["filled", "outlined"] },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
  },
  args: { label: "Label" },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Outlined: Story = {
  args: { variant: "outlined", placeholder: "Placeholder" },
};

export const Filled: Story = {
  args: { variant: "filled", placeholder: "Placeholder" },
};

export const WithError: Story = {
  args: {
    variant: "outlined",
    error: true,
    errorText: "This field is required",
    value: "invalid",
  },
};

export const Disabled: Story = {
  args: { variant: "outlined", disabled: true, value: "Disabled value" },
};

export const WithHelperText: Story = {
  args: {
    variant: "outlined",
    helperText: "Provide a valid email address",
    label: "Email",
    placeholder: "you@example.com",
  },
};
