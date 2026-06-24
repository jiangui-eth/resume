import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@jiangui-resume/ui/components/Button/Button";
import { Dialog } from "@jiangui-resume/ui/components/Dialog/Dialog";
import { useState } from "react";

const meta: Meta<typeof Dialog> = {
  title: "DS / Base / Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

function DialogDemo({
  title,
  description,
  withContent,
}: {
  title: string;
  description?: string;
  withContent?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="filled" onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        description={description}
        actions={
          <div className="flex gap-2">
            <Button variant="text" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="filled" onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </div>
        }
      >
        {withContent && (
          <p>Additional content can be placed here inside the dialog body.</p>
        )}
      </Dialog>
    </>
  );
}

export const Basic: Story = {
  render: () => (
    <DialogDemo
      title="Confirm action"
      description="Are you sure you want to proceed? This cannot be undone."
    />
  ),
};

export const WithContent: Story = {
  render: () => (
    <DialogDemo
      title="Settings"
      description="Update your preferences below."
      withContent
    />
  ),
};
