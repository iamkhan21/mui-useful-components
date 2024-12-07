import Stack from '@mui/material/Stack';
import React from 'react';
import PinInputContext from './pin-input.context';

const sanitizeInput = (
  value: string | undefined | null,
  onlyDigits = false,
): string => {
  if (!value) return '';
  const regex = onlyDigits ? /\D/g : /\s/g;
  return value.replace(regex, '');
};

const PinInputRoot: React.FC<
  React.PropsWithChildren<{
    onValueComplete: (pin: string) => void;
    onlyDigits?: boolean;
  }>
> = ({ children, onlyDigits = false, onValueComplete }) => {
  const inputId = React.useRef(crypto.randomUUID().slice(-10));

  const inputRefs = React.useRef<HTMLInputElement[]>([]);

  function focusInput(index: number) {
    inputRefs.current[index]?.focus();
  }

  function focusNext(index: number) {
    focusInput(Math.min(index + 1, inputRefs.current.length - 1));
  }

  function focusPrev(index: number) {
    focusInput(Math.max(index - 1, 0));
  }

  function handleInputEvent(e: InputEvent, index: number) {
    const value = e.data;

    if (!value) return;

    const chars = sanitizeInput(value, onlyDigits);

    // is sanitized input empty - insert empty char
    if (!chars.length) {
      inputRefs.current[index].value = '';
    } else {
      const inputs = inputRefs.current;

      let pasteIndex = 0;
      let inputIndex = index;

      while (pasteIndex < chars.length && inputIndex < inputs.length) {
        const input = inputs[inputIndex];
        if (!input) return;

        input.value = chars[pasteIndex] ?? '';
        pasteIndex++;
        inputIndex++;
      }

      focusNext(inputIndex - 1);

      const pin = inputs.map((input) => input.value).join('');
      if (pin.length === inputs.length) {
        onValueComplete(pin);
      }
    }
  }

  function handleKeyDown(e: KeyboardEvent, index: number) {
    const input = inputRefs.current[index];

    if (!input) return;

    switch (e.key) {
      case 'ArrowLeft':
        focusPrev(index);
        break;
      case 'ArrowRight':
        focusNext(index);
        break;
      case 'Backspace': {
        const hasValue = Boolean(input.value);
        if (!hasValue) {
          focusPrev(index);
        }
        input.value = '';
        break;
      }
      case 'Delete': {
        input.value = '';
        break;
      }
    }
  }

  function registerInput(ref: HTMLInputElement, index: number) {
    if (!ref) return;

    inputRefs.current[index] = ref;

    ref.oninput = (e) => {
      if (!(e instanceof InputEvent)) return;
      handleInputEvent(e, index);
    };

    ref.onkeydown = (e) => handleKeyDown(e, index);
  }

  return (
    <PinInputContext.Provider
      value={{
        id: inputId.current,
        onlyDigits,
        registerInput,
      }}
    >
      <Stack gap={0.5}>{children}</Stack>
    </PinInputContext.Provider>
  );
};

PinInputRoot.displayName = 'PinInput.Root';

export default PinInputRoot;
