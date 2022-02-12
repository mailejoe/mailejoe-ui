import React, { useEffect } from 'react';
import '../../sass/views/two-factor.scss';
import '../../sass/views/login.scss';
import axios from 'axios';

import { Formik, Form, Field } from 'formik';

import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import useTranslations from '../../translations';

const TwoFactor = () => {
  const translations = useTranslations();

  useEffect(() => {
    document.body.classList.add('auth');
    return () => {
      document.body.classList.remove('auth');
    };
  });

  const allowInput = v => {
    if (v.length !== 0) {
      if (!v.match(/^\d+$/)) {
        return false;
      }
    }

    return true;
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <div className="header">
          <div className="logo">
            <img src="/images/Logo.png" style={{ height: '150px' }} />
          </div>
        </div>
        <div className="form-container">
          <Formik
            initialValues={{
              token: '',
            }}
            validate={values => {
              const errors = {};
              if (!values.token) {
                errors.token = translations.required;
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await axios({
                  url: `${process.env.REACT_APP_API_URL}/api/v1/auth/mfa`,
                  method: 'POST',
                  withCredentials: true,
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  data: {
                    token: values.token,
                  },
                });
                if (response.data.isValid) {
                  window.location.replace('/dashboard');
                }
                setSubmitting(false);
              } catch (err) {
                setSubmitting(false);
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Form
                className="grid-form"
                onSubmit={handleSubmit}
                autoComplete="off"
                {...(process.env.REACT_APP_IS_TEST && { 'data-testid': 'mfa:form' })}
              >
                <>
                  <>
                    <Field
                      id="token"
                      name="token"
                      type="text"
                      autoFocus={true}
                      onChange={ev => {
                        const v = ev.target.value;
                        if (!allowInput(v)) {
                          return false;
                        }
                        return handleChange(ev);
                      }}
                      onBlur={handleBlur}
                      value={values.token}
                      className={`field${touched.token && errors.token ? ' has-error' : ''}`}
                    />
                    {touched.token && errors.token && (
                      <div className="form-error" data-testid="mfa-error">
                        {errors.token}
                      </div>
                    )}
                  </>

                  <div className="actions">
                    {!isSubmitting && (
                      <Button
                        type="submit"
                        {...(process.env.REACT_APP_IS_TEST && { 'data-testid': 'mfa:submit' })}
                        color="#a44900"
                      >
                        {translations.validate}
                      </Button>
                    )}
                    {isSubmitting && (
                      <div className="loading">
                        <Spinner />
                      </div>
                    )}
                  </div>

                  <div className="divider" />
                </>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="auth-bg"></div>
    </div>
  );
};

export default TwoFactor;
