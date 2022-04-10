const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const body_parser = require("body-parser");

const app = express();

app.use(cors());
app.use(body_parser.urlencoded({ extended: true }));

app.use(body_parser.json());

/**
 *
 * END POINT: MANDAR SMS.
 */
app.post("/sms", async (req, res) => {
  let is_successful = false;
  let response = null;
  const { to, msg } = req.body;
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
  const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  if (msg?.length < 4000) {
    response = await client.messages.create({
      body: msg,
      from: process.env.TWILIO_PHONE,
      to: to,
    });
    is_successful = !!response;
  }

  res.status(200).json({ is_successful, response: response });
});

app.get("/*", (req, res) => {
  res.status(404).json({ msg: "Page not found || 404" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("API - SEND MESSAGE");
});
