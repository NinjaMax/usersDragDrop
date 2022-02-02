require('dotenv').config();
const jwt = require('jsonwebtoken');
const axios = require('axios');
const REDIRECT_URI = process.env.REDIRECT_URI;
const SERVER_ROOT_URI = process.env.SERVER_ROOT_URI;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const SECRET_KEY_TOKEN = process.env.SECRET_KEY_TOKEN;
const COOKIE_NAME = process.env.COOKIE_NAME;
const APP_ROOT_URI = process.env.APP_ROOT_URI;
const {getGoogleAuthURL, getTokens} = require('../service/googleService');


class AuthController {
  async getLoginUrl (req, res) {
    return res.send(getGoogleAuthURL());
    }
  
  async getLogOut (req, res) {

  return res.clearCookie('auth_token', {httpOnly: true});
      }
  
 async getGoogleUser (req, res) {
  const code = req.query.code;
  const { id_token, access_token } = await getTokens({
    code,
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    redirectUri: `${SERVER_ROOT_URI}/${REDIRECT_URI}`,
  });

 
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch user`);
      throw new Error(error.message);
    });

  const token = jwt.sign(googleUser, SECRET_KEY_TOKEN);

  res.cookie(COOKIE_NAME, token, {
    maxAge: 900000,
    httpOnly: true,
    secure: false,
  });

  res.redirect(APP_ROOT_URI);
  
 }

    async getCurrentUser (req, res) {
        console.log("get user");
     try {
        const decoded = jwt.verify(req.cookies[COOKIE_NAME], SECRET_KEY_TOKEN);
        console.log("decoded", decoded);
        return res.send(decoded);
     } catch (err) {
        console.log(err);
        res.send("No Data");
        }
    }

}

module.exports = new AuthController();