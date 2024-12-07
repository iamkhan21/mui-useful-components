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

export default PinInputContext;
