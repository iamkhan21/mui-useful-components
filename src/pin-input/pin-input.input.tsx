import TextField, { type TextFieldProps } from '@mui/material/TextField';
import React from 'react';
import PinInputContext from './pin-input.context';

const PinInputInput: React.FC<
  Omit<
    TextFieldProps,
    | 'value'
    | 'onChange'
    | 'onBlur'
    | 'onFocus'
    | 'slotProps'
    | 'inputRef'
    | 'id'
  > & {
    index: number;
  }
> = ({ index, ...props }) => {
  const ctx = React.useContext(PinInputContext);

  return (
    <TextField
      {...props}
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

PinInputInput.displayName = 'PinInput.Input';

export default PinInputInput;
