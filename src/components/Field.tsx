import * as React from 'react';

import styled from 'styled-components';

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;

    & > label {
      margin-bottom: 7px;
    }

    &.hasError {
      input,
      textarea,
      select {
        border: solid 1px red;
      }
    }
  `,
  Error: styled.div`
    color: #ff4646;
    font-family: 'Source Sans Pro';
    font-size: 14px;
    position: relative;
    top: -7px;
  `,
};

type FieldProps = {
  error?: string;
  children: React.ReactChildren;
};

export const Field = (props: FieldProps) => {
  return (
    <S.Container className={props.error ? 'hasError' : ''}>
      {props.children}
      {props.error && <S.Error>{props.error}</S.Error>}
    </S.Container>
  );
};