import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import React from 'react';

type PinInputContext = {
  id: string;
  registerInput: (ref: HTMLInputElement, index: number) => void;
  onlyDigits: boolean;
};

const PinInputContext = React.createContext<PinInputContext>({
  id: '',
  registerInput: () => {},
  onlyDigits: false,
});

const sanitizeInput = (
  value: string | undefined | null,
  onlyDigits = false,
): string => {
  if (!value) return '';
  const regex = onlyDigits ? /\D/g : /\s/g;
  return value.replace(regex, '');
};

const Root: React.FC<
  React.PropsWithChildren<{
    onValueComplete: (pin: string) => void;
    onlyDigits?: boolean;
  }>
> = ({ children, onlyDigits = true, onValueComplete }) => {
  const inputId = React.useRef(self.crypto.randomUUID().slice(-10));

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

const Label: React.FC<React.PropsWithChildren> = ({ children }) => {
  const ctx = React.useContext(PinInputContext);
  return <InputLabel htmlFor={`${ctx.id}::0`}>{children}</InputLabel>;
};

const Control: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Stack gap={1} direction="row" alignItems="center">
    {children}
  </Stack>
);

const Input: React.FC<
  Omit<
    TextFieldProps,
    | 'value'
    | 'onChange'
    | 'onBlur'
    | 'onFocus'
    | 'slotProps'
    | 'inputRef'
    | 'variant'
    | 'id'
  > & {
    index: number;
  }
> = ({ index, ...props }) => {
  const ctx = React.useContext(PinInputContext);

  return (
    <TextField
      {...props}
      variant="outlined"
      id={`${ctx.id}::${index}`}
      inputRef={(ref) => ctx.registerInput(ref, index)}
      slotProps={{
        htmlInput: {
          inputMode: ctx.onlyDigits ? 'numeric' : 'text',
          style: {
            textAlign: 'center',
            aspectRatio: '1',
          },
        },
      }}
    />
  );
};

Root.displayName = 'PinInput.Root';
Label.displayName = 'PinInput.Label';
Control.displayName = 'PinInput.Control';
Input.displayName = 'PinInput.Input';

const PinInput = {
  Root,
  Label,
  Control,
  Input,
};

export default PinInput;
