import * as React from 'react';
import styled from 'styled-components';

import useTranslations from '../translations';

export const Forbidden = () => {
  const translations = useTranslations();

  return (
    <ErrorPage>
      <ErrorPageInner>
        <ErrorBox>
          <Row>
            <Title>{translations.ErrorPage.title}</Title>
          </Row>
          <p>{translations.ErrorPage.description}</p>
        </ErrorBox>
      </ErrorPageInner>
    </ErrorPage>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const ErrorPage = styled.div`
  padding: 64px;
`;

export const ErrorPageInner = styled.div`
  margin: 0 auto;
  max-width: 1440px;
  padding: 200px 0;
  @media (max-height: 680px) {
    padding: 140px 0;
  }
`;

export const ErrorBox = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 480px;
  padding: 32px;
  border-radius: 3px;
  border: 1px solid red;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 0.9);
`;

export const Title = styled.h1`
  padding-left: 14px;
  padding-top: 3px;
  font-size: 29px;
`;
