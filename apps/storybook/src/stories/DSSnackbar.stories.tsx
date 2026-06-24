import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@jiangui-resume/ui/components/Button/Button";
import { Snackbar } from "@jiangui-resume/ui/components/Snackbar/Snackbar";
import { useState } from "react";

const meta: Meta<typeof Snackbar> = {
  title: "DS / Base / Snackbar",
  component: Snackbar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

function SnackbarDemo({
  message,
  actionLabel,
  duration,
}: {
  message: string;
  actionLabel?: string;
  duration?: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="flex flex-col items-center gap-4"
      style={{ minHeight: 120 }}
    >
      <Button variant="filled" onClick={() => setOpen(true)}>
        Show Snackbar
      </Button>
      <Snackbar
        open={open}
        message={message}
        duration={duration}
        onClose={() => setOpen(false)}
        action={
          actionLabel
            ? { label: actionLabel, onClick: () => setOpen(false) }
            : undefined
        }
      />
    </div>
  );
}

export const Basic: Story = {
  render: () => <SnackbarDemo message="Changes saved successfully" />,
};

export const WithAction: Story = {
  render: () => <SnackbarDemo message="Item deleted" actionLabel="Undo" />,
};

export const AutoClose: Story = {
  render: () => <SnackbarDemo message="Closes in 2 seconds" duration={2000} />,
};
