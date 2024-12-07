import InputLabel, { type InputLabelProps } from '@mui/material/InputLabel';
import React from 'react';
import PinInputContext from './pin-input.context';

const PinInputLabel: React.FC<InputLabelProps> = ({ children, ...props }) => {
  const ctx = React.useContext(PinInputContext);

  return (
    <InputLabel {...props} htmlFor={`${ctx.id}::0`}>
      {children}
    </InputLabel>
  );
};

PinInputLabel.displayName = 'PinInput.Label';

export default PinInputLabel;
