import { google } from "googleapis";

const googleConfig = {
  clientId:
    "213008004116-6rlvak6kpt3pkkbd3noq1of71jn1ip6m.apps.googleusercontent.com",
  clientSecret: "xaiF9Gxt-zUzH2QKvazAcOn0",
  redirect: "http://localhost:3000/google-auth", // this must match your google api settings
};

const defaultScope = [
  "https://www.googleapis.com/auth/plus.me",
  "https://www.googleapis.com/auth/userinfo.email",
];

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent", // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: defaultScope,
  });
}

function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

function urlGoogle() {
  const auth = createConnection(); // this is from previous step
  const url = getConnectionUrl(auth);
  return url;
}
