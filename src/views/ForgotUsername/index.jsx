import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import '../../sass/views/login.scss';
import '../../sass/views/forgot-username.scss';

import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../translations';

const ForgotUsername = () => {
  const translations = useTranslations();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    document.body.classList.add('auth');
    return () => {
      document.body.classList.remove('auth');
    };
  });

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
              email: '',
            }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = translations.required;
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              if (completed) {
                navigate('/login');
              } else {
                try {
                  await axios({
                    url: `${process.env.REACT_APP_API_URL}/api/v1/auth/forgot-username`,
                    method: 'POST',
                    withCredentials: true,
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    data: {
                      email: values.email,
                    },
                  });
                  setCompleted(true);
                  setSubmitting(false);
                } catch (err) {
                  setSubmitting(false);
                }
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Form
                className="grid-form"
                onSubmit={handleSubmit}
                autoComplete="off"
                {...(process.env.REACT_APP_IS_TEST && { 'data-testid': 'forgot-username:form' })}
              >
                <>
                  {!completed && (
                    <>
                      <Field
                        id="email"
                        name="email"
                        type="text"
                        autoFocus
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder={translations.email}
                        className={`field${touched.email && errors.email ? ' has-error' : ''}`}
                      />
                      {touched.email && errors.email && (
                        <div className="form-error" data-testid="forgotusername-error">
                          {errors.email}
                        </div>
                      )}
                    </>
                  )}

                  {completed && (
                    <>
                      <div className="submit-message">{translations.forgotUsernameMsg}</div>
                    </>
                  )}

                  <div className="actions">
                    {!isSubmitting && (
                      <Button
                        type="submit"
                        {...(process.env.REACT_APP_IS_TEST && { 'data-testid': 'forgot-username:submit' })}
                        color="#a44900"
                      >
                        <span>{!completed ? translations.remindme : translations.backToLogin}</span>
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

export default ForgotUsername;
