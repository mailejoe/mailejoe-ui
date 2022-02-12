// Button.stories.jsx
import React from 'react';

import Button from '.';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Basic = () => <Button />;
export const WithSpinner = () => <Button isWorking={true} />;