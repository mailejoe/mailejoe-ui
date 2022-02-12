import axios, { Method } from 'axios';

export async function fetch(uri: string, method: Method = 'GET') {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_API_URL}/api/v1/${uri}`,
      method,
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
      },
    });

    if (response && response.status === 200) {
      return response.data;
    }
  } catch (error) {
    // TODO: handle the error with banner?
  }

  return null;
}
