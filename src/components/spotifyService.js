import axios from 'axios';

const CLIENT_ID = '';
const CLIENT_SECRET = '';

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SEARCH_URL = 'https://api.spotify.com/v1/search';

let token = '';

const getAccessToken = async () => {
  const response = await axios.post(TOKEN_URL, null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
    },
    params: {
      grant_type: 'client_credentials',
    },
  });
  token = response.data.access_token;
  return token;
};

export const searchMusic = async (query) => {
  if (!token) {
    await getAccessToken();
  }

  const response = await axios.get(SEARCH_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: query,
      type: 'track',
    },
  });

  return response.data.tracks.items;
};
