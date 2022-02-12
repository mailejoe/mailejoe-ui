export const getStoredAuthToken = () => {
  console.log('getStoredAuthToken', process.env.REACT_APP_TOKEN_BYPASS, process.env.REACT_APP_TOKEN, localStorage.getItem('gh_authtoken'));
  return process.env.REACT_APP_TOKEN_BYPASS ? process.env.REACT_APP_TOKEN : localStorage.getItem('gh_authtoken');
}

export const removeStoredAuthToken = () => localStorage.removeItem('gh_authtoken');
