import React from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';

const LinkButton = (props) => {

  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    children,
    ...rest
  } = props

  return (
    <Button
        {...rest}
        onClick={e => {
            onClick && onClick(e);
            history.push(to);
        }}
    >
        { children }
    </Button>
  )
}

export default withRouter(LinkButton);