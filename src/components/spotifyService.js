import axios from 'axios';

const CLIENT_ID = '40e701902f114c8ca14ea1ea964e9930';
const CLIENT_SECRET = '63cc7b4b91fc4424b0a1f1fbbfd89fd9';

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
