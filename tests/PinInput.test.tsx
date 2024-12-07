import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import PinInput from '../src/pin-input';

describe('<PinInput/>', () => {
  const setup = ({
    onValueComplete = () => {},
    onlyDigits = true,
    SCHEMA = [0, 1, 2, 3, 4, 5],
  } = {}) => {
    const user = userEvent.setup();

    render(
      <PinInput.Root onValueComplete={onValueComplete} onlyDigits={onlyDigits}>
        <PinInput.Label>Enter your OTP</PinInput.Label>
        <PinInput.Control>
          {SCHEMA.map((id, index) => (
            <PinInput.Input key={id} index={index} />
          ))}
        </PinInput.Control>
      </PinInput.Root>,
    );

    function getInputs() {
      return screen.getAllByRole('textbox');
    }

    return {
      user,
      getInputs,
      getLabel: () => screen.getByText('Enter your OTP'),
      typePin: async (pin: string) => {
        const inputs = getInputs();

        const pinArray = pin.split('');

        for (let i = 0; i < pinArray.length; i++) {
          const char = pinArray[i];

          await user.type(inputs[i], char);
        }
      },
      pressArrowRight: async (fromIndex: number) => {
        const inputs = getInputs();

        inputs[fromIndex].focus();
        await user.keyboard('[ArrowRight]');
      },
      pressArrowLeft: async (fromIndex: number) => {
        const inputs = getInputs();

        inputs[fromIndex].focus();
        await user.keyboard('[ArrowLeft]');
      },
      pressBackspace: async (atIndex: number) => {
        const inputs = getInputs();

        inputs[atIndex].focus();
        await user.keyboard('[Backspace]');
      },
    };
  };

  it('renders PinInput with labels and inputs', () => {
    const { getLabel, getInputs } = setup();

    expect(getLabel()).toBeInTheDocument();
    expect(getInputs().length).toBe(6);
  });

  it('accepts digit input and triggers onValueComplete when filled', async () => {
    const onValueComplete = vi.fn();

    const { typePin } = setup({ onValueComplete });

    const pin = '123456';

    await typePin(pin);

    expect(onValueComplete).toHaveBeenCalled();
    expect(onValueComplete).toHaveBeenCalledWith(pin);
  });

  it('allows navigation between inputs with Arrow keys', async () => {
    const { getInputs, pressArrowRight, pressArrowLeft } = setup();

    const inputs = getInputs();
    inputs[0].focus();
    expect(inputs[0]).toHaveFocus();

    await pressArrowRight(0);
    expect(inputs[1]).toHaveFocus();

    await pressArrowLeft(1);
    expect(inputs[0]).toHaveFocus();
  });

  it('clears input on Backspace', async () => {
    const { getInputs, typePin, pressBackspace } = setup();

    const inputs = getInputs();

    await typePin('12');

    expect(inputs[1]).toHaveValue('2');

    await pressBackspace(1);

    expect(inputs[1]).toHaveValue('');
  });
});
