const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

const app = express();
const serviceAccount = require("./config/permissions.json");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

app.use(cors({ origin: true }));
app.get("/nestor", (req, res) => { return res.status(200).json({ message: "IT'S A LIVE!" }); });
app.use(require("./routes/auth.routes"))
app.use(require("./routes/account.routes"))

exports.app = functions.https.onRequest(app);