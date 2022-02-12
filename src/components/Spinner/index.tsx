import React from 'react';
import { OrbitSpinner } from 'react-epic-spinners';
import { theme } from '../../Theme';

interface SpinnerProps {
  size?: number,
  animationDuration?: number,
  color?: string,
  className?: string,
  style?: { [key: string]: string },
}

const defaultProps = {
  size: 50,
  animationDuration: 1000,
  color: theme.colors.white,
  className: '',
  style: {},
};

export const Spinner = (props: SpinnerProps = defaultProps) => {
  return <OrbitSpinner {...props} />;
};

export default Spinner;