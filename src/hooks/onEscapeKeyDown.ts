import { useEffect } from 'react';

import { KEYCODES } from '../constants/keyCodes';

interface callbackFunc {
  (): any;
};

const useOnEscapeKeyDown = (isListening: boolean, onEscapeKeyDown: callbackFunc) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === KEYCODES.ESCAPE) {
        onEscapeKeyDown();
      }
    };

    if (isListening) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isListening, onEscapeKeyDown]);
};

export default useOnEscapeKeyDown;
