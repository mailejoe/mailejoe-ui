import React, { useEffect, useState } from 'react';
import { Route, useNavigate, useLocation, Routes } from 'react-router-dom';
import './sass/layout.scss';

import Login from './views/Login';
import TwoFactor from './views/TwoFactor';
import ForgotUsername from './views/ForgotUsername';
import Mailbox from './views/Mailbox';
// import PageError from './views/PageError';
import useGlobalState, { CurrentUserContext } from './state';
import { fetch } from './services/fetch';

//import SideMenu from './features/SideMenu';
//import Navbar from './features/Navbar';

const PUBLIC_PAGES = [
  '/login',
  '/logout',
  '/setup',
  '/two-factor',
  '/forgot-password'
];

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const publicPath = PUBLIC_PAGES.includes(location.pathname);
  const [currentAccount, setCurrentAccount] = useState(null);

  useEffect(() => {
    async function fetchAuthAccount() {
      setLoading(true);
      const account = await fetch('auth/current-account');
      if (account) {
        setCurrentAccount(account);

        if (account.requireMfa) {
          navigate('/two-factor');
        } else if (publicPath) {
          navigate('/mailbox');
        }
      } else {
        setCurrentAccount(null);
        navigate('/login'); // TODO, perform a logout?
      }
      setLoading(false);
    }

    fetchAuthAccount();
  }, [navigate, setLoading, setCurrentAccount]);

  return (
    <CurrentUserContext.Provider value={currentAccount}>
      <div className="page-wrapper">
          <div className="page-inner">
            <div className="page-content">
              <Routes>
                <Route path="/login" element={Login()} />
                <Route path="/two-factor" element={TwoFactor} />
                <Route path="/forgot-username" element={ForgotUsername} />
                <Route index element={<Mailbox />} />
              </Routes>
            </div>
          </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default Layout;
