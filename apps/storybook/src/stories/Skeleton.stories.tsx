import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@jiangui-resume/ui/components/skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-4 w-36" />
    </div>
  ),
};

export const CardPlaceholder: Story = {
  render: () => (
    <div className="w-80 space-y-3 rounded-md border p-4">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
};
