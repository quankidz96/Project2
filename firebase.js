var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require('./key/project2-c77c1-firebase-adminsdk-ccayy-b1d7890a5c.json');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project2-c77c1.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules


module.exports.db = admin.database();
module.exports.auth = admin.auth();