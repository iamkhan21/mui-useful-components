import Stack, { type StackProps } from '@mui/material/Stack';
import React, { type FC } from 'react';

const PinInputControl: FC<StackProps> = ({ children, ...props }) => (
  <Stack gap={1} direction="row" alignItems="center" {...props}>
    {children}
  </Stack>
);

PinInputControl.displayName = 'PinInput.Control';

export default PinInputControl;
