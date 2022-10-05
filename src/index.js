const express = require("express");
const nodemailer = require("nodemailer");
const body = require("body-parser");
var cors = require("cors");

//smtp.gmail.com
const app = express();
app.use(cors());
app.use(body.json());
const port = 5050;
const user = "magtash68@gmail.com";
const pass = "bmscduqxeelghaxz";
app.get("/", (req, res) => {
  res.send("hello");
});
app.post("/send", (req, res) => {
  const { replyTo, text, name, template } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user,
      pass,
    },
  });
  transporter
    .sendMail({
      from: user,
      to: user,
      replyTo: replyTo,
      subject: "teste",
      text: text,
      // html: `<h1>${name}</h1><br><p>${text}</p>`,
      // replyTo:email do cliente
    })
    .then((info) => {
      res.send(info);
    })
    .catch((error) => {
      res.send(error);
    });
});
app.listen(port, () => {
  console.log(`server start ${port}`);
});
