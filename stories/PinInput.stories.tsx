import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import PinInput from '../src/PinInput';

const OTP_SCHEME = [0, 1, 2, 3, 4, 5];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'PIN Input',
  component: ({ onValueComplete, onlyDigits }) => (
    <PinInput.Root onValueComplete={onValueComplete} onlyDigits={onlyDigits}>
      <PinInput.Label>Enter your OTP</PinInput.Label>
      <PinInput.Control>
        {OTP_SCHEME.map((id, index) => (
          <PinInput.Input key={id} index={index} />
        ))}
      </PinInput.Control>
    </PinInput.Root>
  ),
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onValueComplete: fn(),
    onlyDigits: true,
  },
} satisfies Meta<typeof PinInput.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotOnlyDigits: Story = {
  args: {
    onlyDigits: true,
  },
};
