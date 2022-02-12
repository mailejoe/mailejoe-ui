import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useForm, Resolver } from 'react-hook-form';
import '../../sass/views/login.scss';

import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import useTranslations from '../../translations';

interface LoginFormValues {
  email: string;
  password: string;
}

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const Login = () => {
  const translations = useTranslations();

  useEffect(() => {
    document.body.classList.add('auth');
    return () => {
      document.body.classList.remove('auth');
    };
  });

  const resolver: Resolver<LoginFormValues> = async (values) => {
    return {
      values,
      errors: {
        ...(!validateEmail(values?.email) && {
          email: {
            type: 'invalid',
            message: translations.invalidEmail,
          },
        }),
        ...(values?.email === '' && {
          email: {
            type: 'required',
            message: translations.required,
          },
        }),
        ...(values?.password === '' && {
          password: {
            type: 'required',
            message: translations.required,
          },
        }),
      },
    };
  };

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({ resolver });
  const onSubmit = handleSubmit((data) => {
    console.log('onsubmit', data);
  });

  return (
    <>
      <div className="auth-container">
        <div className="header">
          <div className="logo">
            <img src="images/logo.png" style={{ height: '150px' }} />
          </div>
        </div>
        <div className="form-container">
          <form
            className="grid-form"
            onSubmit={onSubmit}
            autoComplete="off"
            {...(process.env.REACT_APP_IS_TEST && { 'data-testid': 'login:form' })}
          >
            <>
              <input className="field" {...register('email')} placeholder={translations.email} />
              {errors?.email && <div className="form-error">{errors.email.message}</div>}

              <input className="field" {...register('password')} type="password" placeholder={translations.password} />
              {errors?.password && <div className="form-error">{errors.password.message}</div>}

              <div className="actions">
                {!isSubmitting && (
                  <Button
                    type="submit"
                    {...(process.env.REACT_APP_IS_TEST && { 'data-testid': 'login:submit' })}
                    color="#a44900"
                  >
                    <span>{translations.login}</span>
                  </Button>
                )}
                {isSubmitting && (
                  <div className="loading">
                    <Spinner />
                  </div>
                )}
              </div>

              <div className="divider" />

              <div className="form-extra">
                <Link
                  className="extra-link"
                  {...(process.env.REACT_APP_IS_TEST && { 'data-testid': 'login:forgot-password-link' })}
                  to="/forgot-password"
                >
                  {translations.forgotPassword}
                </Link>
              </div>
            </>
          </form>
        </div>
      </div>
      <div className="auth-bg"></div>
    </>
  );
};

export default Login;