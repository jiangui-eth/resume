import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentPropsWithoutRef } from 'react'
import { Button } from '@jiangui-resume/ui/components/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@jiangui-resume/ui/components/card'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['default', 'sm'] },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (args: ComponentPropsWithoutRef<typeof Card>) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Card content area.</p>
      </CardContent>
      <CardFooter>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  ),
  args: { size: 'default' },
}

export const Small: Story = {
  ...Default,
  args: { size: 'sm' },
}
