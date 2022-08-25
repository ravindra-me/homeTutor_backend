import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const MAIL_SETTINGS = {
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(MAIL_SETTINGS);
const sendMail = async (params) => {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to, // list of receivers
      subject: "Hello ✔", // Subject line
      html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to the Home tutor.</h2>
        <h4>You are officially In ✔</h4>
        <a style="font-size: 40px; letter-spacing: 2px; text-align:center;" href=${params.link}>click here for verification</a>
        <p style="margin-top:50px;">If you do not request for verification please do not respond to the mail. You can in turn un subscribe to the mailing list and we will never bother you again.</p>
      </div>
    `,
    });
    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default sendMail;
