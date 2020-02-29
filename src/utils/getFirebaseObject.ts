import * as admin from "firebase-admin";

export const getFirebaseObject = () => {
  let firebase;
  if (!admin.apps.length) {
    let config;
    if (process.env.NODE_ENV === "production") {
      config = {
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
      };
    } else {
      config = require("../../pages/api/service-account.json");
    }
    firebase = admin
      .initializeApp(
        {
          credential: admin.credential.cert(config),
          databaseURL: "https://spiritual-gifts-a62bb.firebaseio.com"
        },
        "server"
      )
      .firestore();
  } else {
    firebase = admin.app("server").firestore();
  }

  return firebase;
};
