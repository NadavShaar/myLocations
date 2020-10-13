import React from 'react';
import { Button as MUIButton } from '@material-ui/core';

const Button = React.forwardRef((props, ref) => <MUIButton ref={ref} { ...props } />)

export default Button;