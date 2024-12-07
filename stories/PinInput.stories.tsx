import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import PinInput from '../src/pin-input';

const OTP_SCHEME = [0, 1, 2, 3, 4, 5];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'PIN Input',
  component: PinInput.Root,
  subcomponents: {
    'PinInput.Label': PinInput.Label,
    'PinInput.Control': PinInput.Control,
    'PinInput.Input': PinInput.Input,
  },
  argTypes: {},
  args: {
    onValueComplete: fn(),
    onlyDigits: true,
  },
  render: ({ schema, ...args }) => {
    const input_schema = schema ?? OTP_SCHEME;
    return (
      <PinInput.Root {...args}>
        <PinInput.Label>Enter your OTP</PinInput.Label>
        <PinInput.Control>
          {input_schema.map((id, index) => (
            <PinInput.Input key={id} index={index} />
          ))}
        </PinInput.Control>
      </PinInput.Root>
    );
  },
} satisfies Meta<typeof PinInput.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnlyDigits: Story = {
  args: {
    onlyDigits: true,
  },
};

export const NotOnlyDigits: Story = {
  args: {
    onlyDigits: false,
  },
};

export const DifferentLength: Story = {
  args: {
    onlyDigits: false,
    schema: [0, 1, 2, 3],
  },
};
