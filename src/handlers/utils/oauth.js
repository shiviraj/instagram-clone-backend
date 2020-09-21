const axios = require('axios');

const getAccessToken = async (code) => {
  const { CLIENT_ID, CLIENT_SECRET, GITHUB_URL } = process.env;
  const options = { code, client_id: CLIENT_ID, client_secret: CLIENT_SECRET };
  return await axios.post(GITHUB_URL, options, {
    headers: { accept: 'application/json' },
  });
};

const getGithubUser = async (data) => {
  const user = await axios.get('https://api.github.com/user', {
    headers: { Authorization: `token ${data}`, accept: 'application/json' },
  });
  const { login: username, id, name } = user.data;
  return { name, username: username + id };
};

module.exports = { getAccessToken, getGithubUser };
